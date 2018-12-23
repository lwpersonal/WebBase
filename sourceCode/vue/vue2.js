/*
 * @Author: WenJW
 * @Date: 2018-12-23 10:39:41
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-12-23 10:45:20
 * @description
 */

// es5 Object.defineProperty

function Observer (data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  walk: function(data) {
    let that = this
    Object.keys(data).forEach(function(key) {
      that.convert(key, data[key])
    })
  },
  convert: function(key, val) {}
}
