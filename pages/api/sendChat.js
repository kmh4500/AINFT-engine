
const ainClient = require("../../ain/ain-client");


export default async function handler(req, res) {
  console.log(req.query.user);
  console.log(req.query.message);
  console.log(req.query.time);
  console.log(req.query.name);
  let result = await ainClient.sendChat(req.query.name, req.query.user, req.query.message, req.query.time);
  console.log(result)
  res.status(200).json(result)
}
