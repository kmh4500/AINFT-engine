
const Ain = require('@ainblockchain/ain-js').default;
const ain = new Ain('http://node.ainetwork.ai:8080');
const ainUtil = require('@ainblockchain/ain-util');

const priavetKey = '961aa6589eaa38dbcd3af2f3187af204f8b06d189c1f7f183ddea79cf55c262f'
const address = ainUtil.toChecksumAddress(ain.wallet.add(priavetKey));
const CHAT_DB_PATH = "/apps/chat"

ain.wallet.setDefaultAccount(address);

console.log(address)

const initTxList = [
  {
    operation: {
      type: 'SET_VALUE',
      ref: CHAT_DB_PATH + '/ainetwork',
      value: ''
    },
    nonce: -1,
  },
];
ain.sendTransactionBatch(initTxList).then(function(result){ console.log(result) });
