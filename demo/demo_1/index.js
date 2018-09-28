/*
 * @Author: WenJW
 * @Date: 2018-09-27 21:55:58
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-09-28 23:49:00
 * @description
 */

;(function(doc, win, undefined){
  var options
  function Func(config) {
    options = config
    console.log(options.el)
  }
  function createNode(type, className) {
    var el = doc.createElement(type)
    el.className = className
    return el
  }
  function getTextArr() {
    var str = options.textEl.value
    console.log(str)
    var resArr = str
      // .replace(/({)\n/g, '$1\\n')
      // .replace(/\n(})/g, '\\n$1')
      .split(/\n/g)
    return resArr
  }
  function handleCode(code) {}
  function handleText(str) {
    var len = str.length
    
  }
  function typeCheckout(str) {
    var el
    if(/\/\*/g.test(str)) {
      el = createNode('div', 'comment')
      options.el.append(el)
      
    }
  }
  function writeText(arr) {
    console.log(arr)
    var root
    arr.map(function(item, index) {
      root = typeCheckout(item)
      root.appendChild()
      handleText(item)
    })
  }
  
  Func.prototype.init = function(config) {}
  Func.prototype.start = function(config) {
    writeText(getTextArr())
  }
  
  win.Func = Func
}(document, window));
