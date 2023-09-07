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
var _classnames3 = _interopRequireDefault(require("classnames"));
var _helpers = require("../helpers");
var Radio = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Radio, _React$Component);
  function Radio(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.state = {
      checked: props.checked !== undefined ? Boolean(props.checked) : Boolean(props.defaultChecked)
    };
    return _this;
  }
  var _proto = Radio.prototype;
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var checked = this.props.checked;
    if (checked !== prevProps.checked && checked !== this.state.checked) {
      this.setState({
        checked: Boolean(checked)
      });
    }
  };
  _proto.handleChange = function handleChange(event) {
    var _this$props = this.props,
      readOnly = _this$props.readOnly,
      onChange = _this$props.onChange;
    if (readOnly) {
      return;
    }
    this.setState({
      checked: event.target.checked
    });
    onChange && onChange(event);
  };
  _proto.renderElement = function renderElement() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Radio__element"
    });
  };
  _proto.render = function render() {
    var _classnames;
    var _this$props2 = this.props,
      className = _this$props2.className,
      componentProps = _this$props2.componentProps,
      size = _this$props2.size,
      color = _this$props2.color,
      variant = _this$props2.variant,
      label = _this$props2.label,
      labelPosition = _this$props2.labelPosition,
      invalid = _this$props2.invalid,
      disabled = _this$props2.disabled;
    var checked = this.state.checked;
    var classNames = (0, _classnames3["default"])((_classnames = {
      Radio: true
    }, (0, _defineProperty2["default"])(_classnames, "Radio_size_".concat(size), true), (0, _defineProperty2["default"])(_classnames, "Radio_color_".concat(color), true), (0, _defineProperty2["default"])(_classnames, "Radio_variant_".concat(variant), true), (0, _defineProperty2["default"])(_classnames, '--checked', checked), (0, _defineProperty2["default"])(_classnames, '--invalid', invalid), (0, _defineProperty2["default"])(_classnames, '--disabled', disabled), _classnames), className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, componentProps), /*#__PURE__*/_react["default"].createElement("label", {
      className: "Radio__container"
    }, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({}, (0, _helpers.excludeProps)(this), {
      className: "Radio__input",
      type: "radio",
      checked: checked,
      onChange: this.handleChange.bind(this)
    })), variant !== 'button' && this.renderElement(), !!label && /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames3["default"])((0, _defineProperty2["default"])({
        Radio__label: true
      }, "Radio__label_position_".concat(labelPosition), true))
    }, label)));
  };
  return Radio;
}(_react["default"].Component);
exports.Radio = Radio;
Radio.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  componentProps: _propTypes["default"].object,
  size: _propTypes["default"].string.isRequired,
  color: _propTypes["default"].string.isRequired,
  variant: _propTypes["default"].oneOf(['default', 'button']),
  label: _propTypes["default"].any,
  labelPosition: _propTypes["default"].oneOf(['start', 'end']),
  invalid: _propTypes["default"].bool,
  checked: _propTypes["default"].bool,
  readOnly: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  defaultValue: _propTypes["default"].any,
  defaultChecked: _propTypes["default"].bool,
  onChange: _propTypes["default"].func
};
Radio.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  labelPosition: 'end'
};