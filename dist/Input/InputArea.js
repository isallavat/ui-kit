"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputArea = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _nl2br = _interopRequireDefault(require("nl2br"));

var _Input2 = require("./Input");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var InputArea =
/*#__PURE__*/
function (_Input) {
  (0, _inheritsLoose2["default"])(InputArea, _Input);

  function InputArea() {
    return _Input.apply(this, arguments) || this;
  }

  var _proto = InputArea.prototype;

  _proto.renderElement = function renderElement(props) {
    var _this = this;

    var value = this.state.value;
    var hiddenText = (0, _nl2br["default"])(value).replace(/\s\s/g, ' &nbsp;') + '&nbsp;';
    return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
      className: "Input__element Input__element_hidden",
      dangerouslySetInnerHTML: {
        __html: hiddenText
      }
    }), _react["default"].createElement("textarea", (0, _extends2["default"])({}, props, {
      ref: function ref(node) {
        _this.inputEl = node;
      }
    })));
  };

  return InputArea;
}(_Input2.Input);

exports.InputArea = InputArea;
InputArea.propTypes = _Input2.Input.propTypes;
InputArea.defaultProps = _objectSpread({}, _Input2.Input.defaultProps, {
  type: 'area'
});