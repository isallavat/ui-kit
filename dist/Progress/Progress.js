"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    var _this$props = this.props,
        seconds = _this$props.seconds,
        strokeWidth = _this$props.strokeWidth;
    var root = this.refRoot;
    var diameter = root.offsetWidth - strokeWidth * 2;
    var circleLength = Math.PI * diameter;
    this.setState({
      diameter: diameter,
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
    var _classnames,
        _this3 = this;

    var _this$props2 = this.props,
        className = _this$props2.className,
        color = _this$props2.color,
        variant = _this$props2.variant,
        animated = _this$props2.animated,
        percent = _this$props2.percent,
        strokeWidth = _this$props2.strokeWidth,
        children = _this$props2.children;
    var _this$state = this.state,
        value = _this$state.value,
        diameter = _this$state.diameter,
        circleLength = _this$state.circleLength;
    var classNames = (0, _classnames2["default"])((_classnames = {
      'Progress': true
    }, (0, _defineProperty2["default"])(_classnames, "Progress_color_".concat(color), true), (0, _defineProperty2["default"])(_classnames, "Progress_variant_".concat(variant), true), _classnames), className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this), {
      ref: function ref(_ref) {
        _this3.refRoot = _ref;
      }
    }), variant === 'circle' && !!circleLength && /*#__PURE__*/_react["default"].createElement("svg", {
      className: (0, _classnames2["default"])({
        '--animated': animated
      }),
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/_react["default"].createElement("circle", {
      className: "Progress__circle Progress__circle_1",
      fill: "none",
      strokeWidth: strokeWidth,
      cx: "50%",
      cy: "50%",
      r: diameter / 2
    }), /*#__PURE__*/_react["default"].createElement("circle", {
      className: "Progress__circle Progress__circle_2",
      fill: "none",
      strokeWidth: strokeWidth,
      cx: "50%",
      cy: "50%",
      r: diameter / 2,
      strokeDasharray: "".concat(circleLength / 100 * percent, ",").concat(circleLength)
    })), variant === 'line' && /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Progress__line Progress__line_1",
      style: {
        width: '100%'
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames2["default"])({
        'Progress__line Progress__line_2': true,
        '--animated': animated
      }),
      style: {
        width: percent + '%'
      }
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
  animated: _propTypes["default"].bool,
  strokeWidth: _propTypes["default"].number,
  seconds: _propTypes["default"].number,
  percent: _propTypes["default"].number
};
Progress.defaultProps = {
  component: 'div',
  color: 'default',
  variant: 'circle',
  animated: true,
  strokeWidth: 3,
  percent: 25
};