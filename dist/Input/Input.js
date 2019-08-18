"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactInputMask = _interopRequireDefault(require("react-input-mask"));

var _reactRangeslider = _interopRequireDefault(require("react-rangeslider"));

var _helpers = require("../helpers");

var Input =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Input, _React$Component);

  function Input(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      value: _this.noramlizeValue(props.value) || _this.noramlizeValue(props.defaultValue)
    };
    return _this;
  }

  var _proto = Input.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var value = this.props.value;

    if (value !== prevProps.value && this.noramlizeValue(value) !== this.state.value) {
      this.setState({
        value: this.noramlizeValue(value)
      });
    }
  };

  _proto.noramlizeValue = function noramlizeValue(value) {
    return ['string', 'number'].indexOf((0, _typeof2["default"])(value)) >= 0 ? String(value) : '';
  };

  _proto.getMenu = function getMenu() {
    var _this$props = this.props,
        type = _this$props.type,
        menu = _this$props.menu,
        filterMenu = _this$props.filterMenu;
    var value = this.state.value;
    var _menu = [];

    if (type !== 'select' && !value) {
      return _menu;
    }

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

    _menu.map(function (item) {
      if (item.primary === undefined) {
        item.primary = item.value;
      }

      return item;
    }, []);

    return filterMenu ? this.filterMenu(_menu, value) : _menu;
  };

  _proto.filterMenu = function filterMenu(menu, value) {
    return menu.filter(function (item) {
      return item.primary.match(new RegExp(value, 'i'));
    });
  };

  _proto.getMenuSeletedItemIndex = function getMenuSeletedItemIndex() {
    var value = this.state.value;
    return this.getMenu().reduce(function (accumulator, item, index) {
      if (String(item.value) === String(value)) {
        accumulator = index;
      }

      return accumulator;
    }, -1);
  };

  _proto.scrollMenuToSelected = function scrollMenuToSelected(exact) {
    var menuSeletedItemIndex = this.state.menuSeletedItemIndex;
    var menuEl = (0, _reactDom.findDOMNode)(this.refs.menu);

    if (!menuEl) {
      return;
    }

    var selectedItemEl = menuEl.childNodes[menuSeletedItemIndex];

    if (menuSeletedItemIndex >= 0 && selectedItemEl) {
      if (exact) {
        menuEl.scrollTop = selectedItemEl.offsetTop;
      } else if (selectedItemEl.offsetTop < menuEl.scrollTop) {
        menuEl.scrollTop = selectedItemEl.offsetTop;
      } else if (selectedItemEl.offsetTop + selectedItemEl.offsetHeight > menuEl.offsetHeight + menuEl.scrollTop) {
        menuEl.scrollTop = selectedItemEl.offsetTop + selectedItemEl.offsetHeight - menuEl.offsetHeight;
      }
    } else {
      menuEl.scrollTop = 0;
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

  _proto.handleFocus = function handleFocus(event) {
    var _this3 = this;

    var onFocus = this.props.onFocus;
    this.setState({
      focused: true,
      dropdownVisible: true,
      menuSeletedItemIndex: this.getMenuSeletedItemIndex()
    }, function () {
      _this3.getMenu().length && _this3.scrollMenuToSelected();
    });
    onFocus && onFocus(event);
  };

  _proto.handleBlur = function handleBlur(event) {
    var onBlur = this.props.onBlur;

    if (this.mouseEnter) {
      this.inputEl.focus();
      return;
    }

    this.setState({
      focused: false,
      dropdownVisible: false
    });
    onBlur && onBlur(event);
  };

  _proto.handleChange = function handleChange(event) {
    var onChange = this.props.onChange;
    var state = {
      value: event.target.value,
      dropdownVisible: true
    };

    if (event.type === 'change') {
      state.menuSeletedItemIndex = -1;
    }

    this.setState(state);
    onChange && onChange(event);
  };

  _proto.handleSliderChange = function handleSliderChange(value) {
    var event = {
      type: 'change',
      target: this.inputEl
    };
    event.target.value = value;
    this.handleChange(event);
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    var _this$state = this.state,
        menuSeletedItemIndex = _this$state.menuSeletedItemIndex,
        dropdownVisible = _this$state.dropdownVisible;
    var menu = this.getMenu();
    var state = {};

    if (!menu.length) {
      return;
    } else if ([38, 40].indexOf(event.keyCode) >= 0 && !dropdownVisible) {
      state.dropdownVisible = true;
    } else if (event.keyCode === 38) {
      state.menuSeletedItemIndex = menuSeletedItemIndex > 0 ? menuSeletedItemIndex - 1 : menu.length - 1;
    } else if (event.keyCode === 40) {
      state.menuSeletedItemIndex = menuSeletedItemIndex < menu.length - 1 ? menuSeletedItemIndex + 1 : 0;
    } else if (event.keyCode === 13) {
      event.preventDefault();
      var selectedMenuItem = menu[menuSeletedItemIndex];
      selectedMenuItem && this.handleMenuItemClick(selectedMenuItem, menuSeletedItemIndex, event);
    }

    this.setState(state, this.scrollMenuToSelected);
  };

  _proto.handleMenuItemClick = function handleMenuItemClick(item, index, event) {
    var _this4 = this;

    event.target = this.inputEl;
    event.target.value = item.value;
    event.target.index = index;
    this.handleChange(event);
    setTimeout(function () {
      _this4.mouseEnter = false;

      _this4.setState({
        dropdownVisible: false
      });
    });
  };

  _proto.renderElement = function renderElement(props) {
    var _this5 = this;

    if (this.getMenu().length) {
      props.autoComplete = 'off';
    }

    if (props.type === 'plain') {
      return _react["default"].createElement("div", {
        className: props.className
      }, props.value);
    }

    return _react["default"].createElement(_reactInputMask["default"], (0, _extends2["default"])({}, props, {
      inputRef: function inputRef(node) {
        _this5.inputEl = node;
      }
    }));
  };

  _proto.renderDropdown = function renderDropdown(children) {
    var dropdownVisible = this.state.dropdownVisible;
    return _react["default"].createElement("div", {
      ref: "dropdown",
      className: (0, _classnames3["default"])({
        'Input__dropdown': true,
        '--visible': dropdownVisible
      })
    }, children);
  };

  _proto.renderMenu = function renderMenu() {
    var _this6 = this;

    var menuSeletedItemIndex = this.state.menuSeletedItemIndex;
    var menu = this.getMenu();
    return this.renderDropdown(_react["default"].createElement("div", {
      className: "Input__menu",
      ref: "menu"
    }, menu.map(function (item, index) {
      return _react["default"].createElement("div", {
        className: (0, _classnames3["default"])({
          'Input__menu-item': true,
          '--selected': index === menuSeletedItemIndex
        }),
        key: index,
        onMouseMove: function onMouseMove() {
          return _this6.setState({
            menuSeletedItemIndex: index
          });
        },
        onMouseDown: _this6.handleMenuItemClick.bind(_this6, item, index)
      }, _react["default"].createElement("div", {
        className: "Input__menu-item-primary"
      }, item.primary), !!item.secondary && _react["default"].createElement("div", {
        className: "Input__menu-item-secondary"
      }, item.secondary));
    })));
  };

  _proto.renderSlider = function renderSlider() {
    var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        step = _this$props2.step,
        rangeProps = _this$props2.rangeProps;
    var value = this.state.value;
    return _react["default"].createElement(_reactRangeslider["default"], (0, _extends2["default"])({
      min: min,
      max: max,
      step: step,
      value: Number(value),
      tooltip: false,
      labels: {
        0: min,
        100: max
      }
    }, rangeProps, {
      onChange: this.handleSliderChange.bind(this)
    }));
  };

  _proto.render = function render() {
    var _classnames,
        _this7 = this;

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
        maskChar = _this$props3.maskChar,
        adornment = _this$props3.adornment,
        adornmentPosition = _this$props3.adornmentPosition;
    var _this$state2 = this.state,
        value = _this$state2.value,
        focused = _this$state2.focused;
    var inputProps = (0, _objectSpread2["default"])({}, (0, _helpers.excludeProps)(this), {
      className: 'Input__element',
      disabled: disabled,
      type: type,
      value: value,
      mask: mask,
      maskChar: maskChar,
      onClick: this.handleFocus.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      onChange: this.handleChange.bind(this),
      onKeyDown: this.handleKeyDown.bind(this)
    });

    if (['number', 'range'].indexOf(type) >= 0) {
      inputProps.type = 'text';
      inputProps.inputMode = 'numeric';

      if (!inputProps.mask) {
        inputProps.mask = (value || '').replace(/\w/g, '9') + '9';
        inputProps.maskChar = null;
      }
    }

    var classNames = (0, _classnames3["default"])((_classnames = {
      'Input': true
    }, (0, _defineProperty2["default"])(_classnames, "Input_size_".concat(size), true), (0, _defineProperty2["default"])(_classnames, "Input_color_".concat(color), true), (0, _defineProperty2["default"])(_classnames, "Input_variant_".concat(variant), true), (0, _defineProperty2["default"])(_classnames, "Input_type_".concat(type), true), (0, _defineProperty2["default"])(_classnames, 'Input_rounded', rounded), (0, _defineProperty2["default"])(_classnames, 'Input_labeled', !!label), (0, _defineProperty2["default"])(_classnames, '--focused', focused), (0, _defineProperty2["default"])(_classnames, '--filled', !!value), (0, _defineProperty2["default"])(_classnames, '--invalid', invalid), (0, _defineProperty2["default"])(_classnames, '--disabled', disabled), _classnames), className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, componentProps, {
      onMouseEnter: function onMouseEnter() {
        _this7.mouseEnter = true;
      },
      onMouseLeave: function onMouseLeave() {
        _this7.mouseEnter = false;
      },
      onClick: function onClick() {
        _this7.inputEl && _this7.inputEl.focus();
      }
    }), _react["default"].createElement("div", {
      className: "Input__container"
    }, label && _react["default"].createElement("div", {
      className: "Input__label"
    }, label), this.renderElement(inputProps)), adornment && _react["default"].createElement("div", {
      className: (0, _classnames3["default"])((0, _defineProperty2["default"])({
        'Input__adornment': true
      }, "Input__adornment_".concat(adornmentPosition), true))
    }, adornment), !!this.getMenu().length && this.renderMenu(), type === 'range' && this.renderSlider());
  };

  return Input;
}(_react["default"].Component);

exports.Input = Input;
Input.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  componentProps: _propTypes["default"].object,
  size: _propTypes["default"].string.isRequired,
  color: _propTypes["default"].string.isRequired,
  variant: _propTypes["default"].string.isRequired,
  rounded: _propTypes["default"].bool,
  type: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].any,
  mask: _propTypes["default"].string,
  maskChar: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  invalid: _propTypes["default"].bool,
  defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].number.isRequired]),
  value: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].number.isRequired]),
  adornment: _propTypes["default"].any,
  adornmentPosition: _propTypes["default"].oneOf(['start', 'end']),
  menu: _propTypes["default"].oneOfType([_propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  filterMenu: _propTypes["default"].bool,
  step: _propTypes["default"].number,
  rangeProps: _propTypes["default"].object
};
Input.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'text',
  adornmentPosition: 'end'
};