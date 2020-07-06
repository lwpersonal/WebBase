const { builtinModules } = require("module");


const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    this.fulfilledCallBacks = [];
    this.rejectedCallBacks = [];
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.fulfilledCallBacks.forEach(fn => fn());
      };
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.rejectedCallBacks.forEach(fn => fn());
      };
    };
    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    };
  };
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {}
    
    );
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    };
    if (this.status === REJECTED) {
      onRejected(this.reason);
    };
    if (this.status === PENDING) {
      this.fulfilledCallBacks.push(() => {
        onFulfilled(this.value);
      });
      this.rejectedCallBacks.push(() => {
        onRejected(this.reason);
      });
    };
  };
  catch(onReject) {
    onReject(this.reason);
  };
}

module.exports = Promise;