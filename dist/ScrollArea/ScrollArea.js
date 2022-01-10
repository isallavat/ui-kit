"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollArea = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _reactPerfectScrollbar = _interopRequireDefault(require("react-perfect-scrollbar"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var div = document.createElement('div');
var div2 = document.createElement('div');
div.style.left = '0px';
div.style.right = '0px';
div.style.bottom = '100%';
div2.style.height = '100000px';
div.appendChild(div2);
document.body.appendChild(div);
var scrollbarWidth = window.innerWidth - div.offsetWidth;
document.body.removeChild(div);

var ScrollArea = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(ScrollArea, _React$Component);

  function ScrollArea() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ScrollArea.prototype;

  _proto.render = function render() {
    var props = _objectSpread({}, this.props);

    var Component = scrollbarWidth ? _reactPerfectScrollbar["default"] : 'div';

    if (Component === 'div') {
      props.ref = props.containerRef;
      delete props.containerRef;
      delete props.options;
    } else {
      props.options = _objectSpread({
        wheelSpeed: 0.5,
        wheelPropagation: false
      }, props.options);
    }

    return /*#__PURE__*/_react["default"].createElement(Component, props, this.props.children);
  };

  return ScrollArea;
}(_react["default"].Component);

exports.ScrollArea = ScrollArea;