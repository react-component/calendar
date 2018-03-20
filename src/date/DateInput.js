import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dropdown from 'react-dropdown';
import _ from 'underscore';

var DateInput = createReactClass({
  displayName: 'DateInput',

  propTypes: {
    prefixCls: PropTypes.string,
    timePicker: PropTypes.object,
    value: PropTypes.object,
    disabledTime: PropTypes.any,
    format: PropTypes.string,
    locale: PropTypes.object,
    disabledDate: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    selectedValue: PropTypes.object,
    header: PropTypes.string,
    comparedOptions: PropTypes.array,
    comparedOption: PropTypes.string,
    onComparedOptionChange: PropTypes.func
  },

  getInitialState: function getInitialState() {
    var selectedValue = this.props.selectedValue;
    return {
      str: selectedValue && selectedValue.format(this.props.format) || '',
      invalid: false,
      comparedOption: this.props.comparedOption,
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.cachedSelectionStart = this.dateInputInstance.selectionStart;
    this.cachedSelectionEnd = this.dateInputInstance.selectionEnd;
    // when popup show, click body will call this, bug!
    var selectedValue = nextProps.selectedValue;
    this.setState({
      str: selectedValue && selectedValue.format(nextProps.format) || '',
      invalid: false
    });
  },
  componentDidUpdate: function componentDidUpdate() {
    if (!this.state.invalid) {
      this.dateInputInstance.setSelectionRange(this.cachedSelectionStart, this.cachedSelectionEnd);
    }
  },
  onInputChange: function onInputChange(event) {
    var str = event.target.value;
    this.setState({
      str: str
    });
    var value = void 0;
    var _props = this.props,
        disabledDate = _props.disabledDate,
        format = _props.format,
        onChange = _props.onChange;

    if (str) {
      var parsed = moment(str, format, true);
      if (!parsed.isValid()) {
        this.setState({
          invalid: true
        });
        return;
      }
      value = this.props.value.clone();
      value.year(parsed.year()).month(parsed.month()).date(parsed.date()).hour(parsed.hour()).minute(parsed.minute()).second(parsed.second());

      if (value && (!disabledDate || !disabledDate(value))) {
        var originalValue = this.props.selectedValue;
        if (originalValue && value) {
          if (!originalValue.isSame(value)) {
            onChange(value);
          }
        } else if (originalValue !== value) {
          onChange(value);
        }
      } else {
        this.setState({
          invalid: true
        });
        return;
      }
    } else {
      onChange(null);
    }
    this.setState({
      invalid: false
    });
  },
  onClear: function onClear() {
    this.setState({
      str: ''
    });
    this.props.onClear(null);
  },
  getRootDOMNode: function getRootDOMNode() {
    return ReactDOM.findDOMNode(this);
  },
  focus: function focus() {
    if (this.dateInputInstance) {
      this.dateInputInstance.focus();
    }
  },
  saveDateInput: function saveDateInput(dateInput) {
    this.dateInputInstance = dateInput;
  },
  handleChange: function handleChange(event) {
    this.setState({ comparedOption: event.target.value });
    this.props.onComparedOptionChange(event.target.value);
  },
  createItem: function createItem(item, key){
    return React.createElement(
      'option',
      {key: key, value: item.value},
      item.value
    );
  },
  renderHeader: function renderHeader(header, prefixCls){
    if(header==null){
      return null;
    } else if(header == 'Current range'){
      return React.createElement(
        'span',
        { className: prefixCls + '-date-input-header' },
        header
      );
    } else {
      const optionList = _.map(this.props.comparedOptions, this.createItem);
      return React.createElement(
        'select',
        { 
          className: prefixCls + '-date-input-selector',
          value: this.state.comparedOption,
          onChange: this.handleChange, //{event => this.setState({ value: event.target.value })},
        },
        _.map(this.props.comparedOptions, this.createItem),
      );
    }
  },
  render: function render() {
    var props = this.props;
    var _state = this.state,
        invalid = _state.invalid,
        str = _state.str;
    var locale = props.locale,
        prefixCls = props.prefixCls,
        placeholder = props.placeholder,
        header = props.header;

    var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
    return React.createElement(
      'div',
      { className: prefixCls + '-input-wrap' },
      React.createElement(
        'div',
        { className: prefixCls + '-date-input-wrap' },
        this.renderHeader(header, prefixCls),
        React.createElement('input', {
          ref: this.saveDateInput,
          className: prefixCls + '-input ' + invalidClass,
          value: str,
          disabled: props.disabled,
          placeholder: placeholder,
          onChange: this.onInputChange
        })
      ),
      props.showClear ? React.createElement('a', {
        className: prefixCls + '-clear-btn',
        role: 'button',
        title: locale.clear,
        onClick: this.onClear
      }) : null
    );
  }
});

export default DateInput;