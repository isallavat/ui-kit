"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactInputMask = _interopRequireDefault(require("react-input-mask"));

var _Menu = require("../Menu");

var _Calendar = require("../Calendar");

var _helpers = require("../helpers");

var Input =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Input, _React$Component);

  function Input(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      value: props.value
    };
    return _this;
  } // static getDerivedStateFromProps (nextProps, prevState) {
  //   if ([prevState.value, prevState.propsValue].indexOf(nextProps.value) < 0) {
  //     return {
  //       value: nextProps.value,
  //       propsValue: nextProps.value
  //     }
  //   }
  //
  //   return null
  // }


  var _proto = Input.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var value = this.props.value;

    if (value !== prevProps.value && value !== this.state.value) {
      this.setState({
        value: value
      });
    }
  };

  _proto.prepareMenu = function prepareMenu() {
    var menu = this.props.menu;
    var _menu = [];

    if (menu instanceof Array) {
      _menu = menu;
    } else if (menu instanceof Object) {
      _menu = Object.keys(menu || {}).map(function (key) {
        return {
          value: key,
          primary: menu[key]
        };
      });
    }

    return _menu.map(function (item) {
      if (item.primary === undefined) {
        item.primary = item.value;
      }

      return item;
    });
  };

  _proto.scrollMenu = function scrollMenu(exact) {
    var selectedMenuItemIndex = this.state.selectedMenuItemIndex;
    var menuEl = this.refs.menu;

    if (menuEl) {
      menuEl.scrollToSelected(selectedMenuItemIndex);
    }
  };

  _proto.setDropdownPosition = function setDropdownPosition() {
    var _this2 = this;

    setTimeout(function () {
      var type = _this2.props.type;
      var dropdown = _this2.refs.dropdown;

      if (!dropdown) {
        return;
      }

      var dropdownBottom = dropdown.getBoundingClientRect().bottom;

      if (type === 'select') {
        if (dropdownBottom > window.innerHeight) {
          dropdown.style.top = -(dropdownBottom - window.innerHeight) + 'px';
        } else {
          dropdown.style.top = '0px';
        }
      }
    });
  };

  _proto.formatDate = function formatDate(date, format) {
    if (date instanceof Date) {
      return format.replace('YYYY', date.getFullYear()).replace('MM', ('0' + (date.getMonth() + 1)).slice(-2)).replace('DD', ('0' + date.getDate()).slice(-2));
    } else if (date) {
      var year = date.substr(format.indexOf('YYYY'), 4) * 1;
      var month = date.substr(format.indexOf('MM'), 2) * 1 - 1;
      var day = date.substr(format.indexOf('DD'), 2) * 1;
      return new Date(year, month, day);
    }
  };

  _proto.valueToDate = function valueToDate(value) {
    var arr = value.split('-');
    var year = arr[0] * 1;
    var month = arr[1] * 1 - 1;
    var day = arr[2] * 1;

    if (year && month && day) {
      return new Date(year, month, day);
    }
  };

  _proto.handleFocus = function handleFocus(event) {
    var onFocus = this.props.onFocus;
    this.setState({
      focus: true,
      menuVisible: true
    });
    onFocus && onFocus(event);
  };

  _proto.handleBlur = function handleBlur(event) {
    var onBlur = this.props.onBlur;

    if (this.dropdownMouseDown) {
      this.dropdownMouseDown = false;
      this.inputEl.focus();
      return;
    }

    this.setState({
      focus: false,
      menuVisible: false
    });
    onBlur && onBlur(event);
  };

  _proto.handleChange = function handleChange(event) {
    var onChange = this.props.onChange;
    this.setState({
      value: event.target.value,
      menuVisible: true
    });
    onChange && onChange(event);
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    var selectedMenuItemIndex = this.state.selectedMenuItemIndex;
    var menu = this.prepareMenu();
    var state = {};

    if (!menu.length) {
      return;
    } else if (event.keyCode === 38) {
      state.selectedMenuItemIndex = selectedMenuItemIndex > 0 ? selectedMenuItemIndex - 1 : menu.length - 1;
    } else if (event.keyCode === 40) {
      state.selectedMenuItemIndex = selectedMenuItemIndex < menu.length - 1 ? selectedMenuItemIndex + 1 : 0;
    } else if (event.keyCode === 13) {
      event.preventDefault();
      var selectedMenuItem = menu[selectedMenuItemIndex];
      state.selectedMenuItemIndex = undefined;
      state.menuVisible = false;
      selectedMenuItem && this.handleMenuItemClick(selectedMenuItem.value, event);
    } else if ([37, 39].indexOf(event.keyCode) === -1) {
      state.selectedMenuItemIndex = undefined;
    }

    this.setState(state, this.scrollMenu);
  };

  _proto.handleMenuItemClick = function handleMenuItemClick(value, event) {
    var _this3 = this;

    event.target = this.inputEl;
    event.target.value = value;
    this.handleChange(event);

    if (this.refs.dropdown && event.type === 'click') {
      setTimeout(function () {
        _this3.inputEl.blur();
      });
    }
  };

  _proto.handleCalendarChange = function handleCalendarChange(value) {
    var _this4 = this;

    var date = new Date(value);
    var event = {
      target: this.inputElHidden
    };
    event.target.value = this.formatDate(date, 'YYYY-MM-DD');
    this.handleChange(event);

    if (this.refs.dropdown) {
      setTimeout(function () {
        _this4.inputEl.blur();
      });
    }
  };

  _proto.handleDateChange = function handleDateChange(event) {
    var _this$props = this.props,
        dateFormat = _this$props.dateFormat,
        onChange = _this$props.onChange;
    var value = event.target.value;
    var year = value.substr(dateFormat.indexOf('YYYY'), 4) * 1;
    var month = value.substr(dateFormat.indexOf('MM'), 2) * 1 - 1;
    var day = value.substr(dateFormat.indexOf('DD'), 2) * 1;
    event.target = this.inputElHidden;

    if (year && month && day) {
      var date = new Date(year, month, day);
      event.target.value = this.formatDate(date, 'YYYY-MM-DD');
      this.handleChange(event);
    } else {
      this.setState({
        value: value
      });
      event.target.value = '';
      onChange && onChange(event);
    }
  };

  _proto.handleDropdownMouseDown = function handleDropdownMouseDown() {
    this.dropdownMouseDown = true;
  };

  _proto.renderElement = function renderElement(props) {
    var _this5 = this;

    return _react["default"].createElement(_reactInputMask["default"], (0, _extends2["default"])({}, props, {
      inputRef: function inputRef(node) {
        _this5.inputEl = node;
      }
    }));
  };

  _proto.renderElementDate = function renderElementDate(props) {
    var _this6 = this;

    var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        dateFormat = _this$props2.dateFormat;
    var _this$state = this.state,
        value = _this$state.value,
        focus = _this$state.focus;
    var date = this.valueToDate(value);
    props.type = 'text';
    props.value = date ? this.formatDate(date, dateFormat) : value;
    props.mask = dateFormat.replace('DD', 99).replace('MM', 99).replace('YYYY', 9999);
    props.onChange = this.handleDateChange.bind(this);
    return _react["default"].createElement(_react.Fragment, null, this.renderElement(props), _react["default"].createElement("input", {
      type: "hidden",
      value: date ? value : '',
      name: props.name,
      ref: function ref(node) {
        _this6.inputElHidden = node;
      }
    }), focus && this.renderDropdown(_react["default"].createElement(_Calendar.Calendar, {
      value: date ? date.getTime() : 0,
      min: min,
      max: max,
      onChange: this.handleCalendarChange.bind(this)
    })));
  };

  _proto.renderDropdown = function renderDropdown(children) {
    return _react["default"].createElement("div", {
      ref: "dropdown",
      className: "Input__dropdown",
      onMouseDown: this.handleDropdownMouseDown.bind(this)
    }, children);
  };

  _proto.renderMenu = function renderMenu() {
    var _this7 = this;

    var _this$state2 = this.state,
        value = _this$state2.value,
        selectedMenuItemIndex = _this$state2.selectedMenuItemIndex;
    var menu = this.prepareMenu();
    return !!menu.length && this.renderDropdown(_react["default"].createElement(_Menu.Menu, {
      className: "Input__menu",
      ref: "menu"
    }, menu.map(function (item, index) {
      return _react["default"].createElement(_Menu.MenuItem, {
        className: "Input__menu-item",
        key: index,
        primary: item.primary,
        secondary: item.secondary,
        hover: index === selectedMenuItemIndex,
        selected: item.value === value,
        onClick: _this7.handleMenuItemClick.bind(_this7, item.value)
      });
    })));
  };

  _proto.render = function render() {
    var _classnames;

    var _this$props3 = this.props,
        className = _this$props3.className,
        componentProps = _this$props3.componentProps,
        size = _this$props3.size,
        color = _this$props3.color,
        variant = _this$props3.variant,
        rounded = _this$props3.rounded,
        invalid = _this$props3.invalid,
        disabled = _this$props3.disabled,
        type = _this$props3.type,
        label = _this$props3.label,
        mask = _this$props3.mask,
        adornment = _this$props3.adornment,
        adornmentPosition = _this$props3.adornmentPosition;
    var _this$state3 = this.state,
        value = _this$state3.value,
        focus = _this$state3.focus,
        menuVisible = _this$state3.menuVisible;
    var inputProps = (0, _objectSpread2["default"])({}, (0, _helpers.excludeProps)(this), {
      className: 'Input__element Input__element_native',
      type: type,
      value: value,
      disabled: disabled,
      mask: mask,
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      onChange: this.handleChange.bind(this),
      onKeyDown: this.handleKeyDown.bind(this)
    });

    if (type === 'number' && inputProps.mask) {
      inputProps.type = 'text';
      inputProps.inputMode = 'numeric';
    } else if (type === 'select') {
      inputProps.readOnly = true;
    }

    var element;

    switch (type) {
      case 'date':
        element = this.renderElementDate(inputProps);
        break;

      default:
        element = this.renderElement(inputProps);
    }

    var classNames = (0, _classnames3["default"])((_classnames = {
      'Input': true
    }, (0, _defineProperty2["default"])(_classnames, "Input_size_".concat(size), !!size), (0, _defineProperty2["default"])(_classnames, "Input_color_".concat(color), !!color), (0, _defineProperty2["default"])(_classnames, "Input_variant_".concat(variant), !!variant), (0, _defineProperty2["default"])(_classnames, "Input_type_".concat(type), !!type), (0, _defineProperty2["default"])(_classnames, 'Input_rounded', rounded), (0, _defineProperty2["default"])(_classnames, 'Input_labeled', !!label), (0, _defineProperty2["default"])(_classnames, '-filled', !!value), (0, _defineProperty2["default"])(_classnames, '-focus', focus), (0, _defineProperty2["default"])(_classnames, '-invalid', invalid), (0, _defineProperty2["default"])(_classnames, '-disabled', disabled), _classnames), className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, componentProps), label && _react["default"].createElement("div", {
      className: "Input__label"
    }, label), element, adornment && _react["default"].createElement("div", {
      className: (0, _classnames3["default"])((0, _defineProperty2["default"])({
        'Input__adornment': true
      }, "Input__adornment_".concat(adornmentPosition), true))
    }, adornment), menuVisible && this.renderMenu());
  };

  return Input;
}(_react["default"].Component);

exports.Input = Input;
Input.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  componentProps: _propTypes["default"].object,
  size: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  color: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  variant: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].bool.isRequired]).isRequired,
  rounded: _propTypes["default"].bool,
  type: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string,
  mask: _propTypes["default"].string,
  dateFormat: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  invalid: _propTypes["default"].bool,
  value: _propTypes["default"].any.isRequired,
  adornment: _propTypes["default"].any,
  adornmentPosition: _propTypes["default"].oneOf(['start', 'end']),
  menu: _propTypes["default"].oneOfType([_propTypes["default"].object.isRequired, _propTypes["default"].arrayOf(_propTypes["default"].shape({
    value: _propTypes["default"].string.isRequired,
    primary: _propTypes["default"].any,
    secondary: _propTypes["default"].any
  }).isRequired).isRequired])
};
Input.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'text',
  value: '',
  dateFormat: 'DD.MM.YYYY',
  adornmentPosition: 'end'
};