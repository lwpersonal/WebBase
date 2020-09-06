const CONST = {
  Pending: 'Pending',
  FulFilled: 'FulFilled',
  Rejected: 'Rejected'
}

class Promise {
  constructor(executor) {
    this.status = CONST.Pending;
    this.value = undefined;
    this.reason = undefined;
    this.onFulFilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (val) => {
      if (this.status === CONST.Pending) {
        this.status = CONST.FulFilled;
        this.value = val;
        this.onFulFilledCallbacks.forEach(fn => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === CONST.Pending) {
        this.status = CONST.Rejected;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
    return this;
  }
  then(onFulFilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === CONST.FulFilled) {
        try {
          const x = onFulFilled(this.value);
          resolve(x);
        } catch(err) {
          reject(err);
        }
      } else if (this.status === CONST.Rejected) {
        try {
          const x = onRejected(this.reason);
          resolve(x);
        } catch(err) {
          reject(err);
        }
      }
      if (this.status === CONST.Pending) {
        onFulFilled && this.onFulFilledCallbacks.push(() => {
          try {
            const x = onFulFilled(this.value);
            resolve(x);
          } catch(err) {
            reject(err);
          }
        });
        onRejected && this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch(err) {
            reject(err);
          }
        });
      }
    });
    
    return promise2;
  }
}

module.exports = Promise;
