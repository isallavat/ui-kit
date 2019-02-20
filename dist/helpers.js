"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excludeProps = excludeProps;
exports.formatDate = formatDate;

function excludeProps(_this) {
  return Object.keys(_this.props).reduce(function (accumulator, key) {
    if (!_this.constructor.propTypes.hasOwnProperty(key)) {
      accumulator[key] = _this.props[key];
    }

    return accumulator;
  }, {});
}

function formatDate(date, format) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return format.replace('YYYY', date.getFullYear()).replace('MM', ('0' + (date.getMonth() + 1)).slice(-2)).replace('DD', ('0' + date.getDate()).slice(-2)).replace('HH', ('0' + date.getHours()).slice(-2)).replace('mm', ('0' + date.getMinutes()).slice(-2)).replace('ss', ('0' + date.getSeconds()).slice(-2));
}