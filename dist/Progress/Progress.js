"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var Progress = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Progress, _React$Component);

  function Progress(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {};
    return _this;
  }

  var _proto = Progress.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var seconds = this.props.seconds;
    var root = this.refs.root;
    var strokeWidth = 4; // percent

    var diamentr = root.offsetWidth - root.offsetWidth * (strokeWidth * 2 / 100);
    var circleLength = Math.PI * diamentr;
    this.setState({
      circleLength: circleLength
    });
    seconds && this.countdownSeconds();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  };

  _proto.countdownSeconds = function countdownSeconds(seconds) {
    var _this2 = this;

    seconds = seconds || this.props.seconds;
    var date = new Date(null);
    date.setSeconds(seconds);
    var value = (0, _helpers.formatDate)(date, 'mm:ss');
    this.setState({
      value: value
    }, function () {
      _this2.timeout = setTimeout(_this2.countdownSeconds.bind(_this2, seconds - 1), 1000);
    });
  };

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        className = _this$props.className,
        color = _this$props.color,
        variant = _this$props.variant,
        percent = _this$props.percent,
        children = _this$props.children;
    var _this$state = this.state,
        value = _this$state.value,
        circleLength = _this$state.circleLength;
    var classNames = (0, _classnames2["default"])((_classnames = {
      'Progress': true
    }, (0, _defineProperty2["default"])(_classnames, "Progress_color_".concat(color), true), (0, _defineProperty2["default"])(_classnames, "Progress_variant_".concat(variant), true), _classnames), className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this), {
      ref: "root"
    }), variant === 'circle' ? !!circleLength && /*#__PURE__*/_react["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/_react["default"].createElement("circle", {
      className: "Progress__circle Progress__circle_1",
      fill: "none",
      strokeWidth: "4%",
      cx: "50%",
      cy: "50%",
      r: "46%"
    }), /*#__PURE__*/_react["default"].createElement("circle", {
      className: "Progress__circle Progress__circle_2",
      fill: "none",
      strokeWidth: "4%",
      cx: "50%",
      cy: "50%",
      r: "46%",
      strokeDasharray: "".concat(circleLength / 100 * percent, ",").concat(circleLength)
    })) : /*#__PURE__*/_react["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/_react["default"].createElement("rect", {
      className: "Progress__line Progress__line_1",
      x: "0",
      y: "0",
      width: "100%",
      height: "100%"
    }), /*#__PURE__*/_react["default"].createElement("rect", {
      className: "Progress__line Progress__line_2",
      x: "0",
      y: "0",
      width: percent + '%',
      height: "100%"
    })), !!value && /*#__PURE__*/_react["default"].createElement("div", {
      className: "Progress__value"
    }, value), children);
  };

  return Progress;
}(_react["default"].Component);

exports.Progress = Progress;
Progress.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  color: _propTypes["default"].string.isRequired,
  variant: _propTypes["default"].oneOf(['circle', 'line']).isRequired,
  seconds: _propTypes["default"].number,
  percent: _propTypes["default"].number
};
Progress.defaultProps = {
  component: 'div',
  color: 'default',
  variant: 'circle',
  percent: 25
};