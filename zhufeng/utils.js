/**
 * @description 类型判断
 * @param {*} type
 * @returns
 */
function isType (type) {
  return function(val) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  };
};
// console.log(isType('String')('test'));

/**
 * @description 函数柯里化
 * @param {*} fn
 * @returns
 */
function curring(fn) {
  let resArgs = [];
  function handleCurr(...args) {
    if (args.length===0) { return fn.apply(this, resArgs) };
    const res = args.reduce((pre, now) => pre.concat(now), []);
    resArgs = resArgs.concat(res);
    return handleCurr;
  }
  return handleCurr;
};
/*
function add(a, b, c, e) {
  return a + b + c + e;
};
const add2 = curring(add);
console.log(add2(1)(3)(6)(5)()); // 15
console.log(add2(1)(3, 6)(5)()); // 15
*/

/**
 * @description 延迟函数执行
 * @param {*} callBack
 * @param {*} delay
 * @returns
 */
function after(callBack, delay) {
  return function fn() {
    if (--delay===0) { return callBack() };
    return fn;
  };
};
/*
function eat() {
  console.log('吃饭');
};

const fn = after(eat, 3);
fn();
fn();
fn();
*/

/**
 * @description 前置函数
 * @param {*} callBack
 * @returns
 *
 * AOP 函数切片思想
 * */
Function.prototype.before = function(callBack) {
  const that = this;
  return function(...args) {
    const res = callBack();
    return that(...args, res);
  }
}
/*
function say(name, name2) {
  console.log(name + ': 说话 ' + name2);
}
const fn = say.before(function() {
  console.log('小明站了起来，');
  return '小红';
});

fn('然后');
*/