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
}())
