// 读取cookie
const getCookie = (key, prefix) => {
  const newKey = !prefix ? key : prefix + key;

  if (typeof document !== 'undefined') {
    const pairs = document.cookie.split(';').map(pair => (
      {
        key: pair.split('=')[0],
        value: pair.split('=')[1],
      }
    ));

    for (let i = 0; i < pairs.length; i += 1) {
      if (pairs[i].key.trim() === newKey) {
        return decodeURIComponent(pairs[i].value);
      }
    }
  }
  return undefined;
};

// 写入cookie
const setCookie = (key, value, maxAge = -1) => {
  if (maxAge === -1) {
    document.cookie = `${key}=${encodeURIComponent(value)};domain=.smartstudy.com;path=/;`;
  } else {
    document.cookie = `${key}=${encodeURIComponent(value)};max-age=${maxAge};path=/;`;
  }
};

// 删除 cookie
const delCookie = (name) => {
  console.log(getCookie(name));
  const ex = new Date();
  ex.setTime(ex.getTime() - 1);
  document.cookie = `${name}=; expires=${ex.toGMTString()};path=/`;
};

const clearCookie = (name) => {
  setCookie(name, '');
  console.log('name: ', name);
  console.log(getCookie(name));
};


setCookie('test', 'test-val')
console.log(getCookie('test'))
// setCookie('test', 'test-val-222')
// console.log(getCookie('test'))
// console.log(getCookie('ss_user'))
// setCookie('ss_user', '')
// console.log(getCookie('ss_user'))
// setCookie('test', '')
delCookie('test')
console.log(getCookie('test'))

