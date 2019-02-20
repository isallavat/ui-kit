"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.open = function open() {
    this.setState({
      visible: true
    });
    document.body.style.overflow = 'hidden';
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

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.state.visible) {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keyup', this.handleKeyUp);
    }
  };

  _proto.handleKeyUp = function handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        size = _this$props.size,
        title = _this$props.title,
        closeButton = _this$props.closeButton;
    var visible = this.state.visible;
    var classNames = (0, _classnames2["default"])((0, _defineProperty2["default"])({
      'Modal': true
    }, "Modal_size_".concat(size), !!size), className);
    return visible ? _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), _react["default"].createElement("div", {
      className: "Modal__overlay",
      onClick: this.close.bind(this)
    }), _react["default"].createElement("div", {
      className: "Modal__container"
    }, _react["default"].createElement("div", {
      className: "Modal__window"
    }, _react["default"].createElement("div", {
      className: "Modal__header"
    }, _react["default"].createElement("h3", {
      className: "Modal__title"
    }, title), closeButton && _react["default"].createElement("div", {
      className: "Modal__close",
      onClick: this.close.bind(this)
    })), _react["default"].createElement("div", {
      className: "Modal__content"
    }, children)))) : '';
  };

  return Modal;
}(_react["default"].Component);

exports.Modal = Modal;
Modal.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  size: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  title: _propTypes["default"].any,
  closeButton: _propTypes["default"].bool,
  onClose: _propTypes["default"].func
};
Modal.defaultProps = {
  component: 'div',
  size: 'm',
  closeButton: true
};