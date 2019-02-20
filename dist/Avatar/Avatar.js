"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var Avatar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Avatar, _React$Component);

  function Avatar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Avatar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        size = _this$props.size,
        src = _this$props.src;
    var classNames = (0, _classnames2["default"])((0, _defineProperty2["default"])({
      'Avatar': true
    }, "Avatar_size_".concat(size), !!size), className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), src ? _react["default"].createElement("img", {
      className: "Avatar__img",
      src: src
    }) : children);
  };

  return Avatar;
}(_react["default"].Component);

exports.Avatar = Avatar;
Avatar.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  size: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  src: _propTypes["default"].string
};
Avatar.defaultProps = {
  component: 'div',
  size: 'default'
};