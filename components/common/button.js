!function(fn){
  var Fn = fn()
  'function' == typeof define && (define.amd || define.cmd) ? define( new Fn()) : void 0
}(function() {
  var res = function() {
  }
  return res.prototype.init = function() {
    var inputBtnEl = $('input[type=submit]')
    inputBtnEl.addClass('lw-button')

    var Btns = $('[data-btn]')
    Btns.addClass('lw-button')
    // $(Btns).each(function(index, el) {
    // })
    console.log(Btns)
  }
  ,
  res
  
});