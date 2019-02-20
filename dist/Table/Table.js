"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _helpers = require("../helpers");

var Table =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Table, _React$Component);

  function Table() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Table.prototype;

  _proto.getAllColumns = function getAllColumns(columns) {
    var _this = this;

    columns.map(function (column) {
      if (column.columns) {
        columns = columns.concat(_this.getAllColumns(column.columns));
      }
    });
    return columns;
  };

  _proto.renderHead = function renderHead(columns) {
    var children = [];
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement("tr", null, columns.map(function (column, index) {
      children = children.concat(column.columns || []);
      return _react.default.createElement("th", {
        className: "Table__th",
        colSpan: column.columns && column.columns.length,
        key: index
      }, _react.default.createElement("div", {
        className: "Table__th-label"
      }, column.label));
    })), !!children.length && this.renderHead(children));
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        data = _this$props.data,
        columns = _this$props.columns;
    var allColumns = this.getAllColumns(columns);
    var classNames = (0, _classnames.default)({
      'Table': true
    }, className);
    return _react.default.createElement(this.props.component, (0, _extends2.default)({
      className: classNames
    }, (0, _helpers.excludeProps)(this)), _react.default.createElement("div", {
      className: "Table__container"
    }, _react.default.createElement("table", {
      className: "Table__table"
    }, _react.default.createElement("thead", null, this.renderHead(columns)), _react.default.createElement("tbody", null, data.map(function (row, index) {
      return _react.default.createElement("tr", {
        key: index
      }, allColumns.map(function (column, index2) {
        return _react.default.createElement("td", {
          className: "Table__td",
          key: index2
        }, column.render ? column.render(row) : row[column.id]);
      }));
    })))));
  };

  return Table;
}(_react.default.Component);

exports.Table = Table;
Table.propTypes = {
  component: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.func.isRequired]).isRequired,
  className: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.object.isRequired, _propTypes.default.array.isRequired]),
  data: _propTypes.default.array,
  columns: _propTypes.default.array
};
Table.defaultProps = {
  component: 'div',
  data: [],
  collumns: []
};