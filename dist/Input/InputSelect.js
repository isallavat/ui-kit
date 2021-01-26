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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  adornment: iconArrow,
  type: 'select',
  filterMenu: true
});