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

var _Progress = require("../Progress");

var _helpers = require("../helpers");

var Button = /*#__PURE__*/function (_React$Component) {
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
        align = _this$props.align,
        rounded = _this$props.rounded,
        circular = _this$props.circular,
        noresize = _this$props.noresize,
        progress = _this$props.progress,
        fullWidth = _this$props.fullWidth,
        disabled = _this$props.disabled;
    var classNames = (0, _classnames2["default"])((_classnames = {
      'Button': true
    }, (0, _defineProperty2["default"])(_classnames, "Button_size_".concat(size), true), (0, _defineProperty2["default"])(_classnames, "Button_color_".concat(color), true), (0, _defineProperty2["default"])(_classnames, "Button_variant_".concat(variant), true), (0, _defineProperty2["default"])(_classnames, "Button_align_".concat(align), true), (0, _defineProperty2["default"])(_classnames, 'Button_full-width', fullWidth), (0, _defineProperty2["default"])(_classnames, 'Button_rounded', rounded), (0, _defineProperty2["default"])(_classnames, 'Button_circular', circular), (0, _defineProperty2["default"])(_classnames, '--progress', progress), (0, _defineProperty2["default"])(_classnames, '--disabled', disabled), _classnames), className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames2["default"])({
        'Button__content': true,
        'Button__content_centered': noresize,
        'Button__content_hidden': progress
      })
    }, children), progress && /*#__PURE__*/_react["default"].createElement("div", {
      className: "Button__progress-container"
    }, /*#__PURE__*/_react["default"].createElement(_Progress.Progress, {
      className: "Button__progress",
      color: "current"
    })));
  };

  return Button;
}(_react["default"].Component);

exports.Button = Button;
Button.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  size: _propTypes["default"].string.isRequired,
  color: _propTypes["default"].string.isRequired,
  variant: _propTypes["default"].string.isRequired,
  rounded: _propTypes["default"].bool,
  circular: _propTypes["default"].bool,
  noresize: _propTypes["default"].bool,
  progress: _propTypes["default"].bool,
  fullWidth: _propTypes["default"].bool,
  align: _propTypes["default"].oneOf(['left', 'center', 'right', 'justify']).isRequired
};
Button.defaultProps = {
  component: 'button',
  size: 'm',
  color: 'default',
  variant: 'default',
  align: 'center',
  type: 'button'
};