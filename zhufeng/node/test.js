const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer(function (req, res) {
  // res.setHeader('')
  const stream = fs.createReadStream(path.resolve(__dirname, './test.js'));
  // stream.on('open', function() {
  //   console.log('open')
  // })
  // stream.on('data', function(data) {
  //   console.log('data')
  //   res.end(data)
  // })
  stream.pipe(res);
});
server.listen(8000);
