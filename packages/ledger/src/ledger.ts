import Transport from '@ledgerhq/hw-transport'
import * as BIPPath from 'bip32-path'

type AddressResult = {
  publicKey: string,
  address: string,
  chainCode?: string
}

type ConfigResult = {
  version: string
}

/**
 * Casinocoin Ledger API
 *
 * @example
 * import CSC from "@casinocoin/ledger";
 * const csc = new CSC(transport);
 */
export default class CSC {
  transport: Transport

  constructor(transport: Transport) {
    this.transport = transport
    transport.decorateAppAPIMethods(
        this,
        ['getAddress', 'signTransaction', 'getAppConfiguration'],
        'w0w'
    )
  }

  /**
   * get Casinocoin address for a given BIP 32 path.
   *
   * @param path a path in BIP 32 format
   * @param display optionally enable or not the display
   * @param chainCode optionally enable or not the chainCode request
   * @param ed25519 optionally enable or not the ed25519 curve (secp256k1 is default)
   * @return an object with a publicKey, address and (optionally) chainCode
   * @example
   * const result = await csc.getAddress("44'/144'/0'/0/0");
   * const { publicKey, address } = result;
   */
  async getAddress(
      path: string,
      display?: boolean,
      chainCode?: boolean,
      ed25519?: boolean
  ): Promise<{
    publicKey: string,
    address: string,
    chainCode?: string
  }> {
    const bipPath = BIPPath.fromString(path).toPathArray()
    const curveMask = ed25519 ? 0x80 : 0x40

    const cla = 0xe0
    const ins = 0x02
    const p1 = display ? 0x01 : 0x00
    const p2 = curveMask | (chainCode ? 0x01 : 0x00)
    const data = Buffer.alloc(1 + bipPath.length * 4)

    data.writeInt8(bipPath.length, 0)
    bipPath.forEach((segment, index) => {
      data.writeUInt32BE(segment, 1 + index * 4)
    })

    const response = await this.transport.send(cla, ins, p1, p2, data)

    const result: AddressResult = {address: '', publicKey: ''}
    const publicKeyLength = response[0]
    const addressLength = response[1 + publicKeyLength]

    result.publicKey = response.slice(1, 1 + publicKeyLength).toString('hex')

    result.address = response
        .slice(1 + publicKeyLength + 1, 1 + publicKeyLength + 1 + addressLength)
        .toString('ascii')

    if (chainCode) {
      result.chainCode = response
          .slice(
              1 + publicKeyLength + 1 + addressLength,
              1 + publicKeyLength + 1 + addressLength + 32
          )
          .toString('hex')
    }

    return result
  }

  /**
   * sign a Casinocoin transaction with a given BIP 32 path
   *
   * @param path a path in BIP 32 format
   * @param rawTxHex a raw transaction hex string
   * @param ed25519 optionally enable or not the ed25519 curve (secp256k1 is default)
   * @return a signature as hex string
   * @example
   * const signature = await csc.signTransaction("44'/144'/0'/0/0", "12000022800000002400000002614000000001315D3468400000000000000C73210324E5F600B52BB3D9246D49C4AB1722BA7F32B7A3E4F9F2B8A1A28B9118CC36C48114F31B152151B6F42C1D61FE4139D34B424C8647D183142ECFC1831F6E979C6DA907E88B1CAD602DB59E2F");
   */
  async signTransaction(
      path: string,
      rawTxHex: string,
      ed25519?: boolean
  ): Promise<string> {
    const bipPath = BIPPath.fromString(path).toPathArray();
    const rawTx = Buffer.from(rawTxHex, "hex");
    const curveMask = ed25519 ? 0x80 : 0x40;

    const apdus = [];
    let offset = 0;

    while (offset !== rawTx.length) {
      const isFirst = offset === 0;
      const maxChunkSize = isFirst ? 150 - 1 - bipPath.length * 4 : 150;

      const hasMore = offset + maxChunkSize < rawTx.length;
      const chunkSize = hasMore ? maxChunkSize : rawTx.length - offset;

      const apdu = {
        cla: 0xe0,
        ins: 0x04,
        p1: (isFirst ? 0x00 : 0x01) | (hasMore ? 0x80 : 0x00),
        p2: curveMask,
        data: isFirst
            ? Buffer.alloc(1 + bipPath.length * 4 + chunkSize)
            : Buffer.alloc(chunkSize),
      };

      if (isFirst) {
        apdu.data.writeInt8(bipPath.length, 0);
        bipPath.forEach((segment, index) => {
          apdu.data.writeUInt32BE(segment, 1 + index * 4);
        });
        rawTx.copy(
            apdu.data,
            1 + bipPath.length * 4,
            offset,
            offset + chunkSize
        );
      } else {
        rawTx.copy(apdu.data, 0, offset, offset + chunkSize);
      }

      apdus.push(apdu);
      offset += chunkSize;
    }

    let response = Buffer.alloc(0);
    for (let apdu of apdus) {
      response = await this.transport.send(
          apdu.cla,
          apdu.ins,
          apdu.p1,
          apdu.p2,
          apdu.data
      );
    }

    // the last 2 bytes are status code from the hardware
    return response.slice(0, response.length - 2).toString("hex");
  }

  /**
   * get the version of the Casinocoin app installed on the hardware device
   *
   * @return an object with a version
   * @example
   * const result = await csc.getAppConfiguration();
   *
   * {
   *   "version": "1.0.3"
   * }
   */
  async getAppConfiguration(): Promise<{
    version: string
  }> {
    const response = await this.transport.send(0xe0, 0x06, 0x00, 0x00)
    const result: ConfigResult = {version: ''}
    result.version = '' + response[1] + '.' + response[2] + '.' + response[3]
    return result
  }
}
