"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _helpers = require("../helpers");
var Menu = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Menu, _React$Component);
  function Menu() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = Menu.prototype;
  _proto.scrollToSelected = function scrollToSelected(index, exact) {
    if (index >= 0) {
      var selectedItemEl = this.refRoot.childNodes[index];
      if (exact) {
        this.refRoot.scrollTop = selectedItemEl.offsetTop;
      } else if (selectedItemEl.offsetTop < this.refRoot.scrollTop) {
        this.refRoot.scrollTop = selectedItemEl.offsetTop;
      } else if (selectedItemEl.offsetTop + selectedItemEl.offsetHeight > this.refRoot.offsetHeight + this.refRoot.scrollTop) {
        this.refRoot.scrollTop = selectedItemEl.offsetTop + selectedItemEl.offsetHeight - this.refRoot.offsetHeight;
      }
    } else {
      this.refRoot.scrollTop = 0;
    }
  };
  _proto.render = function render() {
    var _this = this;
    var className = this.props.className;
    var classNames = (0, _classnames["default"])({
      Menu: true
    }, className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this), {
      ref: function ref(_ref) {
        _this.refRoot = _ref;
      }
    }));
  };
  return Menu;
}(_react["default"].Component);
exports.Menu = Menu;
Menu.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired])
};
Menu.defaultProps = {
  component: 'ul'
};