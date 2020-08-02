"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var Card = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Card, _React$Component);

  function Card(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = Card.prototype;

  _proto.toggle = function toggle(collapsed) {
    this.setState({
      collapsed: collapsed
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        title = _this$props.title;
    var collapsed = this.state.collapsed;
    var classNames = (0, _classnames["default"])({
      'Card': true
    }, className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), !!title && /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])({
        'Card__header': true,
        '--collapsed': collapsed
      })
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Card__title"
    }, title), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])({
        'Card__switcher': true,
        '--collapsed': collapsed
      }),
      onClick: this.toggle.bind(this, !collapsed)
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "Card__switcher-icon",
      width: "64px",
      height: "64px",
      viewBox: "0 0 64 64",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/_react["default"].createElement("title", null, "acute-angle"), /*#__PURE__*/_react["default"].createElement("desc", null, "Created with Sketch."), /*#__PURE__*/_react["default"].createElement("g", {
      id: "acute-angle",
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/_react["default"].createElement("g", {
      id: "Arrow-2",
      transform: "translate(12.000000, 0.000000)",
      fill: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      d: "M1.76667803,28.8463909 C0.945602951,29.6360244 0.481590525,30.7260393 0.481590525,31.8651992 C0.481590525,33.0043592 0.945602951,34.0943741 1.76667803,34.8840076 L32.3132587,62.2522049 C34.0988202,63.7894038 36.7401905,63.7894038 38.525752,62.2522049 C39.341081,61.5586057 39.8109015,60.5421057 39.8109015,59.471666 C39.8109015,58.4012263 39.341081,57.3847264 38.525752,56.6911271 L10.9039835,31.9635674 L38.5170082,7.19666034 C39.3323371,6.5030611 39.8021577,5.48656115 39.8021577,4.41612144 C39.8021577,3.34568174 39.3323371,2.32918178 38.5170082,1.63558254 C36.7314466,0.0983837132 34.0900764,0.0983837132 32.3045148,1.63558254 L1.76667803,28.8463909 Z",
      id: "Arrow"
    })))))), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])({
        'Card__content': true,
        '--hidden': collapsed
      })
    }, this.props.children));
  };

  return Card;
}(_react["default"].Component);

exports.Card = Card;
Card.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  title: _propTypes["default"].string
};
Card.defaultProps = {
  component: 'div'
};