/**
 * promise 解决异步编程问题
 * 多个异步方法串行，链式调用，还是基于回调
 * 多个异步并发的问题 同时拿到异步的之行结果，promise.all
 * 三个状态，Pending、Fulfilled、Rejected
 * 只有 Pending 可以转换状态
 */

const Promise = require('./Promise2');


new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(198273);
  }, 10);
  // resolve(1989);
}).then(res => {
  console.log('----0000 --- ', res);
  throw new Error('error test 999');
}, err => {
  console.log('error9: ', err);
  return 100;
})
.then(res => {
  console.log('res--00: ', res)
}, err => {
  console.log(222, err);
})
// .then(res => {
//   return new Promise(function(r) {
//     console.log('2:', res);
//       r(10);
//   });
// })
// .then(() => { throw new Error('wjw test') })
// .then(res => console.log('3: ', res))
// .catch(err => console.log('warn: -- ', err));