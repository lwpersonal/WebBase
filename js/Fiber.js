;(function(doc, win) {
  const listArr = [...Array(900000).keys()];
  const listWrap = doc.querySelector('.long-list-wrap');
  const box = doc.querySelector('.box');
  let num = 0;
  async function consoleTime(fn) {
    const res = await fn();
    console.warn('fn - start: ');
  }
  function createLiEl(text) {
    const li = doc.createElement('li');
    li.textContent = text;
    return li;
  }

  // 纯单个添加，可以点击 18～19 次
  function append1() {
    listArr.forEach(async (item) => {
      await listWrap.appendChild(createLiEl(item));
    });
  };

  // 放入 setTimeout 中，可以点击 6～8 次
  function append2() {
    listArr.forEach(item => {
      setTimeout(async () => await listWrap.appendChild(createLiEl(item)), 0);
    });
  };

  // 用 requestIdleCallback 包装一下 append2，可以点击 4～5 次
  // 用 requestIdleCallback 包装一下 append1，可以点击 18～19 次
  function append3() {
    return requestIdleCallback(append1);
  }

  // 全部写入dom片段然后最后添加到页面，可以点击 18～19 次
  function append4() {
    const fragment = doc.createDocumentFragment();
    listArr.forEach(async (item) => {
      await fragment.appendChild(createLiEl(item));
    });
    listWrap.append(fragment);
  };

  // 每次 append 100 个，setTimeout 依次执行
  // 比较完美的解决方案，几乎无延时的可以响应用户操作
  function append5() {
    function fn() {
      if (listArr.length<=0) { return }
      setTimeout(() => {
        const fragment = doc.createDocumentFragment();
        listArr.splice(0, 100).forEach(async (item) => {
          await fragment.appendChild(createLiEl(item));
        });
        listWrap.append(fragment);
        fn()
      }, 0);
    };
    return fn();
  };

  consoleTime(append5);
  
  console.log(111);
}(document, window));
