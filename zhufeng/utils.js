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