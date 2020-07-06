/**
 * promise 解决异步编程问题
 * 多个异步方法串行，链式调用，还是基于回调
 * 多个异步并发的问题 同时拿到异步的之行结果，promise.all
 * 三个状态，Pending、Fulfilled、Rejected
 * 只有 Pending 可以转换状态
 */

const Promise = require('./Promise');


new Promise(function(resolve, reject) {
  resolve(1);
}).then(res => console.log(res))
.catch(err => console.log('warn: ', err));