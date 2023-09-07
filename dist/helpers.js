"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excludeProps = excludeProps;
exports.formatDate = formatDate;
exports.formatPrice = formatPrice;
exports.preventWindowScroll = preventWindowScroll;
function excludeProps(_this) {
  return Object.keys(_this.props).reduce(function (accumulator, key) {
    if (!(key in _this.constructor.propTypes)) {
      accumulator[key] = _this.props[key];
    }
    return accumulator;
  }, {});
}
function formatDate(date, format) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return format.replace('YYYY', date.getFullYear()).replace('MM', ('0' + (date.getMonth() + 1)).slice(-2)).replace('DD', ('0' + date.getDate()).slice(-2)).replace('HH', ('0' + date.getHours()).slice(-2)).replace('mm', ('0' + date.getMinutes()).slice(-2)).replace('ss', ('0' + date.getSeconds()).slice(-2)).replace('sss', ('00' + date.getMilliseconds()).slice(-3));
}
function formatPrice(value) {
  value = value.replace(/[^\d.]/g, '');
  var matches = value.match(/(\d+)(\.\d+)?/);
  if (!matches) {
    return value;
  }
  var _value = matches[1].split('').reverse().reduce(function (accumulator, item, index, arr) {
    accumulator.push(item);
    if ((index + 1) % 3 === 0 && index + 1 < arr.length) {
      accumulator.push(' ');
    }
    return accumulator;
  }, []).reverse().join('');
  return value.replace(new RegExp("^".concat(matches[1])), _value);
}
function preventWindowScroll(prevent) {
  var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (prevent) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';
  } else {
    document.body.removeAttribute('style');
  }
}