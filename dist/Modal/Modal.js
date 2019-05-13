"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var Modal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Modal, _React$Component);

  function Modal(props) {
    var _context;

    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {};
    _this.handleKeyUp = (_context = _this).handleKeyUp.bind(_context);
    _this.preventWindowScroll = (_context = _this).preventWindowScroll.bind(_context);
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('scroll', this.preventWindowScroll);
    document.removeEventListener('keyup', this.handleKeyUp);
  };

  _proto.open = function open(props) {
    this._props = props;
    this.setState({
      visible: true
    });
    this.pageYOffset = window.pageYOffset;
    window.addEventListener('scroll', this.preventWindowScroll);
    document.addEventListener('keyup', this.handleKeyUp);
  };

  _proto.close = function close() {
    var onClose = this.props.onClose;
    this.componentWillUnmount();
    this.setState({
      visible: false
    });
    onClose && onClose();
  };

  _proto.preventWindowScroll = function preventWindowScroll(event) {
    window.scrollTo(0, this.pageYOffset);
    event.preventDefault();
    event.returnValue = false;
  };

  _proto.getMergedProps = function getMergedProps() {
    return (0, _objectSpread2["default"])({}, this.props, this._props);
  };

  _proto.handleKeyUp = function handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  };

  _proto.handleClick = function handleClick(event) {
    var window = this.refs.window;

    if (window !== event.target && !window.contains(event.target)) {
      this.close();
    }
  };

  _proto.renderContent = function renderContent() {
    return this.getMergedProps().children;
  };

  _proto.render = function render() {
    var _this$getMergedProps = this.getMergedProps(),
        className = _this$getMergedProps.className,
        size = _this$getMergedProps.size,
        title = _this$getMergedProps.title,
        closeButton = _this$getMergedProps.closeButton;

    var visible = this.state.visible;
    var classNames = (0, _classnames2["default"])((0, _defineProperty2["default"])({
      'Modal': true
    }, "Modal_size_".concat(size), true), className);
    return visible ? _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this), {
      onClick: this.handleClick.bind(this)
    }), _react["default"].createElement("div", {
      className: "Modal__overlay"
    }), _react["default"].createElement("div", {
      className: "Modal__container"
    }, _react["default"].createElement("div", {
      className: "Modal__window",
      ref: "window"
    }, _react["default"].createElement("div", {
      className: "Modal__header"
    }, _react["default"].createElement("h3", {
      className: "Modal__title"
    }, title), closeButton && _react["default"].createElement("div", {
      className: "Modal__close",
      onClick: this.close.bind(this)
    })), _react["default"].createElement("div", {
      className: "Modal__content"
    }, this.renderContent())))) : '';
  };

  return Modal;
}(_react["default"].Component);

exports.Modal = Modal;
Modal.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  size: _propTypes["default"].string.isRequired,
  title: _propTypes["default"].any,
  closeButton: _propTypes["default"].bool,
  onClose: _propTypes["default"].func
};
Modal.defaultProps = {
  component: 'div',
  size: 'm',
  closeButton: true
};