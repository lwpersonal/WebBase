const CONST = {
  Pending: 'Pending',
  FulFilled: 'FulFilled',
  Rejected: 'Rejected'
}

function resolvePromise(x, promise2, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('循化引用！'));
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // x 是一个 promise
        then.call(x, y => {
          if (called) { return }
          called = true;
          // 递归解析成功后的值
          resolvePromise(y, promise2, resolve, reject);
        }, r => {
          if (called) { return }
          called = true;
          reject(r);
        });
      } else {
        // x 是普通对象
        if (called) { return }
        called = true;
        resolve(x);
      }
    } catch(err) {
      reject(err);
    }
  } else {
    // x 是一个普通值
    resolve(x);
  }
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
    } catch (err) {
      reject(err);
    }
    return this;
  }
  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled :  (x => x);
    onRejected = typeof onRejected === 'function' ? onRejected : (err => { throw err });
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === CONST.FulFilled) {
        setTimeout(() => {
          try {
            const x = onFulFilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      } else if (this.status === CONST.Rejected) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      if (this.status === CONST.Pending) {
        onFulFilled && this.onFulFilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulFilled(this.value);
              resolvePromise(x, promise2, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
        onRejected && this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

module.exports = Promise;
