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
    var selectEl = $('select')
    var _this = this
    $(selectEl).each(function(index, el) {
      var optionEl = $(el).children()
      var _val = $(el).val() ? $(el).children('option[selected]').text() : $(el).children().eq(0).text()
      var resHtml = [
        '<div class="lw-select">',
        '<a class="lw-select-button" href="javascript:;">',
        '<span class="lw-select-text">' + _val + '</span>',
        '<i class="lw-select-icon"></i></a>',
        '<div class="lw-select-datalist">',
      ]
      $(optionEl).each(function(_index, _el) {
        var _selectedClass = _val === $(_el).text() ? 'selected' : ''
        resHtml.push('<a class="ui-select-datalist-li ' + _selectedClass + '" href="javascript:;" data-index="' + _index + '">' + $(_el).text() + '</a>')
      })
      resHtml.push('</div></div>')
      $(el).hide()
      .after(resHtml.join(''))
    })
    $('.lw-select').click(function() {
      $(this).toggleClass('active')
    })
    $('.ui-select-datalist-li').click(function() {
      var _select = $('.lw-select').prev()
      _select.val(_select.children().eq($(this).index()).val())
      $(this).parent().prev().children('.lw-select-text').text($(this).text())
      $(this).siblings().removeClass('selected')
      $(this).addClass('selected')
    })
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