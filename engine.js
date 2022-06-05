
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';
const NAME = "Yeoreum"

exports.complete = (context, text) => {
  return generate(context, text)
}

async function tokenizer(str){
  return await axios.post(
    "https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/preprocess"
    , `{"context": ${JSON.stringify(str)}}` ).then(r => JSON.parse(r.data))
}

async function API_request(ids){
  return await axios.post(
    "https://train-zlu2oxt38g4y1dnd7srr-gpt2-train-teachable-ainize.endpoint.ainize.ai/predictions/gpt-2-en-large-finetune"
    , `{
  "text": ${JSON.stringify(ids)},
  "num_samples": 5,
  "length": 256
}` ).then(r=>r.data)
}

async function postprocessing(ids){
  return await axios.post(
    "https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/postprocess"
    , `${JSON.stringify(ids)}` ).then(r=>r.data)
}

function count_unallowed_char(str) {
  mat = str.match(/[^a-zA-Z\s\?\.0-9',-]/g)
  if (mat) {
    return mat.length
  }
  return 0
}

async function inference(str){
  const token_ids = await tokenizer(str)
  const generate_ids = await API_request(token_ids)
  let descriptions = (await postprocessing(generate_ids)) // ["0"].text
  for (let index in descriptions) {
    let text = descriptions[index].text
    text = text.replace(/<\|endoftext\|>/g, "")
    const lastIndex = text.lastIndexOf(`${NAME}:`)
    text = text.substring(lastIndex + NAME.length + 2).trim()
    text = text.split(/\n/)[0]
    descriptions[index] = text
  }
  console.log(descriptions)
  let best = descriptions[0]
  let best_unallowed = count_unallowed_char(best)
  for (const index in descriptions) {
    let description = descriptions[index]
    let unallowed = count_unallowed_char(description)
    if (unallowed < best_unallowed || (unallowed == best_unallowed && description.length > best.length)) {
      best = description
      best_unallowed = unallowed
    }
  }
  return best
}

async function generate(context, text) {
  return inference(`ETERNAL: ${text}\n${NAME}:`)
}

// for testing. node engine.js
// generate_template('An NFT is a unit of data stored on a digital ledger, called a blockchain, which can be sold and traded.', 'What is AI Network?').then((result) => {
//   console.log(result)
// })
