"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Spin = require("../Spin");

var _helpers = require("../helpers");

var Button =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Button, _React$Component);

  function Button() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        size = _this$props.size,
        color = _this$props.color,
        variant = _this$props.variant,
        rounded = _this$props.rounded,
        circular = _this$props.circular,
        progress = _this$props.progress,
        fullWidth = _this$props.fullWidth;
    var classNames = (0, _classnames2["default"])((_classnames = {
      'Button': true
    }, (0, _defineProperty2["default"])(_classnames, "Button_size_".concat(size), !!size), (0, _defineProperty2["default"])(_classnames, "Button_color_".concat(color), !!color), (0, _defineProperty2["default"])(_classnames, "Button_variant_".concat(variant), !!variant), (0, _defineProperty2["default"])(_classnames, 'Button_full-width', fullWidth), (0, _defineProperty2["default"])(_classnames, 'Button_rounded', rounded), (0, _defineProperty2["default"])(_classnames, 'Button_circular', circular), (0, _defineProperty2["default"])(_classnames, 'Button_progress', progress), _classnames), className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), _react["default"].createElement("span", {
      className: "Button__content"
    }, children), progress && _react["default"].createElement(_Spin.Spin, {
      className: "Button__spin"
    }));
  };

  return Button;
}(_react["default"].Component);

exports.Button = Button;
Button.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  size: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  color: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  variant: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  rounded: _propTypes["default"].bool,
  circular: _propTypes["default"].bool,
  progress: _propTypes["default"].bool,
  fullWidth: _propTypes["default"].bool
};
Button.defaultProps = {
  component: 'button',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'button'
};