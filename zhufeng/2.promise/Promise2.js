//excutor中需要提供一个成功的方法
const PENDING = "PENDING";

const RESOLVED = "RESOLVED";

const REJECTED = "REJECTED";

const resolvePromise = (promise2, x, resolve, reject) => {

if (promise2 === x) {

return reject(

new TypeError("chaining cycle dedected for promise #<Promise>")

);
}


if ((typeof x == "object" && x !== null) || typeof x === "function") {

//如何判断一个对象是不是Promise 必须有then
try {

let then = x.then;

if (typeof then === "function") {

then.call(
x,
(y) => {

resolvePromise(promise2, y, resolve, reject)

},
r => {

reject(r);
}
);
} else {

resolve(x);
}
} catch (e) {

reject(e);
}
} else {

//x就是一个普通值
resolve(x);
}
};


class Promise {

constructor(excutor) {
//console.log('this.stauts')
this.stauts = PENDING;

this.value = undefined;

this.reason = undefined;

this.onResolvedCallBacks = [];

this.onRejectedCallBacks = [];

let resolve = value => {

if (this.stauts === PENDING) {

this.stauts = RESOLVED;

this.value = value;

this.onResolvedCallBacks.forEach(fn => fn());

}
};
let reject = reason => {

if (this.stauts === PENDING) {

this.stauts = REJECTED;

this.reason = reason;

this.onRejectedCallBacks.forEach(fn => fn());

}
};
try {

excutor(resolve, reject);

} catch (error) {

reject(error);
}
}
then(onFulfilled, onRejected) {

//console.log('then')
let promise2 = new Promise((resolve, reject) => {

if (this.stauts === RESOLVED) {

setTimeout(() => {

try {

//console.log('gogo')
let x = onFulfilled(this.value);

resolvePromise(promise2, x, resolve, reject);

} catch (e) {

reject(e);
}
});
}
if (this.stauts === REJECTED) {

setTimeout(() => {

try {

let x = onRejected(this.reason);

resolvePromise(promise2, x, resolve, reject);

} catch (e) {

reject(e);
}
});
}
if (this.stauts === PENDING) {

this.onResolvedCallBacks.push(() => {

//todo....
setTimeout(() => {

try {

let x = onFulfilled(this.value);

resolvePromise(promise2, x, resolve, reject);

} catch (e) {

reject(e);
}
});
});
this.onRejectedCallBacks.push(() => {

setTimeout(() => {

try {

let x = onRejected(this.value);

resolvePromise(promise2, x, resolve, reject);

} catch (e) {

reject(e);
}
});
});
}
});
return promise2;

}
catch(r) {
  return this.then(null, r)
}
}
module.exports = Promise;