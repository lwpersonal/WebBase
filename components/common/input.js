!function(fn){
  var Fn = fn()
  'function' == typeof define && (define.amd || define.cmd) ? define( new Fn()) : void 0
}(function() {
  var res = function() {
  }
  return res.prototype.init = function(e, t) {
    var textEl = $(':text')
    var emailEl = $('input[type=email]')
    var urlEl = $('input[type=url]')
    var passwordEl = $(':password')
    var numberEl = $('input[type=number]')
    var searchEl = $('input[type=search]')
    var textareaEl = $('textarea')

    textEl.addClass('lw-input-text')
    emailEl.addClass('lw-input-text')
    urlEl.addClass('lw-input-text')
    passwordEl.addClass('lw-input-text')
    numberEl.addClass('lw-input-text')
    searchEl.addClass('lw-input-text')
    textareaEl.addClass('lw-input-textarea')

    // $(textEl).each(function(index, el) {
    //   $(el).addClass('lw-input-text')
    // })
  }
  ,
  res
  
});