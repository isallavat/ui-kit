"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDate = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Calendar = require("../Calendar");

var _Input2 = require("./Input");

var iconCalendar = _react["default"].createElement("svg", {
  className: "Input__icon Input__icon_calendar",
  xmlns: "http://www.w3.org/2000/svg",
  width: "30",
  height: "30",
  viewBox: "0 0 30 30"
}, _react["default"].createElement("g", {
  fill: "currentColor"
}, _react["default"].createElement("rect", {
  width: "30",
  height: "30",
  fill: "none"
}), _react["default"].createElement("path", {
  d: "M8.25,1A1.25,1.25,0,0,0,7,2.25V4.125H4.5A2.5,2.5,0,0,0,2,6.625v18.75a2.5,2.5,0,0,0,2.5,2.5h20a2.5,2.5,0,0,0,2.5-2.5V6.625a2.5,2.5,0,0,0-2.5-2.5H22V2.25a1.25,1.25,0,1,0-2.5,0V4.125H9.5V2.25A1.25,1.25,0,0,0,8.25,1ZM19.5,5.375V6A1.25,1.25,0,1,0,22,6V5.375h2.5a1.25,1.25,0,0,1,1.25,1.25v18.75a1.25,1.25,0,0,1-1.25,1.25H4.5a1.251,1.251,0,0,1-1.25-1.25V6.625A1.251,1.251,0,0,1,4.5,5.375H7V6A1.25,1.25,0,1,0,9.5,6V5.375Z",
  transform: "translate(0.501 0.25)"
}), _react["default"].createElement("path", {
  d: "M5,9h5v2.5H5Zm6.249,0h5v2.5h-5ZM5,15.251h5v2.5H5Zm6.249,0h5v2.5h-5ZM17.5,9h5v2.5h-5Z",
  transform: "translate(1.251 2.249)"
})));

var InputDate =
/*#__PURE__*/
function (_Input) {
  (0, _inheritsLoose2["default"])(InputDate, _Input);

  function InputDate() {
    return _Input.apply(this, arguments) || this;
  }

  var _proto = InputDate.prototype;

  _proto.formatDate = function formatDate(date, format) {
    return format.replace('YYYY', date.getFullYear()).replace('MM', ('0' + (date.getMonth() + 1)).slice(-2)).replace('DD', ('0' + date.getDate()).slice(-2));
  };

  _proto.valueToDate = function valueToDate(value) {
    var format = this.props.format;
    var year = value.substr(format.indexOf('YYYY'), 4) * 1;
    var month = value.substr(format.indexOf('MM'), 2) * 1 - 1;
    var day = value.substr(format.indexOf('DD'), 2) * 1;

    if (year && month && day) {
      return new Date(year, month, day);
    }
  };

  _proto.handleCalendarChange = function handleCalendarChange(value) {
    var format = this.props.format;
    var date = new Date(value);
    var event = {
      target: this.inputEl
    };
    event.target.value = this.formatDate(date, format);
    this.handleChange(event);
  };

  _proto.renderElement = function renderElement(props) {
    var _this$props = this.props,
        min = _this$props.min,
        max = _this$props.max,
        format = _this$props.format;
    var value = this.state.value;
    var date = this.valueToDate(value);
    props.type = 'text';
    props.mask = format.replace('DD', '99').replace('MM', '99').replace('YYYY', '9999');
    return _react["default"].createElement(_react.Fragment, null, _Input.prototype.renderElement.call(this, props), this.renderDropdown(_react["default"].createElement(_Calendar.Calendar, {
      value: date ? date.getTime() : 0,
      min: min,
      max: max,
      onChange: this.handleCalendarChange.bind(this)
    })));
  };

  return InputDate;
}(_Input2.Input);

exports.InputDate = InputDate;
InputDate.propTypes = _Input2.Input.propTypes;
InputDate.defaultProps = (0, _objectSpread2["default"])({}, _Input2.Input.defaultProps, {
  type: 'date',
  adornment: iconCalendar,
  format: 'DD.MM.YYYY'
});