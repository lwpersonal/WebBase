;(function (doc, win, undefined) {
  // *********
  // 费式数列

  // 一只大兔子一个月生一只小兔子
  // 小兔子一个月后生小兔子
  // 1 / 1 = 2 / 2 = 3
  const fn_1 = (num_1, num_2, n) => {
    let rabbat = num_1 || 0
    let youngRabbat = num_2 || 0
    let all = rabbat + youngRabbat
    if (n === 0) {
      return console.log(
        'res: ',
        `${rabbat}只大兔子，${youngRabbat}只小兔子，共${all}只兔子！`
      )
    } else {
      return fn_1(rabbat + youngRabbat, rabbat, n - 1)
    }
  }
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
  const fn_2 = (n) => {
    let resArr = []
    const f_1 = (num) => {
      if (num > n) {
        return resArr
      } else {
        let arr = []
        const beginArr = resArr[num - 2]

        console.log('num', beginArr)
        for (let i = 0; i < num; i++) {
          arr[i] =
            beginArr !== void 0 &&
            beginArr[i - 1] !== void 0 &&
            beginArr[i] !== void 0
              ? beginArr[i - 1] + beginArr[i]
              : 1
        }
        console.log(arr)
        resArr[num - 1] = arr
        return f_1(num + 1)
      }
    }
    return f_1(1)
  }
  // console.log(fn_2(9))

  // 排序
  // 直接插入排序
  const px_fn = (arr) => {
    let temp,
      i,
      j,
      len = arr.length
    for (i = 1; i < len; i++) {
      if (arr[i] < arr[i - 1]) {
        temp = arr[i]
        arr[i] = arr[i - 1]
        for (j = i - 2; arr[j] > temp && j >= 0; j--) {
          arr[j + 1] = arr[j]
        }
        arr[j + 1] = temp
      }
    }
    return arr
  }
  console.log(px_fn([4, 47, 6, 7, 2, 4, 1, 3, 4]))

  // 冒泡排序
  const px_fn_mp = (arr) => {
    let temp,
      i,
      j,
      len = arr.length,
      tag = 1
    for (i = 0; i < len && tag; i++) {
      tag = 0
      for (j = 0; j < len - i; j++) {
        if (arr[j] > arr[j + 1]) {
          arr[j + 1] = [arr[j], (arr[j] = arr[j + 1])][0]
          tag = 1
        }
      }
    }
    return arr
  }
  console.log(px_fn_mp([47, 4, 6, 7, 2, 4, 1, 3, 4]))
  console.log(px_fn_mp([1, 4, 6, 7, 2, 4, 1, 3, 4]))
  console.log(px_fn_mp([6, 4, 1]))

  // 简单选择排序
  const px_fn_jdxz = (arr) => {
    let temp,
      i,
      j,
      len = arr.length,
      k
    for (i = 0; i < len - 1; i++) {
      k = i
      for (j = i + 1; j < len; j++) {
        if (arr[k] > arr[j]) {
          k = j
        }
      }
      temp = arr[i]
      arr[i] = arr[k]
      arr[k] = temp
    }
    return arr
  }
  console.log(px_fn_jdxz([47, 4, 6, 7, 2, 4, 1, 3, 4]))

  // 希尔排序
  // const px_fn_xe = arr => {
  //   const array = [5, 2, 1]
  //   let i, j,
  // }

  // 快排
  const px_fn_k = (arr) => {
    const fn = (arr1, arr2) => {
      console.log('===')
      console.log(arr1, arr2)
      let num = arr1[0]
      if (arr1.length > 1) {
        arr1 = arr1.filter((item) => {
          if (item > num) {
            arr2.push(item)
          }
          return item <= num
        })
        fn(
          arr1.slice(0, Math.floor(arr1.length / 2)),
          arr1.slice(Math.floor(arr1.length / 2))
        )
      }
      if (arr2.length > 1) {
        arr2 = arr2.filter((item) => {
          if (item > num) {
            arr1.push(item)
          }
          return item <= num
        })
        fn(
          arr2.slice(0, Math.floor(arr2.length / 2)),
          arr2.slice(Math.floor(arr2.length / 2))
        )
      }
      return [...arr1, ...arr2]
    }
    return fn(
      arr.slice(0, Math.floor(arr.length / 2)),
      arr.slice(Math.floor(arr.length / 2))
    )
  }
  console.log(px_fn_k([4, 5, 7, 84, 1, 4, 5, 6]))
})(document, window)

// 1
// 1 1 1
// 2 2 1
// 3 4 2
