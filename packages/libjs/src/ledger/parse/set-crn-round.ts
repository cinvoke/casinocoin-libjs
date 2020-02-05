import * as assert from 'assert'
import {removeUndefined} from '../../common'

function parseCRNTXHistory(tx: any): Array<string> {
  if (!tx.meta.AffectedNodes) {
    return []
  } else {
    const crnRoundObject = tx.meta.AffectedNodes.filter(obj => {
      return obj.ModifiedNode.LedgerEntryType === 'CRNRound'
    })
    if(crnRoundObject.length === 1){
      return crnRoundObject[0].ModifiedNode.FinalFields.CRNTxHistory
    } else {
      return []
    }
  }
}

function parseSetCRNRound(tx: any): Object {
  assert(tx.TransactionType === 'SetCRNRound')
  const crnRound = parseCRNTXHistory(tx)
  return removeUndefined({
    FeesDistributed: tx.CRN_FeeDistributed,
    CRNs: tx.CRNs,
    LedgerSequence: tx.LedgerSequence,
    CRNTXHistory: crnRound
  })
}

export default parseSetCRNRound
