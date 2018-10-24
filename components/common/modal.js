!function(fn){
  var Fn = fn()
  'function' == typeof define && (define.amd || define.cmd) ? define(new Fn()) : void 0
}(function() {
  var res = function() {
  }
  return res.prototype.init = function(e, t) {
    var textEl = $('input[type="radio"]')
    console.log(textEl)
    $(textEl).each(function(index, el) {
      $(el).addClass('lw-input-radio')
      .after($('<label class="lw-input-radio-label"></label>').attr('for', $(el).attr('id')))
    })
  }
  ,
  res
  
});