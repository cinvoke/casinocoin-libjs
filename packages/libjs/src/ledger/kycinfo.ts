import * as utils from './utils'

const txFlags = require('../common/txflags').txFlags
const kycFlags = txFlags.KYC
const {validate, removeUndefined} = utils.common

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
    index: string,
    KYC: KYCInfoResponse
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


type KYCInfoResponse = {
    account: number,
    verified: boolean,
    lastUpdated: number,
    scanReferences: string[],
    Verifications: any
    Date: number
}

function convertHexToUUID(hex: string) {
    return (
        hex.substr(0, 8)
        + '-' + hex.substr(8, 4)
        + '-' + hex.substr(12, 4)
        + '-' + hex.substr(16, 4)
        + '-' + hex.substr(20)).toLowerCase()
}

function formatAccountInfo(response: AccountDataResponse) {
    const data = response.account_data
    const kycVerified = ((data.Flags & kycFlags.KYCSet) !== 0)
    if (kycVerified) {
        const verificationsArray = []
        if (data.KYC.Verifications) {
            // convert items to UUID values
            data.KYC.Verifications.forEach(item => {
                verificationsArray.push(convertHexToUUID(item))
            })
        }
        return removeUndefined({
            account: data.Account,
            verified: kycVerified,
            lastUpdated: data.KYC.Date,
            verifications: verificationsArray
        })
    } else {
        if (data.KYC) {
            return removeUndefined({
                account: data.Account,
                verified: kycVerified,
                lastUpdated: data.KYC.Date,
                verifications: []
            })
        } else {
            return removeUndefined({
                account: data.Account,
                verified: kycVerified
            })
        }
    }
}

function getKYCInfo(
    address: string,
    options: AccountInfoOptions = {}): Promise<AccountDataResponse> {
    validate.getAccountInfo({address, options})

    const request = {
        command: 'account_info',
        account: address,
        ledger_index: options.ledgerVersion || 'validated'
    }

    return this.connection.request(request).then(formatAccountInfo)
}

export default getKYCInfo
