"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputArea = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _Input2 = require("./Input");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var InputArea = /*#__PURE__*/function (_Input) {
  (0, _inheritsLoose2["default"])(InputArea, _Input);
  function InputArea() {
    return _Input.apply(this, arguments) || this;
  }
  var _proto = InputArea.prototype;
  _proto.renderElement = function renderElement(props) {
    var _this = this;
    var value = this.state.value;
    var hiddenText = value.replace(/\n$/g, '<br />&nbsp;');
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Input__element Input__element_hidden",
      dangerouslySetInnerHTML: {
        __html: hiddenText
      }
    }), /*#__PURE__*/_react["default"].createElement("textarea", (0, _extends2["default"])({}, props, {
      className: "Input__element Input__element_visible",
      ref: function ref(node) {
        _this.inputEl = node;
      }
    })));
  };
  return InputArea;
}(_Input2.Input);
exports.InputArea = InputArea;
InputArea.propTypes = _Input2.Input.propTypes;
InputArea.defaultProps = _objectSpread(_objectSpread({}, _Input2.Input.defaultProps), {}, {
  type: 'area'
});