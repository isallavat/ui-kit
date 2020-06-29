"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridContainer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var GridContainer = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(GridContainer, _React$Component);

  function GridContainer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = GridContainer.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        className = _this$props.className,
        spacing = _this$props.spacing,
        align = _this$props.align,
        valign = _this$props.valign;
    var classNames = (0, _classnames2["default"])((_classnames = {
      'GridContainer': true
    }, (0, _defineProperty2["default"])(_classnames, "GridContainer_spacing_".concat(spacing), !!spacing), (0, _defineProperty2["default"])(_classnames, "GridContainer_align_".concat(align), !!align), (0, _defineProperty2["default"])(_classnames, "GridContainer_valign_".concat(valign), !!valign), _classnames), className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)));
  };

  return GridContainer;
}(_react["default"].Component);

exports.GridContainer = GridContainer;
GridContainer.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  spacing: _propTypes["default"].number,
  align: _propTypes["default"].oneOf(['left', 'center', 'right', 'around', 'between']),
  valign: _propTypes["default"].oneOf(['top', 'center', 'bottom'])
};
GridContainer.defaultProps = {
  component: 'div'
};