
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

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
    "https://train-my6fiei8irzhhjw9niqg-gpt2-train-teachable-ainize.endpoint.ainize.ai/predictions/gpt-2-en-large-finetune"
    , `{
  "text": ${JSON.stringify(ids)},
  "num_samples": 1,
  "length": 256
}` ).then(r=>r.data)
}

async function postprocessing(ids){
  return await axios.post(
    "https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/postprocess"
    , `${JSON.stringify(ids)}` ).then(r=>r.data)
}

async function inference(str){
  const token_ids = await tokenizer(str)
  const generate_ids = await API_request(token_ids)
  const description = (await postprocessing(generate_ids))["0"].text
  const lastIndex = description.lastIndexOf("AIN:")
  return description.substring(lastIndex + 4).trim()
}

async function generate(context, text) {
  return inference(`Context: ${context}\nHuman: ${text}\nAIN:`)
}

// for testing. node engine.js
// generate_template('An NFT is a unit of data stored on a digital ledger, called a blockchain, which can be sold and traded.', 'What is AI Network?').then((result) => {
//   console.log(result)
// })
