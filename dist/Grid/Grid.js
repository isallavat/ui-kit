"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var Grid =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Grid, _React$Component);

  function Grid() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Grid.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        className = _this$props.className,
        container = _this$props.container,
        item = _this$props.item,
        spacing = _this$props.spacing,
        s = _this$props.s,
        m = _this$props.m,
        l = _this$props.l;
    var classNames = (0, _classnames2.default)((_classnames = {
      'Grid': true,
      'Grid_container': container,
      'Grid_item': item
    }, (0, _defineProperty2.default)(_classnames, "Grid_spacing_".concat(spacing), container && !!spacing), (0, _defineProperty2.default)(_classnames, "Grid_s_".concat(s), item && s), (0, _defineProperty2.default)(_classnames, "Grid_m_".concat(m), item && m), (0, _defineProperty2.default)(_classnames, "Grid_l_".concat(l), item && l), _classnames), className);
    return _react.default.createElement(this.props.component, (0, _extends2.default)({
      className: classNames
    }, (0, _helpers.excludeProps)(this)));
  };

  return Grid;
}(_react.default.Component);

exports.Grid = Grid;
Grid.propTypes = {
  component: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.func.isRequired]).isRequired,
  className: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.object.isRequired, _propTypes.default.array.isRequired]),
  container: _propTypes.default.bool,
  item: _propTypes.default.bool,
  spacing: _propTypes.default.number,
  s: _propTypes.default.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true]),
  m: _propTypes.default.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true]),
  l: _propTypes.default.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true])
};
Grid.defaultProps = {
  component: 'div'
};