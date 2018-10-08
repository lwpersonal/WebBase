/*
 * @Author: WenJW
 * @Date: 2018-09-27 21:55:58
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-10-08 18:58:19
 * @description
 */

;(function(doc, win, undefined){
  var options
  
  // 工具函数
  function getDataType(data) {
    return Object.prototype.toString.call(data).toLowerCase().replace(/^\[object (\w+)\]$/, '$1')
  }
  function valMap (data, fn, order) {
    order = order || true
    if (getDataType(data) === 'array') {
      order ? null : data.reverse()
      for (var i = 0, len = data.length; i < len; i++) {
        var val = fn(data[i], i)
        if (val === false) { return }
      }
    } else if (getDataType(data) === 'object') {
      var keys = Object.keys(data)
      order ? null : keys.reverse()
      for (var i = 0, len = keys.length; i < len; i++) {
        var val = fn(data[keys[i]], keys[i], i)
        if (val === false) { return }
      }
    } else { throw new Error(`then type is error![${data}: ${_GetDataType(data)}]`) }
  }
  
  // 函数主体
  function Func(config) {
    options = config
    console.log(options.el)
    options.el.style.whiteSpace = 'pre-wrap'
  }

  // 创建 html 标签
  function createNode(type, className) {
    var el = doc.createElement(type)
    el.className = className
    return el
  }
  // 创建文本节点，方便使用 appendData 方法添加文字
  function createTextNode(parentEl) {
    var textEl = doc.createTextNode('')
    parentEl && parentEl.append(textEl)
    return textEl
  }

  // 解析文本，获取数组类型的一个解析结果
  function getTextArr() {
    console.log(options.content)
    var resArr = options.content
      // .replace(/({) *\n/g, '$1\\n')
      // .replace(/\n *(})/g, '\\n$1')
      .replace(/\{([^\{\}]+)\}/g, '{$1}\\n$')
      .replace(/\/\*([^\/\\]+)\*\//g, '\/\*$1\*\/\\n$')
      .split(/\\n\$/g)
    return resArr.splice(0, resArr.length - 1)
  }

  // 处理字符串代码
  function handleCode(code) {}
  // 
  function handvarext(str) {
    var len = str.length
    
  }

  // 在页面书写代码，文本节点
  function writeFn(el, text) {
    if(!text){ return }
    return el.appendData(text)
    // return el.append(text)
  }

  // 注释处理
  function commentHandle(comment, el, fn) {
    var len = comment.length,
      index = 0,
      textEl = createTextNode(el)
    function commentFn(text) {
      // 检查是否有断点
      var time = options.time
      // options.timeOut
      setTimeout(function() {
        writeFn(textEl, text)
        index++
        if(index < len) { return commentFn(comment[index]) }
        else { return fn() }
      }, time)
    }
    commentFn(comment[0])
  }
  // 样式处理
  function styleHandle(style, el, fn) {
    var len = style.length,
      index = 0,
      root = createNode('span', 'el-select'),
      textEl = createTextNode(el)
    el.append(root)
    function styleFn(text) {
      // options.timeOut
      var time, textIndex = style.indexOf(text)
      setTimeout(function() {
        // 检查是否是断点，是的话下一个字符延时
        time = options.time
        if(text === '{' || text === ';') {
          textEl = createTextNode(el)
          writeFn(textEl, text)
          root = createNode('span', 'el-attr')
          textEl = createTextNode(root)
        } else if(text === ':') {
          textEl = createTextNode(el)
          writeFn(textEl, text)
          root = createNode('span', 'el-val')
          textEl = createTextNode(root)
        } else if(text === '}') {
          writeFn(textEl, text)
          root = createNode('span', 'el-select')
          textEl = createTextNode(root)
        } else if(/\s/g.test()) {
          console.log('ssssdsf')
          textEl = createTextNode(el)
          writeFn(textEl, text)
        } else {
          console.log('sss')
          el.append(root)
          writeFn(textEl, text)
        }
        index++
        if(index < len) { return styleFn(style[index]) }
        else { return fn() }
      }, time)
    }
    styleFn(style[0])
  }

  // 
  function typeCheckout(str, fn) {
    var el
    if(/\/\*/g.test(str)) {
      el = createNode('div', 'comment')
      // var textEl = createTextNode(el)
      options.el.append(el)
      commentHandle(str, el, fn)
    } else if(/\{[\w\W]+\}/g.test(str)) {
      el = createNode('div', 'code')
      options.el.append(el)
      styleHandle(str, el, fn)
    }
    return el
  }

  // 开始函数
  function startFn(arr) {
    console.log(arr)
    var index = 0, len = arr.length
    function strArrHandle(item) {
      typeCheckout(item, function() {
        index ++
        if(true && index < len) {
          return strArrHandle(arr[index])
        } else { }
      })
    }
    strArrHandle(arr[0])
    // arr.map(function(item, index) {
    //   typeCheckout(item)
    //   // root.appendChild()
    //   // handvarext(item)
    // })
  }
  
  Func.prototype.init = function(config) {}
  Func.prototype.start = function(config) {
    
    startFn(getTextArr())
  }
  
  win.Func = Func
}(document, window));
