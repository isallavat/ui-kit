"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardHeader = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var CardHeader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(CardHeader, _React$Component);

  function CardHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CardHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        icon = _this$props.icon,
        primary = _this$props.primary,
        secondary = _this$props.secondary,
        action = _this$props.action;
    var classNames = (0, _classnames.default)({
      'CardHeader': true
    }, className);
    return _react.default.createElement(this.props.component, (0, _extends2.default)({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), icon && _react.default.createElement("div", {
      className: "CardHeader__icon"
    }, icon), _react.default.createElement("div", {
      className: "CardHeader__text"
    }, primary && _react.default.createElement("div", {
      className: "CardHeader__text-primary"
    }, primary), secondary && _react.default.createElement("div", {
      className: "CardHeader__text-secondary"
    }, secondary)), action && _react.default.createElement("div", {
      className: "CardHeader__action"
    }, action));
  };

  return CardHeader;
}(_react.default.Component);

exports.CardHeader = CardHeader;
CardHeader.propTypes = {
  component: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.func.isRequired]).isRequired,
  className: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.object.isRequired, _propTypes.default.array.isRequired]),
  icon: _propTypes.default.any,
  primary: _propTypes.default.any,
  secondary: _propTypes.default.any,
  action: _propTypes.default.any
};
CardHeader.defaultProps = {
  component: 'div'
};