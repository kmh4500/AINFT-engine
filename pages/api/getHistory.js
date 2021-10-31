
const ainClient = require("../../ain/ain-client");


export default async function handler(req, res) {
  let result = await ainClient.getHistory(req.query.name, req.query.user);
  console.log(result)
  res.status(200).json(result)
}
