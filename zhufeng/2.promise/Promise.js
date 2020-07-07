const { builtinModules } = require("module");
const { resolve } = require("path");


const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';
const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    // 返回本身，死循环
    reject(new TypeError(' haining cycle detected for promise #<Promise>'));
  } else if ((typeof x === 'object' && x!==null) || typeof x === 'function') {
    // Promise
    try { // 防止改写 then 的 get 方法，在里面抛出错误
      let then = x.then;
      if (typeof then === 'function') {
        // y 如果是 promise 继续递归执行
        then.call(x, y => resolvePromise(promise, y, resolve, reject), r => reject(r));
      } else {
        resolve(x);
      };
    } catch(err) {
      reject(err);
    };
  } else {
    // 普通值
    resolve(x);
  };

};
function asyncHandle(callBack, errCallBack) {
  setTimeout(function() {
    try {
      return callBack();
    } catch(err) {
      errCallBack(err);
    }
  }, 0);
}
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
    const newPromise = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        if (typeof onFulfilled !== 'function') { return };
        asyncHandle(() => {
          const x = onFulfilled(this.value);
          resolvePromise(newPromise, x, resolve, reject);
        }, err => reject(err));
      } else if (this.status === REJECTED) {
        if (typeof onRejected !== 'function') { return };
        asyncHandle(() => {
          const x = onRejected(this.reason);
          resolvePromise(newPromise, x, resolve, reject);
        }, err => reject(err));
      } else if (this.status === PENDING) {
        this.fulfilledCallBacks.push(() => {
          if (typeof onFulfilled !== 'function') { return };
          asyncHandle(() => {
            const x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          }, err => reject(err));
        });
        this.rejectedCallBacks.push(() => {
          // if (typeof onRejected !== 'function') { return };
          asyncHandle(() => {
            const x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          }, err => reject(err));
        });
      };
    });
    return newPromise;
  };
  catch(onRejected) {
    return this.then(null, onRejected);
  };
}

module.exports = Promise;