"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _helpers = require("../helpers");
var Tooltip = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Tooltip, _React$Component);
  function Tooltip() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = Tooltip.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      className = _this$props.className,
      tooltip = _this$props.tooltip,
      position = _this$props.position;
    var classNames = (0, _classnames["default"])({
      Tooltip: true
    }, className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Tooltip__content --".concat(position)
    }, tooltip), /*#__PURE__*/_react["default"].createElement("div", null, this.props.children));
  };
  return Tooltip;
}(_react["default"].Component);
exports.Tooltip = Tooltip;
Tooltip.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  tooltip: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].element.isRequired]),
  position: _propTypes["default"].oneOf(['top', 'left', 'right', 'bottom']),
  children: _propTypes["default"].any
};
Tooltip.defaultProps = {
  component: 'div',
  position: 'top'
};