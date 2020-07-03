// 多个异步对象同时执行，有结果以后就执行

function asyncTestFn(delay=1000) {
  return function () {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(delay);
      }, delay);
    });
  };
};
function consoleFn(res) {
  console.log(res);
};

const fn1 = asyncTestFn(1000);
const fn2 = asyncTestFn(500);
const fn3 = asyncTestFn(2000);
const fn4 = asyncTestFn(6000);
const fn5 = asyncTestFn(1000);

const asyncArr = [fn1, fn2, fn3, fn4, fn5];
async function asyncFn(asyncArr) {
  let res = asyncArr.map(async fn => await fn());
  for (let i = 0, len = res.length;i<len;i++) {
    await res[i].then(consoleFn);
  };
};
asyncFn(asyncArr);
