const axios = require('axios');
const engine = require("../../engine");

export default async function handler(req, res) {
  let context = req.query.context;
  let message = req.query.message;
  console.log(context);
  console.log(message);
  let result = await engine.complete(context, message)
  console.log(result)
  res.status(200).send(result)
}
