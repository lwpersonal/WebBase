
const Pending = 'pending';
const Fulfilled = 'fulfilled';
const Rejected = 'rejected';

function _resolve(val) {
  if(this.status === Pending) {
    this.status = Fulfilled;
    this.value = val;
  };
};
function _reject(err) {
  if (this.status === Pending) {
    this.status = Rejected;
    this.reason = err;
  };
};

class Promise {
  constructor(fn) {
    this.status = Pending;
    this.value = undefined;
    this.reason = undefined;
    fn(_resolve.bind(this), _reject.bind(this));
  }
  then(fulfilledFn, rejectedFn) {
    const that = this;
    return new Promise(function(resolve, reject) {
      console.log(this)
      try {
        if (that.status === Fulfilled && typeof fulfilledFn === 'function') {
          resolve(fulfilledFn(this.value));
        } else if (this.status === Rejected && typeof rejectedFn === 'function') {
          reject(rejectedFn(this.reason));
        };
      } catch(err) {
        reject(err);
      }
    });
  }
  catch(rejectedFn) {
    console.log(this.reason)
    return new Promise(function(resolve, reject) {
      try {
        resolve(rejectedFn(this.reason));
      } catch(err) {
        reject(err);
      }
    })
  }
};


const promise = new Promise(function(resolve, reject) {
  reject(3);
})
.then(res => console.log('then: ', res))
.catch(err => console.log('catch: ', err))
.then(res => console.log(res))
.catch(err => console.log('catch2: ', err))
.then(res => {
  console.log('then2: ', res);
  return 10;
})
.then(res => console.log(res))
.then(() => { throw new Error({ message: 'promise catch error' })})
.catch(err => console.log('catch3: ', err))
