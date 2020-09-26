const url = require('url');

const request = {
  get path() {
    const { pathname } = url.parse(this.req.url);
    return pathname;
  },
  get query() {
    const { query } = url.parse(this.req.url, true);
    return query;
  },
};

module.exports = request;
