"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Progress = require("../Progress");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

  _proto.update = function update(props) {
    var visible = this.state.visible;

    if (visible) {
      this._props = props;
      this.forceUpdate();
    }
  };

  _proto.preventWindowScroll = function preventWindowScroll(event) {
    window.scrollTo(0, this.pageYOffset);
    event.preventDefault();
    event.returnValue = false;
  };

  _proto.getMergedProps = function getMergedProps() {
    return _objectSpread({}, this.props, {}, this._props);
  };

  _proto.handleKeyUp = function handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  };

  _proto.handleMouseDown = function handleMouseDown(event) {
    var window = this.refs.window;

    if (!window || window !== event.target && !window.contains(event.target)) {
      this.close();
    }
  };

  _proto.renderContent = function renderContent() {
    return this.getMergedProps().children;
  };

  _proto.renderClose = function renderClose() {
    return _react["default"].createElement("div", {
      className: "Modal__close",
      onClick: this.close.bind(this)
    });
  };

  _proto.render = function render() {
    var _this$getMergedProps = this.getMergedProps(),
        className = _this$getMergedProps.className,
        size = _this$getMergedProps.size,
        title = _this$getMergedProps.title,
        closeButton = _this$getMergedProps.closeButton,
        loading = _this$getMergedProps.loading;

    var visible = this.state.visible;
    var classNames = (0, _classnames2["default"])((0, _defineProperty2["default"])({
      'Modal': true
    }, "Modal_size_".concat(size), true), className);
    return visible ? _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this), {
      onMouseDown: this.handleMouseDown.bind(this),
      onTouchStart: this.handleMouseDown.bind(this)
    }), _react["default"].createElement("div", {
      className: "Modal__overlay"
    }), loading ? _react["default"].createElement(_Progress.Progress, {
      className: "Modal__progress",
      color: "current"
    }) : _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
      className: "Modal__container"
    }, _react["default"].createElement("div", {
      className: "Modal__window",
      ref: "window"
    }, _react["default"].createElement("div", {
      className: "Modal__header"
    }, _react["default"].createElement("h3", {
      className: "Modal__title"
    }, title), closeButton === 'inside' && this.renderClose()), _react["default"].createElement("div", {
      className: "Modal__content"
    }, this.renderContent()))), closeButton === 'outside' && this.renderClose())) : '';
  };

  return Modal;
}(_react["default"].Component);

exports.Modal = Modal;
Modal.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  size: _propTypes["default"].string.isRequired,
  title: _propTypes["default"].any,
  closeButton: _propTypes["default"].oneOf(['inside', 'outside', false]),
  onClose: _propTypes["default"].func
};
Modal.defaultProps = {
  component: 'div',
  size: 'm',
  closeButton: 'inside'
};