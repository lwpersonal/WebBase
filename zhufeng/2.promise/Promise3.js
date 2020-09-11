const CONST = {
  Pending: 'Pending',
  Fulfilled: 'FulFilled',
  Rejected: 'Rejected'
}


class Promise {
  constructor(executor) {
    this.status = CONST.Pending;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = value => {
      if (this.status === CONST.Pending) {
        this.status = CONST.Fulfilled; // 只允许从 pending 变更状态
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn(value));
      }
    }
    const reject = reason => {
      if (this.status === CONST.Pending) {
        this.status = CONST.Rejected; // 只允许从 pending 变更状态
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn(reason));;
      }
    }
    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err);
    }
  }

  then(onFulFilled, onRejected) {
    if (this.status === CONST.Pending) {
      // 异步代码，状态还未变更
      this.onFulfilledCallbacks.push(onFulFilled);
      this.onRejectedCallbacks.push(onRejected);
    } else if (this.status === CONST.Fulfilled) {
      onFulFilled(this.value);
    } else if (this.status === CONST.Rejected) {
      onRejected(this.reason);
    }
  }
}




const fn = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 0);
  // throw new Error('0000000');
})
.then(res => {
  console.log(res)
}, err => console.log('err: -- ', err))

// fn.then(res => {
//   throw new Error('type error');
// })
