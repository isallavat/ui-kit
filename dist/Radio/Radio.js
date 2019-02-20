"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var Radio =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Radio, _React$Component);

  function Radio() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Radio.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        className = _this$props.className,
        componentProps = _this$props.componentProps,
        size = _this$props.size,
        color = _this$props.color,
        variant = _this$props.variant,
        label = _this$props.label,
        labelPosition = _this$props.labelPosition,
        invalid = _this$props.invalid;
    var classNames = (0, _classnames2["default"])((_classnames = {
      'Radio': true
    }, (0, _defineProperty2["default"])(_classnames, "Radio_size_".concat(size), !!size), (0, _defineProperty2["default"])(_classnames, "Radio_color_".concat(color), !!color), (0, _defineProperty2["default"])(_classnames, "Radio_variant_".concat(variant), !!variant), (0, _defineProperty2["default"])(_classnames, '-invalid', invalid), _classnames), className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, componentProps), _react["default"].createElement("input", (0, _extends2["default"])({}, (0, _helpers.excludeProps)(this), {
      type: "radio"
    })), _react["default"].createElement("div", {
      className: "Radio__container"
    }, _react["default"].createElement("span", {
      className: "Radio__element"
    }, _react["default"].createElement("span", {
      className: "Radio__element-handle"
    })), !!label && _react["default"].createElement("div", {
      className: (0, _classnames2["default"])('Radio__label', "Radio__label_position_".concat(labelPosition))
    }, label)));
  };

  return Radio;
}(_react["default"].Component);

exports.Radio = Radio;
Radio.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  componentProps: _propTypes["default"].object,
  size: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  color: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  variant: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  label: _propTypes["default"].string,
  labelPosition: _propTypes["default"].oneOf(['start', 'end']),
  invalid: _propTypes["default"].bool
};
Radio.defaultProps = {
  component: 'label',
  size: 'm',
  color: 'default',
  variant: 'default',
  labelPosition: 'end'
};