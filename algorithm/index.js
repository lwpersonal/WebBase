(function (doc, win, undefined) {
  // *********
  // 费式数列

  // 一只大兔子一个月生一只小兔子
  // 小兔子一个月后生小兔子
  // 1 / 1 = 2 / 2 = 3
  const fn_1 = (num_1, num_2, n) => {
    let rabbat = num_1 || 0;
    let youngRabbat = num_2 || 0;
    let all = rabbat + youngRabbat;
    if (n === 0) {
      return console.log(
        'res: ',
        `${rabbat}只大兔子，${youngRabbat}只小兔子，共${all}只兔子！`
      );
    } else {
      return fn_1(rabbat + youngRabbat, rabbat, n - 1);
    }
  };
  // fn_1(2, 1, 1)
  // fn_1(1, 0, 3)

  // **********
  // 巴斯卡三角形
  // 2018-03-05

  //    1
  //  1   1
  // 1  2  1
  //1  3  3  1

  // =>

  //     1(0)
  //  1(0)  1(1)
  // 1(0)  2(1)  1(2)
  //1(0)  3(1)  3(2)  1(3)
  const fn_2 = n => {
    let resArr = [];
    const f_1 = num => {
      if (num > n) {
        return resArr;
      } else {
        let arr = [];
        const beginArr = resArr[num - 2];

        console.log('num', beginArr);
        for (let i = 0; i < num; i++) {
          arr[i] =
            beginArr !== void 0 &&
            beginArr[i - 1] !== void 0 &&
            beginArr[i] !== void 0
              ? beginArr[i - 1] + beginArr[i]
              : 1;
        }
        console.log(arr);
        resArr[num - 1] = arr;
        return f_1(num + 1);
      }
    };
    return f_1(1);
  };
  // console.log(fn_2(9))

  // 排序
  // 直接插入排序
  const px_fn = arr => {
    let temp,
      i,
      j,
      len = arr.length;
    for (i = 1; i < len; i++) {
      if (arr[i] < arr[i - 1]) {
        temp = arr[i];
        arr[i] = arr[i - 1];
        for (j = i - 2; arr[j] > temp && j >= 0; j--) {
          arr[j + 1] = arr[j];
        }
        arr[j + 1] = temp;
      }
    }
    return arr;
  };
  // console.log(px_fn([4, 47, 6, 7, 2, 4, 1, 3, 4]))

  // 冒泡排序
  const px_fn_mp = arr => {
    let temp,
      i,
      j,
      len = arr.length,
      tag = 1;
    for (i = 0; i < len && tag; i++) {
      tag = 0;
      for (j = 0; j < len - i; j++) {
        if (arr[j] > arr[j + 1]) {
          arr[j + 1] = [arr[j], (arr[j] = arr[j + 1])][0];
          tag = 1;
        }
      }
    }
    return arr;
  };
  // console.log(px_fn_mp([47, 4, 6, 7, 2, 4, 1, 3, 4]))
  // console.log(px_fn_mp([1, 4, 6, 7, 2, 4, 1, 3, 4]))
  // console.log(px_fn_mp([6, 4, 1]))
  function px_fn_mp2(arr) {
    const len = arr.length;
    let posit = 0;
    let flag = true;
    for (let i = 0; i < len && flag; i++) {
      flag = true;
      for (let j = 0; j < len - posit - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const val = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = val;
          flag = true;
        }
      }
      posit++;
    }
    return arr;
  }
  // console.log(px_fn_mp2([1, 4, 10, 5, 3, 99, 5, 3, 45, 6]));
  // console.log(px_fn_mp2([47, 4, 6, 7, 2, 4, 1, 3, 4]))
  // console.log(px_fn_mp2([1, 4, 6, 7, 2, 4, 1, 3, 4]))
  // console.log(px_fn_mp2([6, 4, 1]))

  // 插入排序
  function px_fn_cr(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      const val = arr[i];
      for (; j >= 0; j--) {
        if (arr[j] > val) {
          arr[j + 1] = arr[j];
        } else {
          break;
        }
        arr[j] = val;
      }
    }
    return arr;
  }
  // console.log(px_fn_cr([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
  // console.log(px_fn_cr([47, 4, 6, 7, 2, 4, 1, 3, 4]))
  // console.log(px_fn_cr([1, 4, 6, 7, 2, 4, 1, 3, 4]))
  // console.log(px_fn_cr([6, 4, 1]))

  // 选择排序
  function px_fn_xz(arr) {
    const len = arr.length;
    if (len <= 1) {
      return arr;
    }
    let min;
    let minPosit;
    for (let i = 0; i < len; i++) {
      min = arr[i];
      minPosit = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < min) {
          min = arr[j];
          minPosit = j;
        }
      }
      const val = arr[i];
      arr[i] = arr[minPosit];
      arr[minPosit] = val;
    }
    return arr;
  }
  // console.log(px_fn_xz([47, 10, 4, 6, 7, 2, 4, 1, 3, 4]));
  // console.log(px_fn_xz([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
  // console.log(px_fn_xz([47, 4, 6, 7, 2, 4, 1, 3, 4]))
  // console.log(px_fn_xz([1, 4, 6, 7, 2, 4, 1, 3, 4]))
  // console.log(px_fn_xz([6, 4, 1]))

  // 简单选择排序
  const px_fn_jdxz = arr => {
    let temp,
      i,
      j,
      len = arr.length,
      k;
    for (i = 0; i < len - 1; i++) {
      k = i;
      for (j = i + 1; j < len; j++) {
        if (arr[k] > arr[j]) {
          k = j;
        }
      }
      temp = arr[i];
      arr[i] = arr[k];
      arr[k] = temp;
    }
    return arr;
  };
  // console.log(px_fn_jdxz([47, 4, 6, 7, 2, 4, 1, 3, 4]))

  // 希尔排序
  // const px_fn_xe = arr => {
  //   const array = [5, 2, 1]
  //   let i, j,
  // }

  // 快排
  const px_fn_k = arr => {
    const fn = (arr1, arr2) => {
      let num = arr1[0];
      if (arr1.length > 1) {
        arr1 = arr1.filter(item => {
          if (item > num) {
            arr2.push(item);
          }
          return item <= num;
        });
        fn(
          arr1.slice(0, Math.floor(arr1.length / 2)),
          arr1.slice(Math.floor(arr1.length / 2))
        );
      }
      if (arr2.length > 1) {
        arr2 = arr2.filter(item => {
          if (item > num) {
            arr1.push(item);
          }
          return item <= num;
        });
        fn(
          arr2.slice(0, Math.floor(arr2.length / 2)),
          arr2.slice(Math.floor(arr2.length / 2))
        );
      }
      return [...arr1, ...arr2];
    };
    return fn(
      arr.slice(0, Math.floor(arr.length / 2)),
      arr.slice(Math.floor(arr.length / 2))
    );
  };
  function px_fn_k2(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const posit = Math.floor(arr.length / 2);
    const val = arr.splice(posit, 1)[0];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < val) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...px_fn_k2(left), val, ...px_fn_k2(right)];
  }
  // console.log(px_fn_k2([4, 5, 7, 84, 1, 4, 5, 6, 10, 14]));
  // console.log(px_fn_k2([47, 10, 4, 6, 7, 2, 4, 1, 3, 4]));
  // console.log(px_fn_k2([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
  // console.log(px_fn_k2([47, 4, 6, 7, 2, 4, 1, 3, 4]));
  // console.log(px_fn_k2([1, 4, 6, 7, 2, 4, 1, 3, 4]));
  // console.log(px_fn_k2([6, 4, 1]));

  // 归并排序
  function px_fn_gb(source) {
    function merge(arr1, arr2) {
      if (!arr1 || !arr1.length) {
        return arr2;
      }
      if (!arr2 || !arr2.length) {
        return arr1;
      }
      let p1 = 0;
      let p2 = 0;
      const res = [];
      while (p1 < arr1.length || p2 < arr2.length) {
        if (arr1[p1] <= arr2[p2] || !arr2[p2]) {
          res.push(arr1[p1]);
          p1++;
        } else if (arr1[p1] > arr2[p2] || !arr1[p1]) {
          res.push(arr2[p2]);
          p2++;
        }
      }
      return res;
    }

    function fn(arr) {
      const len = arr.length;
      if (len < 2) {
        return arr;
      }
      const middle = Math.floor(len / 2);

      return merge(fn(arr.slice(0, middle)), fn(arr.slice(middle)));
    }

    return fn(source);
  }

  // console.log(px_fn_gb([4, 5, 7, 84, 1, 4, 5, 6, 10, 14]));
  // console.log(px_fn_gb([47, 10, 4, 6, 7, 2, 4, 1, 3, 4]));
  // console.log(px_fn_gb([10, 1, 4, 5, 3, 99, 5, 3, 45, 6]));
  // console.log(px_fn_gb([47, 4, 6, 7, 2, 4, 1, 3, 4]));
  // console.log(px_fn_gb([1, 4, 6, 7, 2, 4, 1, 3, 4]));
  // console.log(px_fn_gb([6, 4, 1]));

  // TAG 链表
  class List {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }

  function pushStr(str) {
    if (!str) {
      return null;
    }
    let head = new List(null, null);
    const n = str.length;
    let current = head;
    for (let i = 0; i < n; i++) {
      current.value = str[i];
      current.next = i < n - 1 ? new List(null, null) : null;
      current = current.next;
    }
    return head;
  }
  const headList = pushStr('abc', null);

  // 回文字符串检测
  function checkStr(head) {
    if (head === null) {
      return false;
    }
    let current1 = head;
    let current2 = head;
    let str1 = '';
    let str2 = '';
    while (current2) {
      str1 += current1.value;
      current2 = current2?.next?.next;
      if (current2) {
        current1 = current1.next;
      }
    }
    while (current1.next) {
      str2 = current1.next.value + str2;
      current1 = current1.next;
    }
    if (str1.length === str2.length) {
      return str1 === str2;
    } else if (str1.length > str2.length) {
      return str1.slice(0, -1) === str2;
    }
  }

  // console.log(checkStr(headList));

  // 反转单链表
  function reverseList(head) {
    let current = head;
    let resList = null;
    while (current) {
      const newList = new List(current.value, resList);
      resList = newList;
      current = current.next;
    }
    return resList;
  }
  // console.log(reverseList(headList));

  function reverseList2(head) {
    let current = head;
    let resList = null;
    while (current) {
      const next = current.next;
      current.next = resList;
      resList = current;
      current = next;
    }
    return resList;
  }
  // console.log(reverseList2(headList));

  // 二分查找
  function findItem(source, val) {
    function fn(start, arr) {
      if (arr.length <= 1) {
        if (arr[0] === val) {
          return start;
        }
        return -1;
      }
      const middle = Math.floor(arr.length / 2);
      const p1 = fn(start, arr.slice(0, middle));
      const p2 = fn(start + middle, arr.slice(middle));
      if (p1 !== -1) {
        return p1;
      }
      if (p2 !== -1) {
        return p2;
      }
      return -1;
    }

    return fn(0, source);
  }
  // console.log(findItem([1, 2, 3, 4, 5, 9, 11, 40], 9));
  // console.log(findItem([1, 3, 5, 9, 10, 14, 30, 99, 102], 9));

  // 二分查找，重复元素第一个
  function ef_find_cf(source, val) {
    function fn(start, arr) {
      if (arr.length <= 1) {
        if (arr[0] === val && (start === 0 || source[start - 1] !== val)) {
          return start;
        }
        return -1;
      }
      const middle = Math.floor(arr.length / 2);
      const p1 = fn(start, arr.slice(0, middle));
      const p2 = fn(start + middle, arr.slice(middle));
      if (p1 !== -1) {
        return p1;
      }
      if (p2 !== -1) {
        return p2;
      }
      return -1;
    }

    return fn(0, source);
  }
  // console.log(ef_find_cf([7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 10], 7));

  // 二分查找，重复元素最后一个
  function ef_find_cf_end(source, val) {
    function fn(start, arr, val) {
      if (arr.length <= 1) {
        if (
          arr[0] === val &&
          (start === source.length - 1 || source[start + 1] !== val)
        ) {
          return start;
        } else {
          return -1;
        }
      }
      const middle = Math.floor(arr.length / 2);
      const left = fn(start, arr.slice(0, middle), val);
      const right = fn(start + middle, arr.slice(middle), val);
      if (left !== -1) {
        return left;
      }
      if (right !== -1) {
        return right;
      }
      return -1;
    }

    return fn(0, source, val);
  }
  // console.log(1, ef_find_cf_end([7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 10], 7));

  // 二分查找，重复元素第一个大于等于
  function ef_find_cf_one(source, val) {
    function fn(start, arr) {
      if (arr.length <= 1) {
        if (arr[0] === val && (start === 0 || source[start - 1] !== val)) {
          return start;
        }
        if (arr[0] > val && (start === 0 || source[start - 1] <= val)) {
          return start;
        }
        return -1;
      }
      const middle = Math.floor(arr.length / 2);
      const p1 = fn(start, arr.slice(0, middle));
      const p2 = fn(start + middle, arr.slice(middle));
      if (p1 !== -1) {
        return p1;
      }
      if (p2 !== -1) {
        return p2;
      }
      return -1;
    }

    return fn(0, source);
  }
  // console.log(ef_find_cf_one([7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 10], 6));

  // 二分查找，重复元素最后一个小于等于
  function ef_find_cf_end_two(source, val) {
    function fn(start, arr) {
      if (arr.length <= 1) {
        if (
          arr[0] === val &&
          (start === source.length - 1 || source[start + 1] !== val)
        ) {
          return start;
        }
        if (
          arr[0] < val &&
          (start === source.length - 1 || source[start + 1] >= val)
        ) {
          return start;
        }
        return -1;
      }
      const middle = Math.floor(arr.length / 2);
      const p1 = fn(start, arr.slice(0, middle));
      const p2 = fn(start + middle, arr.slice(middle));
      if (p2 !== -1) {
        return p2;
      }
      if (p1 !== -1) {
        return p1;
      }
      return -1;
    }

    return fn(0, source);
  }
  console.log(ef_find_cf_end_two([7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 10], 7));
  console.log(ef_find_cf_end_two([7, 7, 7, 7, 7, 7, 7, 7, 7, 10, 10, 10, 11], 10));
})(document, window);
