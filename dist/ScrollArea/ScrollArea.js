"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollArea = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactPerfectScrollbar = _interopRequireDefault(require("react-perfect-scrollbar"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
ScrollArea.propTypes = {
  children: _propTypes["default"].any
};