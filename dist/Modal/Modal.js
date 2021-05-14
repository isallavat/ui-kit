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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Modal = /*#__PURE__*/function (_React$Component) {
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

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.state.visible) {
      this.close();
    }
  };

  _proto.open = function open(props) {
    this._props = props;
    this.setState({
      visible: true
    });
    (0, _helpers.preventWindowScroll)(true);
    document.addEventListener('keyup', this.handleKeyUp);
  };

  _proto.close = function close() {
    var _this$getMergedProps = this.getMergedProps(),
        onClose = _this$getMergedProps.onClose;

    this.setState({
      visible: false
    });
    (0, _helpers.preventWindowScroll)(false);
    document.removeEventListener('keyup', this.handleKeyUp);
    onClose && onClose();
  };

  _proto.update = function update(props) {
    var visible = this.state.visible;

    if (visible) {
      this._props = props;
      this.forceUpdate();
    }
  };

  _proto.getMergedProps = function getMergedProps() {
    return _objectSpread(_objectSpread({}, this.props), this._props);
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
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__close",
      onClick: this.close.bind(this)
    });
  };

  _proto.render = function render() {
    var _this$getMergedProps2 = this.getMergedProps(),
        className = _this$getMergedProps2.className,
        size = _this$getMergedProps2.size,
        title = _this$getMergedProps2.title,
        closeButton = _this$getMergedProps2.closeButton,
        loading = _this$getMergedProps2.loading;

    var visible = this.state.visible;
    var classNames = (0, _classnames2["default"])((0, _defineProperty2["default"])({
      'Modal': true
    }, "Modal_size_".concat(size), true), className);
    return visible ? /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this), {
      onMouseDown: this.handleMouseDown.bind(this),
      onTouchStart: this.handleMouseDown.bind(this)
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__overlay"
    }), loading ? /*#__PURE__*/_react["default"].createElement(_Progress.Progress, {
      className: "Modal__progress",
      color: "current"
    }) : /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__container"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__window",
      ref: "window"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__header"
    }, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "Modal__title"
    }, title), closeButton === 'inside' && this.renderClose()), /*#__PURE__*/_react["default"].createElement("div", {
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