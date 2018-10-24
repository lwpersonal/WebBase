/*
 * @Author: wenjiawei
 * @Date: 2018-04-07 13:24:01
 * @Last Modified by: AI
 * @Last Modified time: 2018-04-22 23:34:46
 * @description
 */

'use strict'

;(function(doc, win, undefined){

  const getElementFromArr = (arr, config) => {
    const docf = doc.createDocumentFragment()
    const { type, className } = config
    arr.map( (item, index) => {
      const ele = doc.createElement(type)
      const spaceNum = item.match(/\B {2}/g) === null ? 0 : item.match(/\B {2}/g).length
      $(ele).addClass(className).text(item).css({textIndent: spaceNum + 'em'})
      docf.appendChild(ele)
    } )
    return docf
  }
  const getSvgItem = (el, obj, index) => {
    const { title, text, prompt, render, h } = obj
    const html = `
    <li class="svg-item">
      ${h ? `<h2 class="line-title" id="${h.id}">` + h.title + '</h2>' : ''}
      <h3 class="svg-item-title">${index + 1}、${title}</h3>
      ${prompt ? '<p class="svg-item-prompt">语法：<span style="color: #00a3cf">' + prompt + '</span></p>' : ''}
      ${text ? '<p class="svg-item-text">描述：' + text + '</p>' : ''}
      <div class="svg-item-code"></div>
      <div class="svg-item-show"></div>
    </li>
    `
    const ele = getElementFromArr(render.html.split(/\n/), {
      type: 'p',
      className: 'svg-item-code-list'
    })
    $(el).append(html)
    $(el).children().eq(index).children('.svg-item-code').append(ele)
    render.sta && $(el).children().eq(index).children('.svg-item-show').append(render.html)
  }

  class Svg {
    // el 绑定元素
    constructor(obj) {
      console.log(obj.el)
      const { el, data } = obj
      data.map( (item, index) => {
        getSvgItem(el, item, index)
      } )
    }
  }

  window.Svg = Svg
}(document, window));