"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridItem = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var GridItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(GridItem, _React$Component);

  function GridItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = GridItem.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        className = _this$props.className,
        full = _this$props.full,
        mobile = _this$props.mobile,
        tablet = _this$props.tablet,
        desktop = _this$props.desktop;
    var classNames = (0, _classnames2["default"])((_classnames = {
      'GridItem': true,
      'GridItem_full': full
    }, (0, _defineProperty2["default"])(_classnames, "GridItem_mobile_".concat(mobile), !!mobile), (0, _defineProperty2["default"])(_classnames, "GridItem_tablet_".concat(tablet), !!tablet), (0, _defineProperty2["default"])(_classnames, "GridItem_desktop_".concat(desktop), !!desktop), _classnames), className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)));
  };

  return GridItem;
}(_react["default"].Component);

exports.GridItem = GridItem;
GridItem.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  full: _propTypes["default"].bool,
  mobile: _propTypes["default"].number,
  tablet: _propTypes["default"].number,
  desktop: _propTypes["default"].number
};
GridItem.defaultProps = {
  component: 'div'
};