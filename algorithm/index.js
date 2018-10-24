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
    if(n === 0) {
      return console.log('res: ', `${rabbat}只大兔子，${youngRabbat}只小兔子，共${all}只兔子！`)
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
      if(num > n){ return resArr }
      else {
        let arr = []
        const beginArr = resArr[num - 2]
        
        console.log('num', beginArr)
        for(let i = 0; i<num ;i++){
          arr[i] = beginArr !== void 0 && beginArr[i - 1] !== void 0 && beginArr[i] !== void 0 ? beginArr[i - 1] + beginArr[i] : 1
        }
        console.log(arr)
        resArr[num - 1] = arr
        return f_1(num + 1)
      }
    }
    return f_1(1)
  }
  console.log(fn_2(9))

}(document, window));

// 1
// 1 1 1
// 2 2 1
// 3 4 2
