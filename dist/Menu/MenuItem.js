"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var MenuItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(MenuItem, _React$Component);

  function MenuItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MenuItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        divider = _this$props.divider,
        icon = _this$props.icon,
        primary = _this$props.primary,
        secondary = _this$props.secondary,
        action = _this$props.action,
        selected = _this$props.selected,
        hover = _this$props.hover;
    var classNames = (0, _classnames["default"])({
      'MenuItem': true,
      'MenuItem_divider': divider,
      '-hover': hover,
      '-selected': selected
    }, className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), icon && _react["default"].createElement("div", {
      className: "MenuItem__icon"
    }, icon), _react["default"].createElement("div", {
      className: "MenuItem__text"
    }, primary && _react["default"].createElement("div", {
      className: "MenuItem__text-primary"
    }, primary), secondary && _react["default"].createElement("div", {
      className: "MenuItem__text-secondary"
    }, secondary)), action && _react["default"].createElement("div", {
      className: "MenuItem__action"
    }, action));
  };

  return MenuItem;
}(_react["default"].Component);

exports.MenuItem = MenuItem;
MenuItem.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  divider: _propTypes["default"].bool,
  icon: _propTypes["default"].any,
  primary: _propTypes["default"].any,
  secondary: _propTypes["default"].any,
  action: _propTypes["default"].any,
  hover: _propTypes["default"].bool,
  selected: _propTypes["default"].bool
};
MenuItem.defaultProps = {
  component: 'li'
};