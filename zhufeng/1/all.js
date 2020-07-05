/**
 * 并发处理
 */
const fs = require('fs');
const path = require('path');


// 第一种方法，after 去优化
function after(callBack, delay) {
  return function fn(...args) {
    if (--delay===0) { return callBack(...args) };
    return fn;
  };
};

let arr = [];
function out(data) {
  console.log(arr);
};
const callBack = after(out, 2);


function init1 () {
  const fn2 = fs.readFile(path.resolve(__dirname, '../utils.js'), 'utf-8', function(err, data) {
    arr.push(data);
    callBack(data);
  });

  const fn1 = fs.readFile(path.resolve(__dirname, './test1.txt'), 'utf-8', function(err, data) {
    arr.push(data);
    callBack(data);
  });
}

// 第二种方法

async function allAsync(arr) {
  let res = arr.map(async fn => await fn());
  for (let i = 0, len = res.length; i<len; i++) {
    const resStr = await res[i];
    console.log('resStr ', resStr);
  };
  return res;
}

const fn2 = async () => {
  const data = await fs.readFile(path.resolve(__dirname, '../utils.js'), 'utf-8', function(err, data) {
    console.log('fn2')
    return data;
  });
  console.log('data', data);
};

const fn1 = async () => await fs.readFile(path.resolve(__dirname, './test1.txt'), 'utf-8', function(err, data) {
  console.log('fn1');
  return data;
});

// allAsync([fn2, fn1]).then(res => console.log(res));

fn2();

