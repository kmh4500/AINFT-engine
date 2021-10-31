const fs = require("fs")

const readData = () => {
  let data = fs.readFileSync("./data/ain_whitepaper.txt", 'utf8')
  let lines = data.split(/\r|\n|\./)
  lines = lines.filter(text => text && text.length > 50)
  lines = lines.map(text => text + '.');
  return lines
}

exports.readData = readData;

// readData().then((result) => {
//   console.log(result)
// })
