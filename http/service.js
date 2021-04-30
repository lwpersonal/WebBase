const net = require('net');

const service = net.createServer(socket => {
  socket.on('data', function (data) {
    console.log('data: ', data.toString());
    socket.write(`HTTP/1.1 200 OK\r\n`);
    socket.write(`Accept-Ranges: bytes\r\n`);
    socket.write(
      `Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform\r\n`
    );
    socket.write('Content-Type: application/json; charset=utf-8');
    socket.write(`Content-Length: 277\r\n`);
    socket.write(`Date: Thu, 29 Apr 2021 07:46:05 GMT`);
    socket.write(`\r\n\r\n`);
    socket.write(`hello`);
    socket.write(`\r\n`);
  });
  // socket.on('end', function () {
  //   console.log('end');
  //   // socket.end();
  // });
  socket.on('error', function (err) {
    console.log('err: ', err);
  });
});

service.on('connection', () => {
  console.log('连接');
});
service.on('close', () => {
  console.log('close');
});

service.listen(9991, () => {
  console.log('one');
});
