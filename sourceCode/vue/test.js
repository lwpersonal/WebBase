'use strict'
!(function() {
  const obj = {
    _name: 'lw'
  }
  console.log(obj)
  console.log(Object.getOwnPropertyDescriptor(obj, '_name'))
  Object.defineProperty(obj, 'name', {
    value: 'lw',
    writable: true,
    configurable: false,
    enumerable: false
  })
  Object.defineProperty(obj, 'name', {
    value: 'lws',
    // configurable: true,
    // writable: true,
    // enumerable: true
  })
  console.log(obj)
  // Object.defineProperty(obj, 'name', {
  //   // value: 'lw',
  //   // writable: false,
  //   get: function() {
  //     console.log('[[get]]')
  //     return this._name
  //   },
  //   set: function(val) {
  //     console.log('[[set]]', val)
  //     return 'set-' + val
  //   }
  // })
  // console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
  // console.log(obj.name)
  // obj.name = 'lg'
  // console.log(obj.name)


  // proxy
  const obj2 = new Proxy({}, {
    get: function (target, key, receiver) {
      console.log(`getting ${key}!`)
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
      console.log(`setting ${key}!`)
      return Reflect.set(target, key, value, receiver)
    }
  })

  obj2.count = 1
  ++obj2.count

  const proxy1 = new Proxy({}, {
    get: function() {
      return 22
    }
  })
  console.log(proxy1)
  proxy1.count = 222
  console.log(proxy1.count)
  console.log(proxy1.num)

  // Reflect
  const obj3 = {
    name: 'lw',
    age: 24
  }
  const loggedObj = new Proxy(obj3, {
    get(target, name) {
      console.log('get: ', 'target - ', name)
      return Reflect.get(target, name)
    },
    has(target, name) {
      console.log('has: ', 'target - ', name)
      return Reflect.has(target, name)
    }
  })
  console.log(loggedObj.name)
  console.log(loggedObj.age)
  'age' in loggedObj


}())
