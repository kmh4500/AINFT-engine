/**
 * Actually, this trigger is the part of the backend logic.
 * This can be moved to the backend after ain-py is implemented.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var visit = {}
var user_context_dict = {}
const engine = require("../../engine");
const ainClient = require("../../ain/ain-client");
const context = require("../../utils/context");
var context_whitepaper = context.readData()
console.log(context_whitepaper)
var stringSimilarity = require("string-similarity");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default async function handler(req, res) {
  let message = req.query.transaction || req.body.transaction || 'Hello World!';
  console.log('[transaction]', message)
  let ref = message.tx_body.operation.ref
  let value = message.tx_body.operation.value
  console.log('[ref]', ref)
  console.log('[value]', value)
  if (!context_whitepaper) {
    context_whitepaper = ['AI Network is a global backend infrastructure that transforms millions of open source projects into live services (a.k.a. Open Resource).']
  }
  if (ref && value && !value.response) {
    if (!visit[ref]) {
      visit[ref] = true

      // channel/user/timestamp
      let path = ref.split('/');
      let user = path[path.length - 2];
      let channel = path[path.length - 3];
      let context_key = channel + '/' + user
      let user_context = user_context_dict[context_key] || ''
      let match = stringSimilarity.findBestMatch(value.message, context_whitepaper)
      let whitepaper_context = match.bestMatch.target + match.ratings[getRandomInt(match.ratings.length)].target
      let context = whitepaper_context + ' ' + user_context
      context = context.trim()
      return ainClient.getResponse(ref).then(async (result) => {
        console.log('[previous response]', result)
        console.log('[context]', context)
        if (!result) {
          let response = await engine.complete(context, value.message)
          console.log('[ref]', ref)
          console.log('[response]', response)
          if (response) {
            ainClient.sendResponse(ref, response)
            user_context += value.message + ' '
            const MAX_LEN = 500
            if (user_context.length > MAX_LEN) {
              user_context = user_context.substring(user_context.length - MAX_LEN, user_context.length);
            }
            user_context_dict[context_key] = user_context
            res.status(200).send(response.data);
          } else {
            res.status(404).send('no response from engine');
          }
        } else {
          res.status(200).send('');
        }
      })
    }
  } else {
    res.status(200).send('');
  }
};
