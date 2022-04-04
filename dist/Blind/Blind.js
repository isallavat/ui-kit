"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blind = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Progress = require("../Progress");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var Blind = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Blind, _React$Component);

  function Blind(props) {
    var _context;

    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {};
    _this.handleKeyUp = (_context = _this).handleKeyUp.bind(_context);
    return _this;
  }

  var _proto = Blind.prototype;

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

  _proto.renderContent = function renderContent() {
    return this.getMergedProps().children;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$getMergedProps2 = this.getMergedProps(),
        className = _this$getMergedProps2.className,
        loading = _this$getMergedProps2.loading;

    var visible = this.state.visible;
    var classNames = (0, _classnames["default"])({
      'Blind': true
    }, className);
    return visible ? /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Blind__overlay",
      onClick: function onClick() {
        _this2.close();
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Blind__window"
    }, loading ? /*#__PURE__*/_react["default"].createElement(_Progress.Progress, {
      className: "Blind__progress",
      color: "current"
    }) : this.renderContent())) : '';
  };

  return Blind;
}(_react["default"].Component);

exports.Blind = Blind;
Blind.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  onClose: _propTypes["default"].func
};
Blind.defaultProps = {
  component: 'div'
};