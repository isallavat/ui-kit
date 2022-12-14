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

var _classnames4 = _interopRequireDefault(require("classnames"));

var _Progress = require("../Progress");

var _Button = require("../Button");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
      this._props = _objectSpread(_objectSpread({}, this._props), props);
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

  _proto.renderContent = function renderContent() {
    return this.getMergedProps().children;
  };

  _proto.renderOkButton = function renderOkButton() {
    return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      className: "Modal__ok",
      size: "s",
      rounded: true,
      children: "OK",
      onClick: this.close.bind(this)
    });
  };

  _proto.renderClose = function renderClose() {
    var closeButtonPosition = this.props.closeButtonPosition;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames4["default"])((0, _defineProperty2["default"])({
        'Modal__close': true
      }, "Modal__close_".concat(closeButtonPosition), true)),
      onClick: this.close.bind(this)
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$getMergedProps2 = this.getMergedProps(),
        className = _this$getMergedProps2.className,
        size = _this$getMergedProps2.size,
        image = _this$getMergedProps2.image,
        title = _this$getMergedProps2.title,
        type = _this$getMergedProps2.type,
        okButton = _this$getMergedProps2.okButton,
        closeButtonPosition = _this$getMergedProps2.closeButtonPosition,
        canClose = _this$getMergedProps2.canClose,
        loading = _this$getMergedProps2.loading;

    var visible = this.state.visible;

    var _size = type === 'alert' ? 's' : size;

    var _okButton = okButton || type === 'alert' && this.renderOkButton();

    var classNames = (0, _classnames4["default"])((0, _defineProperty2["default"])({
      'Modal': true
    }, "Modal_".concat(type), true), className);
    return visible ? /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__container"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__overlay",
      onClick: function onClick() {
        canClose && _this2.close();
      }
    }), loading ? /*#__PURE__*/_react["default"].createElement(_Progress.Progress, {
      className: "Modal__progress",
      color: "current"
    }) : /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames4["default"])((0, _defineProperty2["default"])({
        'Modal__window': true
      }, "Modal__window_size_".concat(_size), true)),
      ref: function ref(_ref) {
        _this2.refWindow = _ref;
      }
    }, image && /*#__PURE__*/_react["default"].createElement("img", {
      className: "Modal__image",
      src: image,
      alt: ""
    }), !!title && /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__title"
    }, title), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__content"
    }, this.renderContent()), _okButton && /*#__PURE__*/_react["default"].createElement("div", {
      className: "Modal__footer"
    }, _okButton), closeButtonPosition === 'inside' && canClose && this.renderClose()), closeButtonPosition === 'outside' && canClose && this.renderClose())) : '';
  };

  return Modal;
}(_react["default"].Component);

exports.Modal = Modal;
Modal.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  size: _propTypes["default"].string.isRequired,
  image: _propTypes["default"].string,
  title: _propTypes["default"].any,
  okButton: _propTypes["default"].object,
  type: _propTypes["default"].oneOf(['default', 'alert', 'blind']).isRequired,
  closeButtonPosition: _propTypes["default"].oneOf(['inside', 'outside', false]),
  canClose: _propTypes["default"].bool.isRequired,
  onClose: _propTypes["default"].func
};
Modal.defaultProps = {
  component: 'div',
  type: 'default',
  size: 'm',
  closeButtonPosition: 'inside',
  canClose: true
};