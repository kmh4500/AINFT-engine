
const Ain = require('@ainblockchain/ain-js').default;
const ain = new Ain('https://testnet-api.ainetwork.ai');
const ainUtil = require('@ainblockchain/ain-util');

const priavetKey = '961aa6589eaa38dbcd3af2f3187af204f8b06d189c1f7f183ddea79cf55c262f'
const address = ainUtil.toChecksumAddress(ain.wallet.add(priavetKey));
const MANAGE_APP_PATH = '/manage_app/chat'
const CHAT_DB_PATH = "/apps/chat"

ain.wallet.setDefaultAccount(address);

console.log(address) // 0xb5C085A42f66609be7bF13E61e498908603F8a66

const manageAppCreatePath = `${MANAGE_APP_PATH}/create/${Date.now()}`;

const initTxList = [
  {
    operation: {
      type: 'SET_VALUE',
      ref: `/staking/chat/${address}/0/stake/${Date.now()}/value`,
      value: 1
    },
    nonce: -1
  },
  {
    operation: {
      type: 'SET_VALUE',
      ref: manageAppCreatePath,
      value: {
        admin: {
          [address]: true,
        },
      },
    },
    nonce: -1
  },{
    operation: {
      type: 'SET_OWNER',
      ref: CHAT_DB_PATH,
      value: {
        '.owner': {
          "owners": {
            '*' : {
              write_owner: true,
              write_rule: true,
              write_function: true,
              branch_owner: true,
            },
          },
        },
      },
    },
    nonce: -1
  },
  {
    operation: {
      type: 'SET_RULE',
      ref: CHAT_DB_PATH,
      value: {
        '.rule': {
          'write': true
        }
      }
    },
    nonce: -1
  },
  {
    operation: {
      type: 'SET_FUNCTION',
      ref: CHAT_DB_PATH + '/AIN/$key/$time' ,
      value: {
        '.function': {
          'gpt2-ainft-0': {
            "function_type": "REST",
            "function_url": "https://events.ainetwork.ai/trigger",
            "function_id": "gpt2-ainft-0"
          }
        }
      }
    },
    nonce: -1
  },
  {
    operation: {
      type: 'SET_VALUE',
      ref: CHAT_DB_PATH + '/ain/minhyun/202107112048',
      value: {
        'minhhyun': {message: 'How are you?'},
      }
    },
    nonce: -1
  },
];
ain.sendTransactionBatch(initTxList).then(function(result){ console.log(result) });
