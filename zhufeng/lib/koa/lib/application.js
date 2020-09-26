const http = require('http');
const Stream = require('stream');

const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application {
  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use(fn) {
    this.fn = fn;
  }
  createContext(req, res) {
    let ctx = Object.create(this.context);
    let request = Object.create(this.request);
    let response = Object.create(this.response);

    ctx.request = request;
    ctx.request.req = ctx.req = req;
    ctx.response = response;
    ctx.response.res = ctx.res = res;
    return ctx;
  }
  handleRequest(req, res) {
    const ctx = this.createContext(req, res);

    ctx.res.statusCode = 404;
    this.fn(ctx);
    const body = ctx.body;
    if (typeof body === 'string' || Buffer.isBuffer(body)) {
      ctx.res.statusCode = 200;
      res.end(ctx.body);
    } else if (body instanceof Stream) {
      ctx.res.statusCode = 200;
      ctx.body.pipe(res);
    } else {
      res.end('Not Found');
    }
  }
  listen(...args) {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
