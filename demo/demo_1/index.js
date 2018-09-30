/*
 * @Author: WenJW
 * @Date: 2018-09-27 21:55:58
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-09-30 16:40:33
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
    console.log(options.content)
    var resArr = options.content
      // .replace(/({) *\n/g, '$1\\n')
      // .replace(/\n *(})/g, '\\n$1')
      .replace(/\{([^\{\}]+)\}/g, '{$1}\\n$')
      .replace(/\/\*([^\/]+)\*\//g, '\/\*$1\*\/\\n$')
      .split(/\\n\$/g)
    return resArr
  }
  function handleCode(code) {}
  function handleText(str) {
    var len = str.length
    
  }
  function writeFn(el, text) {
    return el.appendData(text)
  }
  function commentHandle(comment) {
    var el = createNode('div', 'comment')
    var index = 0
    function writeFn(el, text) {
      if(){}
      return el.appendData(text)
    }
    writeFn(el, comment[index])
    
  }
  function styleHandle(style) {}
  function typeCheckout(str) {
    var el
    if(/\/\*/g.test(str)) {
      el = createNode('div', 'comment')
      options.el.append(el)
      
    }
  if(/\/\*[\w\W]+\*\//g.exec(str)) {}
  }
  function startFn(arr) {
    console.log(arr)
    arr.map(function(item, index) {
      typeCheckout(item)
      root.appendChild()
      handleText(item)
    })
  }
  
  Func.prototype.init = function(config) {}
  Func.prototype.start = function(config) {
    startFn(getTextArr())
  }
  
  win.Func = Func
}(document, window));
