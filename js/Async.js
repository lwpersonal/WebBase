// 多个异步对象同时执行，有结果以后就执行

// function asyncTestFn(delay=1000) {
//   return function () {
//     return new Promise(function(resolve) {
//       setTimeout(function() {
//         resolve(delay);
//       }, delay);
//     });
//   };
// };
// function consoleFn(res) {
//   console.log(res);
// };

// const fn1 = asyncTestFn(1000);
// const fn2 = asyncTestFn(500);
// const fn3 = asyncTestFn(2000);
// const fn4 = asyncTestFn(6000);
// const fn5 = asyncTestFn(1000);

// const asyncArr = [fn1, fn2, fn3, fn4, fn5];
// async function asyncFn(asyncArr) {
//   let res = asyncArr.map(async fn => await fn());
//   for (let i = 0, len = res.length;i<len;i++) {
//     await res[i].then(consoleFn);
//   };
// };
// asyncFn(asyncArr);

let aa = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2000);
    }, 2000);
  });
};
let bb = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(500);
    }, 500);
  });
};
let cc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3000);
    }, 3000);
  });
};
let arr1 = [aa, bb, cc];

let run2 = async arr1 => {
  const arr = arr1.map(async item => {
    const result = await item();
    return result;
  });

  for (let item of arr) {
    let a = await item;
    console.log(a);
  }
};
// run2(arr1);

function delayFn(time = 1000) {
  return new Promise(r => {
    setTimeout(() => {
      r(time);
    }, time);
  });
}

const executeAsyncCode = async (asyncArr, options = { Sequential: true }) => {
  const { Sequential } = options;
  const fnResArr = [];
  const formatAsyncArr = asyncArr.map(asyncFn => asyncFn()); // 同时调用所有的异步函数，调用的结果返回一个数组

  for (let item of formatAsyncArr) {
    if (Sequential === true) {
      const res = await item;
      fnResArr.push(Promise.resolve(res)); // 防止传入的不是 promise，后续不能使用 .then 处理结果
    } else {
      console.log(item);
      fnResArr.push(Promise.resolve(item));
    }
  }

  return fnResArr;
};

executeAsyncCode(
  [
    () => delayFn(200),
    () => delayFn(),
    () => delayFn(500),
    () => delayFn(3000),
  ],
  { Sequential: false }
).then(fnArr => {
  fnArr.map((fn, index) => {
    fn.then(res => console.log(res, ' -- ', index));
  });
});
