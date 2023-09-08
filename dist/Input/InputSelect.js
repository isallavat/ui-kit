"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSelect = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _Input2 = require("./Input");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var iconArrow = /*#__PURE__*/_react["default"].createElement("svg", {
  className: "Input__icon Input__icon_arrow",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/_react["default"].createElement("g", {
  fill: "currentColor",
  transform: "translate(5)"
}, /*#__PURE__*/_react["default"].createElement("path", {
  d: "M-5,0H19V24H-5Z",
  fill: "none",
  fillRule: "evenodd"
}), /*#__PURE__*/_react["default"].createElement("path", {
  d: "M12.077,9,13,9.933,7,16,1,9.933,1.923,9,7,14.133Z",
  fill: "currentColor",
  fillRule: "evenodd"
})));
var InputSelect = /*#__PURE__*/function (_Input) {
  (0, _inheritsLoose2["default"])(InputSelect, _Input);
  function InputSelect() {
    return _Input.apply(this, arguments) || this;
  }
  var _proto = InputSelect.prototype;
  _proto.filterMenu = function filterMenu(menu) {
    var searchValue = this.state.searchValue;
    return _Input.prototype.filterMenu.call(this, menu, searchValue);
  };
  _proto.handleBlur = function handleBlur(event) {
    var searchValue = this.state.searchValue;
    if (searchValue === '') {
      var _event = {
        type: 'change',
        target: this.inputEl
      };
      _event.target.value = searchValue;
      this.handleChange(_event);
    }
    _Input.prototype.handleBlur.call(this, event);
    this.setState({
      searchValue: undefined
    });
  };
  _proto.handleSearch = function handleSearch(event) {
    var value = event.target.value;
    this.setState({
      searchValue: value,
      menuSelectedItemIndex: value && this.getMenu().length ? 0 : -1,
      dropdownVisible: true
    });
  };
  _proto.handleMenuItemClick = function handleMenuItemClick(item, index, event) {
    _Input.prototype.handleMenuItemClick.call(this, item, index, event);
    this.setState({
      searchValue: undefined
    });
  };
  _proto.renderElement = function renderElement(props) {
    var filterMenu = this.props.filterMenu;
    var _this$state = this.state,
      searchValue = _this$state.searchValue,
      value = _this$state.value;
    var menu = this.getMenu();
    var selectedItem = menu.filter(function (item) {
      return String(item.value) === String(value);
    })[0];
    if (searchValue !== undefined) {
      props.value = searchValue;
    } else if (selectedItem) {
      props.value = selectedItem.primary;
      props['data-value'] = selectedItem.value;
    }
    props.readOnly = props.readOnly || !filterMenu;
    props.type = 'text';
    props.onChange = this.handleSearch.bind(this);
    return _Input.prototype.renderElement.call(this, props);
  };
  return InputSelect;
}(_Input2.Input);
exports.InputSelect = InputSelect;
InputSelect.propTypes = _Input2.Input.propTypes;
InputSelect.defaultProps = _objectSpread(_objectSpread({}, _Input2.Input.defaultProps), {}, {
  suffix: iconArrow,
  type: 'select',
  filterMenu: true
});