"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutsideClickHandler = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _helpers = require("../helpers");

var OutsideClickHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(OutsideClickHandler, _React$Component);

  function OutsideClickHandler(props) {
    var _context;

    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.handleClick = (_context = _this).handleClick.bind(_context);
    return _this;
  }

  var _proto = OutsideClickHandler.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.isTouchableDevice()) {
      document.addEventListener('touchstart', this.handleClick, true);
    } else {
      document.addEventListener('click', this.handleClick, true);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleClick, true);
    document.removeEventListener('click', this.handleClick, true);
  };

  _proto.isTouchableDevice = function isTouchableDevice() {
    return 'ontouchstart' in window;
  };

  _proto.handleClick = function handleClick(event) {
    var _this$props = this.props,
        disabled = _this$props.disabled,
        onOutsideClick = _this$props.onOutsideClick;
    var root = this.refs.root;

    if (!disabled && root !== event.target && !root.contains(event.target)) {
      onOutsideClick && onOutsideClick();
    }
  };

  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, (0, _helpers.excludeProps)(this), {
      ref: "root"
    }), this.props.children);
  };

  return OutsideClickHandler;
}(_react["default"].Component);

exports.OutsideClickHandler = OutsideClickHandler;
OutsideClickHandler.propTypes = {
  children: _propTypes["default"].any,
  disabled: _propTypes["default"].bool,
  onOutsideClick: _propTypes["default"].func
};