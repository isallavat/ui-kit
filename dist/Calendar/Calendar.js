"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
var WEEKDAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

function getValueProps(props) {
  var value;
  var now = new Date();

  if (props.value) {
    value = props.value;
  } else if (props.max && new Date(props.max) < now) {
    value = new Date(props.max).toISOString();
  } else if (props.min && new Date(props.min) > now) {
    value = new Date(props.min).toISOString();
  } else {
    value = new Date().toISOString();
  }

  return value;
}

var Calendar = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Calendar, _React$Component);

  function Calendar(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      value: props.value,
      currentValue: getValueProps(props),
      cellType: 'day'
    };
    return _this;
  }

  Calendar.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if ([prevState.value, prevState.propsValue].indexOf(nextProps.value) < 0) {
      return {
        value: nextProps.value,
        currentValue: getValueProps(nextProps),
        propsValue: nextProps.value
      };
    }

    return null;
  };

  var _proto = Calendar.prototype;

  _proto.getHeaderTitle = function getHeaderTitle() {
    var _this$state = this.state,
        currentValue = _this$state.currentValue,
        cellType = _this$state.cellType;
    var date = new Date(currentValue);

    if (cellType === 'day') {
      return "".concat(MONTHS[date.getMonth()], " ").concat(date.getFullYear());
    } else if (cellType === 'month') {
      return date.getFullYear();
    }
  };

  _proto.getCells = function getCells() {
    var cellType = this.state.cellType;

    if (cellType === 'day') {
      return this.createDays();
    } else if (cellType === 'month') {
      return this.createMonths();
    } else if (cellType === 'year') {
      return this.createYears();
    }
  };

  _proto.createDays = function createDays() {
    var currentValue = this.state.currentValue;
    var date = new Date(currentValue);
    var cells = {};
    date.setDate(1);
    var firstWeekDay = date.getDay() || 7;
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    var lastWeekDay = date.getDay();
    var count = date.getDate();
    count += firstWeekDay;
    count += 7 - (lastWeekDay || 7);
    date.setDate(1 - firstWeekDay);

    for (var i = 0; i < count - 1; i++) {
      date.setDate(date.getDate() + 1);
      cells[date.toISOString()] = date.getDate();
    }

    return cells;
  };

  _proto.createMonths = function createMonths() {
    var cells = {};

    for (var i = 0; i < 12; i++) {
      cells[i] = MONTHS[i].substr(0, 3);
    }

    return cells;
  };

  _proto.createYears = function createYears() {
    var _this$props = this.props,
        min = _this$props.min,
        max = _this$props.max;
    var now = new Date();
    var minDate = new Date(min);
    var maxDate = new Date(max);
    var minYear = minDate.getFullYear() || now.getFullYear() - 100;
    var maxYear = maxDate.getFullYear() || now.getFullYear();
    var cells = {};

    for (var i = maxYear; i >= minYear; i--) {
      cells[i] = i;
    }

    return cells;
  };

  _proto.isCellDisabled = function isCellDisabled(cellValue) {
    var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max;
    var _this$state2 = this.state,
        currentValue = _this$state2.currentValue,
        cellType = _this$state2.cellType;
    var minDate = new Date(min);
    var maxDate = new Date(max);

    if (cellType === 'day') {
      var date = new Date(cellValue);
      return date > maxDate || date < minDate;
    } else if (cellType === 'month') {
      var _date = new Date(currentValue);

      _date.setMonth(cellValue);

      _date.setDate(1);

      if (_date > maxDate) {
        return true;
      }

      _date.setMonth(_date.getMonth() + 1);

      _date.setDate(-1);

      if (_date < minDate) {
        return true;
      }
    }
  };

  _proto.isCellOverrange = function isCellOverrange(cellValue) {
    var _this$state3 = this.state,
        currentValue = _this$state3.currentValue,
        cellType = _this$state3.cellType;
    var date = new Date(currentValue);
    var cellDate = new Date(cellValue);

    if (cellType === 'day') {
      return cellDate.getMonth() !== date.getMonth();
    }
  };

  _proto.isCellSelected = function isCellSelected(cellValue) {
    var value = this.state.value;
    return String(cellValue) === String(value);
  };

  _proto.handleHeaderTitleClick = function handleHeaderTitleClick() {
    var cellType = this.state.cellType;

    if (cellType === 'day') {
      this.setState({
        cellType: 'month'
      });
    } else if (cellType === 'month') {
      this.setState({
        cellType: 'year'
      });
    }
  };

  _proto.handleHeaderStepClick = function handleHeaderStepClick(step) {
    var _this$props3 = this.props,
        min = _this$props3.min,
        max = _this$props3.max;
    var _this$state4 = this.state,
        currentValue = _this$state4.currentValue,
        cellType = _this$state4.cellType;
    var date = new Date(currentValue);
    var minDate = new Date(min);
    var maxDate = new Date(max);

    if (cellType === 'day') {
      if (step > 0) {
        date.setMonth(date.getMonth() + step);
        date.setDate(1);
      } else {
        date.setDate(-1);
      }
    } else if (cellType === 'month') {
      if (step > 0) {
        date.setFullYear(date.getFullYear() + step);
        date.setMonth(0);
      } else {
        date.setMonth(-1);
      }
    }

    if (date > maxDate || date < minDate) {
      return;
    }

    this.setState({
      currentValue: date.toISOString()
    });
  };

  _proto.handleCellSelect = function handleCellSelect(cellValue) {
    var onChange = this.props.onChange;
    var _this$state5 = this.state,
        currentValue = _this$state5.currentValue,
        cellType = _this$state5.cellType;
    var date = new Date(currentValue);
    var state = {};

    if (cellType === 'day') {
      date = new Date(cellValue);
    } else if (cellType === 'month') {
      date.setMonth(cellValue);
      state.cellType = 'day';
    } else if (cellType === 'year') {
      date.setFullYear(cellValue);
      state.cellType = 'month';
    }

    state.currentValue = date.toISOString();

    if (cellType === 'day') {
      state.value = state.currentValue;
      onChange && onChange(state.value);
    }

    this.setState(state);
  };

  _proto.renderHeader = function renderHeader() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Calendar__cells Calendar__cells_header"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Calendar__cell"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: "Calendar__cell-button",
      type: "button",
      tabIndex: "-1",
      onClick: this.handleHeaderStepClick.bind(this, -1)
    }, "<")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Calendar__cell"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: "Calendar__cell-button",
      type: "button",
      tabIndex: "-1",
      onClick: this.handleHeaderTitleClick.bind(this)
    }, this.getHeaderTitle())), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Calendar__cell"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: "Calendar__cell-button",
      type: "button",
      tabIndex: "-1",
      onClick: this.handleHeaderStepClick.bind(this, 1)
    }, ">")));
  };

  _proto.renderWeekDays = function renderWeekDays() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Calendar__cells Calendar__cells_weekdays"
    }, WEEKDAYS.map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames2["default"])({
          'Calendar__cell': true,
          'Calendar__cell_type_weekday': true
        }),
        key: index
      }, item);
    }));
  };

  _proto.renderCells = function renderCells() {
    var _this2 = this;

    var cellType = this.state.cellType;
    var cells = this.getCells();
    var cellsKeys = Object.keys(cells);

    if (cellType === 'year') {
      cellsKeys = cellsKeys.reverse();
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Calendar__cells"
    }, cellsKeys.map(function (key, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames2["default"])((0, _defineProperty2["default"])({
          'Calendar__cell': true
        }, "Calendar__cell_type_".concat(cellType), true)),
        key: index
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: (0, _classnames2["default"])({
          'Calendar__cell-button': true,
          'Calendar__cell-button_light': _this2.isCellOverrange(key),
          '--selected': _this2.isCellSelected(key) && !_this2.isCellDisabled(key),
          '--disabled': _this2.isCellDisabled(key)
        }),
        type: "button",
        tabIndex: "-1",
        disabled: _this2.isCellDisabled(key),
        onClick: _this2.handleCellSelect.bind(_this2, key)
      }, cells[key]));
    }));
  };

  _proto.render = function render() {
    var className = this.props.className;
    var cellType = this.state.cellType;
    var classNames = (0, _classnames2["default"])({
      'Calendar': true
    }, className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), this.getHeaderTitle() && this.renderHeader(), cellType === 'day' && this.renderWeekDays(), this.renderCells());
  };

  return Calendar;
}(_react["default"].Component);

exports.Calendar = Calendar;
Calendar.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  value: _propTypes["default"].string,
  min: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].number.isRequired]),
  max: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].number.isRequired]),
  locale: _propTypes["default"].string,
  onChange: _propTypes["default"].func
};
Calendar.defaultProps = {
  component: 'div',
  locale: 'ru'
};