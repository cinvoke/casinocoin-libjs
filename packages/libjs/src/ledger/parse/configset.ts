import * as assert from 'assert'
import {removeUndefined} from '../../common'

function parseSetConfiguration(tx: any): Object {
  assert(tx.TransactionType === 'SetConfiguration')
  return removeUndefined({
    ConfigData: tx.ConfigData,
    ConfigID: tx.ConfigID,
    ConfigType: tx.ConfigType
  })
}

export default parseSetConfiguration
