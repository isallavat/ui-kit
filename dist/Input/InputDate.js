"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDate = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Calendar = require("../Calendar");

var _Input2 = require("./Input");

var _helpers = require("../helpers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var iconCalendar = /*#__PURE__*/_react["default"].createElement("svg", {
  className: "Input__icon Input__icon_calendar",
  xmlns: "http://www.w3.org/2000/svg",
  width: "30",
  height: "30",
  viewBox: "0 0 30 30"
}, /*#__PURE__*/_react["default"].createElement("g", {
  fill: "currentColor"
}, /*#__PURE__*/_react["default"].createElement("rect", {
  width: "30",
  height: "30",
  fill: "none"
}), /*#__PURE__*/_react["default"].createElement("path", {
  d: "M8.25,1A1.25,1.25,0,0,0,7,2.25V4.125H4.5A2.5,2.5,0,0,0,2,6.625v18.75a2.5,2.5,0,0,0,2.5,2.5h20a2.5,2.5,0,0,0,2.5-2.5V6.625a2.5,2.5,0,0,0-2.5-2.5H22V2.25a1.25,1.25,0,1,0-2.5,0V4.125H9.5V2.25A1.25,1.25,0,0,0,8.25,1ZM19.5,5.375V6A1.25,1.25,0,1,0,22,6V5.375h2.5a1.25,1.25,0,0,1,1.25,1.25v18.75a1.25,1.25,0,0,1-1.25,1.25H4.5a1.251,1.251,0,0,1-1.25-1.25V6.625A1.251,1.251,0,0,1,4.5,5.375H7V6A1.25,1.25,0,1,0,9.5,6V5.375Z",
  transform: "translate(0.501 0.25)"
}), /*#__PURE__*/_react["default"].createElement("path", {
  d: "M5,9h5v2.5H5Zm6.249,0h5v2.5h-5ZM5,15.251h5v2.5H5Zm6.249,0h5v2.5h-5ZM17.5,9h5v2.5h-5Z",
  transform: "translate(1.251 2.249)"
})));

var InputDate = /*#__PURE__*/function (_Input) {
  (0, _inheritsLoose2["default"])(InputDate, _Input);

  function InputDate() {
    return _Input.apply(this, arguments) || this;
  }

  var _proto = InputDate.prototype;

  _proto.valueToDate = function valueToDate(value) {
    var format = this.props.format;
    var year = value.substr(format.indexOf('YYYY'), 4) * 1;
    var month = value.substr(format.indexOf('MM'), 2) * 1 - 1;
    var day = value.substr(format.indexOf('DD'), 2) * 1;
    var hours = value.substr(format.indexOf('HH'), 2) * 1;
    var minutes = value.substr(format.indexOf('mm'), 2) * 1;
    var seconds = value.substr(format.indexOf('ss'), 2) * 1;
    var milliseconds = value.substr(format.indexOf('sss'), 3) * 1;

    if (year && month && day) {
      return new Date(year, month, day, hours, minutes, seconds, milliseconds);
    }
  };

  _proto.handleCalendarChange = function handleCalendarChange(value) {
    var format = this.props.format;
    var date = new Date(value);
    var event = {
      target: this.inputEl
    };
    event.target.value = (0, _helpers.formatDate)(date, format);
    this.handleChange(event);
  };

  _proto.handleBlur = function handleBlur(event) {
    var readOnly = this.props.readOnly;

    if (readOnly) {
      return false;
    }

    if (this.dropDownMouseDown) {
      this.inputEl.focus();
      this.dropDownMouseDown = false;
    } else {
      _Input.prototype.handleBlur.call(this, event);
    }
  };

  _proto.renderElement = function renderElement(props) {
    var _this = this;

    var _this$props = this.props,
        min = _this$props.min,
        max = _this$props.max,
        format = _this$props.format;
    var value = this.state.value;
    var date = this.valueToDate(value);
    props.type = 'text';
    props.mask = format.replace('YYYY', '####').replace('MM', '##').replace('DD', '##').replace('HH', '##').replace('mm', '##').replace('ss', '##').replace('sss', '###');
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, _Input.prototype.renderElement.call(this, props), /*#__PURE__*/_react["default"].createElement("div", {
      onMouseDown: function onMouseDown() {
        _this.dropDownMouseDown = true;
      }
    }, this.renderDropdown( /*#__PURE__*/_react["default"].createElement(_Calendar.Calendar, {
      value: date && String(date) !== 'Invalid Date' ? date.toISOString() : '',
      min: min,
      max: max,
      onChange: this.handleCalendarChange.bind(this)
    }))));
  };

  return InputDate;
}(_Input2.Input);

exports.InputDate = InputDate;
InputDate.propTypes = _Input2.Input.propTypes;
InputDate.defaultProps = _objectSpread(_objectSpread({}, _Input2.Input.defaultProps), {}, {
  type: 'date',
  suffix: iconCalendar,
  format: 'DD.MM.YYYY'
});