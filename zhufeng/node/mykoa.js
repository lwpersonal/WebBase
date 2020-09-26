const fs = require('fs');
const path = require('path');

const Koa = require('../lib/koa');

const app = new Koa();
app.use(ctx => {
  // console.log(ctx.req)
  // console.log(ctx.request.path);
  // console.log(ctx.path);
  // console.log(ctx.query.a);
  ctx.res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  ctx.body = fs.createReadStream(path.resolve(__dirname, './test.html'));
  // ctx.body = 'hello';
});

app.listen(3000);
