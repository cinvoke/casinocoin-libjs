import {validate, removeUndefined, dropsToCsc} from '../common'
import {txFlags} from '../common/txflags'

type AccountData = {
  Sequence: number,
  Account: string,
  Balance: string,
  Flags: number,
  LedgerEntryType: string,
  OwnerCount: number,
  PreviousTxnID: string,
  AccountTxnID?: string,
  PreviousTxnLgrSeq: number,
  index: string
}

type AccountDataResponse = {
  account_data: AccountData,
  ledger_current_index?: number,
  ledger_hash?: string,
  ledger_index: number,
  validated: boolean
}

type AccountInfoOptions = {
  ledgerVersion?: number
}

type AccountInfoResponse = {
  sequence: number,
  cscBalance: string,
  ownerCount: number,
  previousInitiatedTransactionID: string,
  previousAffectingTransactionID: string,
  previousAffectingTransactionLedgerVersion: number,
  kycVerified: boolean
}

function formatAccountInfo(response: AccountDataResponse) {
  const data = response.account_data
  const kycVerified = ((data.Flags & txFlags.KYC.KYCSet) !== 0)
  return removeUndefined({
    sequence: data.Sequence,
    cscBalance: dropsToCsc(data.Balance),
    ownerCount: data.OwnerCount,
    previousInitiatedTransactionID: data.AccountTxnID,
    previousAffectingTransactionID: data.PreviousTxnID,
    previousAffectingTransactionLedgerVersion: data.PreviousTxnLgrSeq,
    kycVerified: kycVerified
  })
}

function getAccountInfo(address: string, options: AccountInfoOptions = {}
): Promise<AccountInfoResponse> {
  validate.getAccountInfo({address, options})

  const request = {
    command: 'account_info',
    account: address,
    ledger_index: options.ledgerVersion || 'validated'
  }

  return this.connection.request(request).then(formatAccountInfo)
}

export default getAccountInfo
