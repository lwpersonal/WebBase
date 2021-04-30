const http = require('http');
const options = {};
http.request(options, (res) => {
  res.on('data', function(data) {
    data.toString()
  })
});
