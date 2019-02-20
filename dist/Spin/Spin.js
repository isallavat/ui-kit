"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spin = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var Spin =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Spin, _React$Component);

  function Spin() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Spin.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        size = _this$props.size;
    var classNames = (0, _classnames2["default"])((0, _defineProperty2["default"])({
      'Spin': true
    }, "Spin_size_".concat(size), !!size), className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), _react["default"].createElement("svg", {
      width: "30",
      height: "30",
      viewBox: "0 0 30 30",
      xmlns: "http://www.w3.org/2000/svg"
    }, _react["default"].createElement("circle", {
      fill: "none",
      strokeWidth: "2",
      strokeLinecap: "round",
      cx: "15",
      cy: "15",
      r: "13"
    })));
  };

  return Spin;
}(_react["default"].Component);

exports.Spin = Spin;
Spin.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  size: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired
};
Spin.defaultProps = {
  component: 'div',
  size: 'default'
};