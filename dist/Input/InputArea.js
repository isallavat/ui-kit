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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var InputArea = /*#__PURE__*/function (_Input) {
  (0, _inheritsLoose2["default"])(InputArea, _Input);

  function InputArea() {
    return _Input.apply(this, arguments) || this;
  }

  var _proto = InputArea.prototype;

  _proto.renderElement = function renderElement(props) {
    var _this = this;

    var value = this.state.value;
    var hiddenText = value.replace(/\n/g, '<br />').replace(/\s\s/g, '&nbsp; ');
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Input__element Input__element_hidden",
      dangerouslySetInnerHTML: {
        __html: hiddenText
      }
    }), /*#__PURE__*/_react["default"].createElement("textarea", (0, _extends2["default"])({}, props, {
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