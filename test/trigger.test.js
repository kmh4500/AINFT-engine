


const { expect } = require("chai");
import handler from "../pages/api/trigger"

describe("trigger tests", () => {
  after(() => {
  });

  it("test complete", async () => {
    let req = {
      query: {
        transaction: {
          tx_body: {
            operation: {
              ref: 'apps/chat/ainetwork/0xtestuser/' + Date.now(),
              value: {message: 'What is open resource?'}
            }
          }
        }
      }
    }
    let res = {
      status: function(code) {
        console.log('[status]', code)
        return this;
      },
      send: function send(message) {
        console.log('[send]', message);
        expect(message).not.equal('')
      }
    }
    await handler(req, res)
  }).timeout(10000);


  it("test don't answer message with response", async () => {
    let req = {
      query: {
        transaction: {
          tx_body: {
            operation: {
              ref: 'apps/chat/ainetwork/0xtestuser/' + Date.now(),
              value: {message: 'What is the greatest novel in the history?', response: 'hi'}
            }
          }
        }
      }
    }
    let res = {
      status: function(code) {
        console.log('[status]', code)
        return this;
      },
      send: function send(message) {
        console.log('[send]', message);
        expect(message).equal('')
      }
    }
    await handler(req, res)
  }).timeout(10000);


  it("test multiple", async () => {
    let messages = ['What is open resource?', 'How is the weather today?',
    'Do you have a girlfriend?', 'Do you think alein exists?',
    'What would be the future of AI?', 'How smart are you?']
    for (let messageItem of messages) {
      let req = {
        query: {
          transaction: {
            tx_body: {
              operation: {
                ref: 'apps/chat/ainetwork/0xtestuser/' + Date.now(),
                value: {message: messageItem}
              }
            }
          }
        }
      }
      let res = {
        status: function(code) {
          console.log('[status]', code)
          return this;
        },
        send: function send(message) {
          console.log('[send]', message);
          expect(message).not.equal('')
        }
      }
      await handler(req, res)
    }
  }).timeout(100000);

});
