const CONST = {
  Pending: 'Pending',
  FulFilled: 'FulFilled',
  Rejected: 'Rejected'
}
function resolve(val) {
  if (this.status === CONST.Pending) {
    this.status = CONST.FulFilled;
    this.value = val;
  }
};
function reject(reason) {
  if (this.status === CONST.Pending) {
    this.status = CONST.Rejected;
    this.reason = reason;
  }
};

class Promise {
  constructor(executor) {
    this.status = CONST.Pending;
    this.value = undefined;
    this.reason = undefined;
    try {
      executor(resolve.bind(this), reject.bind(this));
    } catch(err) {
      reject(err);
    }
    console.log(11111)
    return this;
  }
  then(onFulFilled, onRejected) {
    console.log('99', this);
    if (this.status === CONST.FulFilled) {
      onFulFilled(this.value);
    } else if (this.status === CONST.Rejected) {
      onRejected(this.reason);
    }
  }
}

module.exports = Promise;
