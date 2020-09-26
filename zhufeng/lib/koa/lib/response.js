const response = {
  _body: '',
  get body() {
    console.log('ssss00')
    return this._body;
  },
  set body(val) {
    console.log('ssss')
    this._body = val;
  },
};

module.exports = response;
