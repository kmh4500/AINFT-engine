
const Ain = require('@ainblockchain/ain-js').default;
const ain = new Ain('http://node.ainetwork.ai:8080');
const account = ain.wallet.create(1);
const myAddress = account[0];
const CHAT_DB_PATH = "/apps/chat/"
// Set myAddress as the default account
ain.wallet.setDefaultAccount(myAddress);
console.log(myAddress)

// Print defaultAccount (Need to backup your private key)
console.log(ain.wallet.defaultAccount);

function getHistory(name, user) {
  return ain.db.ref(CHAT_DB_PATH + '/' + name + '/' + user).getValue()
}

function sendChat(name, user, message, time) {
  return ain.db.ref(CHAT_DB_PATH + '/' + name + '/' + user + '/' + time).setValue({
    value: {message: message},
    nonce: -1
  })
}

function getMessage(name, user, time) {
  return ain.db.ref(CHAT_DB_PATH + '/' + name + '/' + user + '/' + time).getValue()
}


function sendResponse(ref, message) {
  return ain.db.ref(ref + '/response').setValue({
    value: message,
    nonce: -1,
  })
}

function sendBuild(name, data) {
  return ain.db.ref(CHAT_DB_PATH + '/' + name + '/build').setValue({
    value: data,
    nonce: -1,
  })
}

function getAINFT(name) {
  return ain.db.ref(CHAT_DB_PATH + '/' + name + '/AINFT')
      .getValue()
}

function getResponse(ref) {
  return ain.db.ref(ref + '/response').getValue()
}

module.exports = {
  getHistory,
  sendChat,
  getMessage,
  sendResponse,
  getResponse,
  sendBuild
};
