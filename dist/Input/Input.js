"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactInputMask = _interopRequireDefault(require("react-input-mask"));

var _reactRange = require("react-range");

var _Progress = require("../Progress");

var _ScrollArea = require("../ScrollArea");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var Input = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Input, _React$Component);

  function Input(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      value: _this.normalizeValue(props.value)
    };

    if (!_this.state.value && props.defaultValue !== undefined) {
      _this.state.value = _this.normalizeValue(props.defaultValue);
    }

    return _this;
  }

  var _proto = Input.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState, snapshot) {
    var value = this.props.value;
    var dropdownVisible = this.state.dropdownVisible;

    if (value !== prevProps.value && this.normalizeValue(value) !== this.state.value) {
      this.setState({
        value: this.normalizeValue(value)
      });
    }

    if (dropdownVisible && !prevState.dropdownVisible) {
      this.setDropdownPosition();
    }
  };

  _proto.normalizeValue = function normalizeValue(value) {
    return ['string', 'number'].indexOf((0, _typeof2["default"])(value)) >= 0 ? String(value) : '';
  };

  _proto.isValueValid = function isValueValid(value) {
    var type = this.props.type;

    if (['tel', 'number', 'range'].includes(type)) {
      return /\d+/.test(value);
    } else if (type === 'decimal') {
      return /[\d.]+/.test(value);
    } else {
      return true;
    }
  };

  _proto.escapeString = function escapeString(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  _proto.getMenu = function getMenu() {
    var _this$props = this.props,
        menu = _this$props.menu,
        filterMenu = _this$props.filterMenu;
    var value = this.state.value;
    var _menu = [];

    if (menu instanceof Array) {
      _menu = menu;
    } else if (menu instanceof Object) {
      _menu = Object.keys(menu).map(function (key) {
        return {
          value: key,
          primary: menu[key]
        };
      });
    }

    _menu = _menu.map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        primary: item.primary || item.label || item.value
      });
    }, []);
    return filterMenu ? this.filterMenu(_menu, value) : _menu;
  };

  _proto.findString = function findString(children, value) {
    var arr = [];

    for (var key in children) {
      if (typeof children[key] === 'string') {
        return children[key].match(new RegExp(this.escapeString(value), 'i'));
      } else if (children[key].props.children) {
        arr.push(children[key].props.children);
      }
    }

    if (arr.length) {
      return this.findString(arr, value);
    }
  };

  _proto.filterMenu = function filterMenu(menu, value) {
    var _this2 = this;

    return menu.filter(function (item) {
      if (!value) {
        return true;
      } else if (typeof item.primary !== 'string' && item.primary.props) {
        return _this2.findString(item.primary.props.children, value);
      }

      return item.primary.toString().match(new RegExp(_this2.escapeString(value), 'i'));
    });
  };

  _proto.getMenuSelectedItemIndex = function getMenuSelectedItemIndex() {
    var value = this.state.value;
    return this.getMenu().reduce(function (accumulator, item, index) {
      if (String(item.value) === String(value)) {
        accumulator = index;
      }

      return accumulator;
    }, undefined);
  };

  _proto.shiftMenuSelectedItemIndex = function shiftMenuSelectedItemIndex(menuSelectedItemIndex, shift) {
    var menu = this.getMenu();

    var _menuSelectedItemIndex = menuSelectedItemIndex + shift;

    if (_menuSelectedItemIndex > menu.length - 1) {
      return this.shiftMenuSelectedItemIndex(-shift, shift);
    } else if (_menuSelectedItemIndex < 0) {
      return this.shiftMenuSelectedItemIndex(menu.length - 1 - shift, shift);
    } else if (menu[_menuSelectedItemIndex].disabled) {
      return this.shiftMenuSelectedItemIndex(_menuSelectedItemIndex, shift);
    } else {
      return _menuSelectedItemIndex;
    }
  };

  _proto.scrollMenuToSelected = function scrollMenuToSelected(exact) {
    var menuSelectedItemIndex = this.state.menuSelectedItemIndex;

    if (!this.menuEl) {
      return;
    }

    var selectedItemEl = this.menuEl.childNodes[menuSelectedItemIndex];

    if (menuSelectedItemIndex >= 0 && selectedItemEl) {
      if (exact) {
        this.menuEl.scrollTop = selectedItemEl.offsetTop;
      } else if (selectedItemEl.offsetTop < this.menuEl.scrollTop) {
        this.menuEl.scrollTop = selectedItemEl.offsetTop;
      } else if (selectedItemEl.offsetTop + selectedItemEl.offsetHeight > this.menuEl.offsetHeight + this.menuEl.scrollTop) {
        this.menuEl.scrollTop = selectedItemEl.offsetTop + selectedItemEl.offsetHeight - this.menuEl.offsetHeight;
      }
    } else {
      this.menuEl.scrollTop = 0;
    }
  };

  _proto.setDropdownPosition = function setDropdownPosition() {
    var dropdown = this.refDropdown;

    if (!dropdown) {
      return;
    }

    dropdown.removeAttribute('style');
    var dropdownBottom = dropdown.getBoundingClientRect().bottom;

    if (dropdownBottom > window.innerHeight) {
      dropdown.style.top = 'auto';
      dropdown.style.bottom = '100%';
    }
  };

  _proto.handleClick = function handleClick(event) {
    var _this$props2 = this.props,
        readOnly = _this$props2.readOnly,
        onClick = _this$props2.onClick;

    if (readOnly) {
      return false;
    }

    this.handleFocus(event);
    onClick && onClick(event);
  };

  _proto.handleFocus = function handleFocus(event) {
    var _this3 = this;

    var _this$props3 = this.props,
        readOnly = _this$props3.readOnly,
        onFocus = _this$props3.onFocus;
    var menuSelectedItemIndex = this.getMenuSelectedItemIndex();

    if (readOnly) {
      return false;
    }

    var state = {
      focused: true,
      dropdownVisible: true,
      menuSelectedItemIndex: menuSelectedItemIndex === undefined ? -1 : menuSelectedItemIndex
    };
    this.setState(state, function () {
      _this3.getMenu().length && _this3.scrollMenuToSelected();
    });
    onFocus && onFocus(event);
  };

  _proto.handleBlur = function handleBlur(event) {
    var _this$props4 = this.props,
        readOnly = _this$props4.readOnly,
        onBlur = _this$props4.onBlur;

    if (readOnly) {
      return false;
    }

    this.setState({
      focused: false,
      dropdownVisible: false
    });
    onBlur && onBlur(event);
  };

  _proto.handleChange = function handleChange(event) {
    var _this$props5 = this.props,
        readOnly = _this$props5.readOnly,
        onChange = _this$props5.onChange;

    if (readOnly) {
      return false;
    }

    this.setState({
      value: event.target.value,
      dropdownVisible: event.type === 'change'
    });
    onChange && onChange(event);
  };

  _proto.handlePaste = function handlePaste(event) {
    var value = (event.clipboardData || window.clipboardData).getData('text');

    if (!this.isValueValid(value)) {
      event.preventDefault();
    }
  };

  _proto.handleRangeChange = function handleRangeChange(value) {
    var _this$props6 = this.props,
        min = _this$props6.min,
        max = _this$props6.max,
        step = _this$props6.step,
        _this$props6$roundBy = _this$props6.roundBy,
        roundBy = _this$props6$roundBy === void 0 ? step : _this$props6$roundBy,
        readOnly = _this$props6.readOnly,
        disabled = _this$props6.disabled;

    if (readOnly || disabled) {
      return false;
    }

    var event = {
      type: 'change',
      target: this.inputEl
    };

    if (value > min && value < max) {
      value -= min % roundBy;
    } else if (value > max) {
      value = max - max % roundBy;
    }

    event.target.value = value;
    this.handleChange(event);
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    var _this$props7 = this.props,
        readOnly = _this$props7.readOnly,
        onKeyDown = _this$props7.onKeyDown;
    var _this$state = this.state,
        menuSelectedItemIndex = _this$state.menuSelectedItemIndex,
        dropdownVisible = _this$state.dropdownVisible;
    var menu = this.getMenu();
    var menuOnlyEnabled = menu.filter(function (item) {
      return !item.disabled;
    });
    var state = {};

    if (event.key !== undefined && event.key.length === 1 && !event.metaKey && !this.isValueValid(event.key)) {
      event.preventDefault();
    }

    if (readOnly) {
      return false;
    } else if ([38, 40].indexOf(event.keyCode) >= 0 && menu.length) {
      state.dropdownVisible = true;
    }

    if (event.keyCode === 38 && menuOnlyEnabled.length) {
      state.menuSelectedItemIndex = this.shiftMenuSelectedItemIndex(menuSelectedItemIndex, -1);
    } else if (event.keyCode === 40 && menuOnlyEnabled.length) {
      state.menuSelectedItemIndex = this.shiftMenuSelectedItemIndex(menuSelectedItemIndex, 1);
    } else if (event.keyCode === 13 && dropdownVisible && menuOnlyEnabled.length) {
      event.preventDefault();
      var selectedMenuItem = menu[menuSelectedItemIndex];
      selectedMenuItem && this.handleMenuItemClick(selectedMenuItem, menuSelectedItemIndex, event);
    }

    if (state.dropdownVisible) {
      this.setState(state, this.scrollMenuToSelected);
    }

    onKeyDown && onKeyDown(event);
  };

  _proto.handleMenuItemClick = function handleMenuItemClick(item, index, event) {
    if (item.disabled || event.button) {
      return;
    }

    event.target = this.inputEl;
    event.target.value = item.value;
    event.target.index = index;
    this.handleChange(event);
  };

  _proto.handleSliderDown = function handleSliderDown() {
    var min = this.props.min;
    var value = this.state.value;

    if (['', null].indexOf(value) >= 0) {
      this.handleRangeChange(min);
    }
  };

  _proto.renderElement = function renderElement(props) {
    var _this4 = this;

    var _this$props8 = this.props,
        format = _this$props8.format,
        readOnly = _this$props8.readOnly,
        maskChar = _this$props8.maskChar;
    var menu = this.getMenu();

    if (menu.length) {
      props.autoComplete = 'off';
    }

    if (props.mask) {
      props.maskChar = maskChar;
      props.formatChars = {
        '#': '[0-9]',
        '9': '[0-9]',
        'a': '[A-Za-z]',
        '*': '.'
      };
    }

    if (format === 'price') {
      props.value = (0, _helpers.formatPrice)(props.value);
    } else if (typeof format === 'function') {
      props.value = format(props.value);
    }

    if (props.type === 'plain') {
      var selectedItem = menu.filter(function (item) {
        return String(item.value) === String(props.value);
      })[0];

      if (selectedItem) {
        props.value = selectedItem.primary;
      }

      if (props.mask) {
        var inputMask = new _reactInputMask["default"](props);
        props.value = inputMask.value;
      }

      if (props.value) {
        props.value = props.value.replace(/\n/g, '<br />').replace(/\s\s/g, '&nbsp; ');
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: props.className,
        dangerouslySetInnerHTML: {
          __html: props.value
        }
      });
    } else if (props.mask) {
      props.beforeMaskedValueChange = function (newState, oldState) {
        var state = _objectSpread({}, newState);

        if (readOnly && !oldState.value) {
          state.value = oldState.value;
        }

        return state;
      };

      return /*#__PURE__*/_react["default"].createElement(_reactInputMask["default"], (0, _extends2["default"])({}, props, {
        inputRef: function inputRef(node) {
          _this4.inputEl = node;
        }
      }));
    } else {
      return /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({}, props, {
        ref: function ref(node) {
          _this4.inputEl = node;
        }
      }));
    }
  };

  _proto.renderDropdown = function renderDropdown(children) {
    var _this5 = this;

    var dropdownVisible = this.state.dropdownVisible;
    var position = this.props.position;
    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: function ref(_ref) {
        _this5.refDropdown = _ref;
      },
      className: (0, _classnames2["default"])({
        'Input__dropdown': true,
        '--visible': dropdownVisible,
        '--right': position === 'right'
      })
    }, children);
  };

  _proto.renderMenu = function renderMenu() {
    var _this6 = this;

    var _this$state2 = this.state,
        dropdownVisible = _this$state2.dropdownVisible,
        menuSelectedItemIndex = _this$state2.menuSelectedItemIndex;
    var menu = this.getMenu();
    return this.renderDropdown( /*#__PURE__*/_react["default"].createElement(_ScrollArea.ScrollArea, {
      className: "Input__menu",
      containerRef: function containerRef(node) {
        _this6.menuEl = node;
      }
    }, menu.map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames2["default"])({
          'Input__menu-item': true,
          '--selected': index === menuSelectedItemIndex,
          '--disabled': item.disabled
        }),
        key: index,
        "data-value": item.value,
        onMouseMove: function onMouseMove() {
          return dropdownVisible && _this6.setState({
            menuSelectedItemIndex: index
          });
        },
        onMouseDown: _this6.handleMenuItemClick.bind(_this6, item, index)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "Input__menu-item-primary"
      }, item.primary), !!item.secondary && /*#__PURE__*/_react["default"].createElement("div", {
        className: "Input__menu-item-secondary"
      }, item.secondary));
    })));
  };

  _proto.renderRange = function renderRange() {
    var _this7 = this;

    var _this$props9 = this.props,
        _this$props9$min = _this$props9.min,
        min = _this$props9$min === void 0 ? 0 : _this$props9$min,
        _this$props9$max = _this$props9.max,
        max = _this$props9$max === void 0 ? 0 : _this$props9$max,
        step = _this$props9.step,
        readOnly = _this$props9.readOnly,
        disabled = _this$props9.disabled,
        _this$props9$rangePro = _this$props9.rangeProps,
        rangeProps = _this$props9$rangePro === void 0 ? {} : _this$props9$rangePro;

    var _max = max > min ? max : min + step;

    var value = parseFloat(this.state.value) || min;
    var valuePercents = (value - min) / (_max - min) * 100;

    if (value < min) {
      value = min;
      valuePercents = 0;
    } else if (value > max) {
      value = max;
      valuePercents = 100;
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Input__slider"
    }, /*#__PURE__*/_react["default"].createElement(_reactRange.Range, {
      min: min,
      max: _max,
      step: step,
      values: [value],
      disabled: disabled || readOnly || max <= min,
      renderTrack: function renderTrack(_ref2) {
        var props = _ref2.props,
            children = _ref2.children;
        return /*#__PURE__*/_react["default"].createElement("div", props, children, /*#__PURE__*/_react["default"].createElement("div", {
          className: "Input__slider-track",
          style: {
            width: valuePercents + '%'
          }
        }));
      },
      renderThumb: function renderThumb(_ref3) {
        var props = _ref3.props;
        return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
          className: "Input__slider-handle"
        }, props, {
          tabIndex: "-1",
          onMouseDown: _this7.handleSliderDown.bind(_this7)
        }));
      },
      onChange: function onChange(values) {
        _this7.handleRangeChange(values[0]);
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Input__slider-label-min"
    }, rangeProps.formatLabel ? rangeProps.formatLabel(min, 'min') : min), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Input__slider-label-max"
    }, rangeProps.formatLabel ? rangeProps.formatLabel(max, 'max') : max));
  };

  _proto.renderSuffix = function renderSuffix(element, type) {
    var _this8 = this;

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Input__".concat(type),
      onClick: function onClick() {
        _this8.inputEl && _this8.inputEl.focus();
      }
    }, element);
  };

  _proto.render = function render() {
    var _classnames;

    var _this$props10 = this.props,
        className = _this$props10.className,
        componentProps = _this$props10.componentProps,
        size = _this$props10.size,
        color = _this$props10.color,
        variant = _this$props10.variant,
        rounded = _this$props10.rounded,
        invalid = _this$props10.invalid,
        disabled = _this$props10.disabled,
        progress = _this$props10.progress,
        type = _this$props10.type,
        label = _this$props10.label,
        mask = _this$props10.mask,
        prefix = _this$props10.prefix,
        suffix = _this$props10.suffix;
    var _this$state3 = this.state,
        value = _this$state3.value,
        focused = _this$state3.focused;

    var inputProps = _objectSpread(_objectSpread({}, (0, _helpers.excludeProps)(this)), {}, {
      className: 'Input__element',
      disabled: disabled,
      type: type,
      mask: mask,
      onClick: this.handleClick.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      onChange: this.handleChange.bind(this),
      onKeyDown: this.handleKeyDown.bind(this),
      onPaste: this.handlePaste.bind(this)
    });

    if (['number', 'decimal', 'range'].indexOf(type) >= 0) {
      inputProps.type = 'text';
      inputProps.inputMode = 'numeric';
    }

    var classNames = (0, _classnames2["default"])((_classnames = {
      'Input': true
    }, (0, _defineProperty2["default"])(_classnames, "Input_size_".concat(size), true), (0, _defineProperty2["default"])(_classnames, "Input_color_".concat(color), true), (0, _defineProperty2["default"])(_classnames, "Input_variant_".concat(variant), true), (0, _defineProperty2["default"])(_classnames, "Input_type_".concat(type), true), (0, _defineProperty2["default"])(_classnames, 'Input_rounded', rounded), (0, _defineProperty2["default"])(_classnames, 'Input_labeled', !!label), (0, _defineProperty2["default"])(_classnames, '--focused', focused), (0, _defineProperty2["default"])(_classnames, '--filled', [undefined, null, ''].indexOf(value) < 0), (0, _defineProperty2["default"])(_classnames, '--invalid', invalid), (0, _defineProperty2["default"])(_classnames, '--disabled', disabled), (0, _defineProperty2["default"])(_classnames, '--progress', progress), _classnames), className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, componentProps), prefix && this.renderSuffix(prefix, 'prefix'), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Input__container"
    }, !!label && /*#__PURE__*/_react["default"].createElement("div", {
      className: "Input__label"
    }, label), this.renderElement(inputProps)), suffix && this.renderSuffix(suffix, 'suffix'), progress && /*#__PURE__*/_react["default"].createElement(_Progress.Progress, {
      className: "Input__progress",
      color: "current"
    }), type !== 'plain' && !!this.getMenu().length && this.renderMenu(), type === 'range' && this.renderRange());
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
  format: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  disabled: _propTypes["default"].bool,
  invalid: _propTypes["default"].bool,
  progress: _propTypes["default"].bool,
  defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].number.isRequired]),
  value: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].number.isRequired]),
  prefix: _propTypes["default"].any,
  suffix: _propTypes["default"].any,
  menu: _propTypes["default"].oneOfType([_propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  filterMenu: _propTypes["default"].bool,
  step: _propTypes["default"].number,
  roundBy: _propTypes["default"].number,
  rangeProps: _propTypes["default"].object,
  position: _propTypes["default"].string
};
Input.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'text'
};