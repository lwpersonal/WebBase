!function(fn){
  var Fn = fn()
  'function' == typeof define && (define.amd || define.cmd) ? define(new Fn()) : void 0
}(function() {
  var info = {
    attribute: 'title',
    eventType: 'hover',
    content: '',
    align: 'center',
    delay: 300,
  }, _time
  var res = function() {
  }
  return res.prototype.init = function(e, t) {
    var textEl = $('*[title]')
    var _this = this
    $(textEl).each(function(index, el) {
      $(el).attr('data-title', $(el).attr('title'))
      .removeAttr('title')
      .hover(function() {
        var _nowTitle = $(this).attr('data-title')
        $('[data-tip]')[0] ? $('[data-tip]>span').text(_nowTitle) : null
        _time = setTimeout(function() {
          var _top = $(el).offset().top, _left = $(el).offset().left, _wid = $(el).width()
          $('[data-tip]').css({
            left: (_left + 15) + 'px',
            marginTop: (_top - 32) + 'px'
          })
          _this.show()
        }, info.delay)
      }, function() {
        clearTimeout(_time)
        _this.hide()
      })
    })
    $('body').append([
      '<div data-tip class="lw-tip" style="display: none;">',
      '<span class="lw-tip-title"></span>',
      '<i class="lw-tip-after"></i>',
      '</div>'
    ].join(''))
  }
  ,
  res.prototype.show = function(e, t) {
    $('[data-tip]').show().addClass('lw-tip-active')
  }
  ,
  res.prototype.hide = function(e, t) {
    $('[data-tip]').hide().removeClass('lw-tip-active')
  }
  ,
  res
  
});