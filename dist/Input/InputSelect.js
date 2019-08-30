"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputSelect = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Input2 = require("./Input");

var iconArrow = _react["default"].createElement("svg", {
  className: "Input__icon Input__icon_arrow",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, _react["default"].createElement("g", {
  fill: "currentColor",
  transform: "translate(5)"
}, _react["default"].createElement("path", {
  d: "M-5,0H19V24H-5Z",
  fill: "none",
  fillRule: "evenodd"
}), _react["default"].createElement("path", {
  d: "M12.077,9,13,9.933,7,16,1,9.933,1.923,9,7,14.133Z",
  fill: "#0b1f35",
  fillRule: "evenodd"
})));

var InputSelect =
/*#__PURE__*/
function (_Input) {
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
    if (_Input.prototype.handleBlur.call(this, event) !== false) {
      this.setState({
        searchValue: ''
      });
    }
  };

  _proto.handleSearch = function handleSearch(event) {
    var value = event.target.value;
    this.setState({
      searchValue: value,
      menuSeletedItemIndex: value && this.getMenu().length ? 0 : -1,
      dropdownVisible: true
    });
  };

  _proto.handleMenuItemClick = function handleMenuItemClick(item, index, event) {
    _Input.prototype.handleMenuItemClick.call(this, item, index, event);

    this.setState({
      searchValue: ''
    });
  };

  _proto.renderElement = function renderElement(props) {
    var _this$state = this.state,
        _this$state$searchVal = _this$state.searchValue,
        searchValue = _this$state$searchVal === void 0 ? '' : _this$state$searchVal,
        value = _this$state.value;
    var menu = this.getMenu();
    var selectedItem = menu.filter(function (item) {
      return String(item.value) === String(value);
    })[0];
    props.type = 'text';
    props.value = searchValue;
    props.onChange = this.handleSearch.bind(this);
    return _react["default"].createElement(_react.Fragment, null, !searchValue && selectedItem && _react["default"].createElement("div", {
      className: (0, _classnames["default"])(props.className, 'Input__element_fake')
    }, selectedItem.primary), _Input.prototype.renderElement.call(this, props));
  };

  return InputSelect;
}(_Input2.Input);

exports.InputSelect = InputSelect;
InputSelect.propTypes = _Input2.Input.propTypes;
InputSelect.defaultProps = (0, _objectSpread2["default"])({}, _Input2.Input.defaultProps, {
  adornment: iconArrow,
  type: 'select',
  filterMenu: true
});