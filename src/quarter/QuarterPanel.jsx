import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuarterTable from './QuarterTable';

function goYear(direction) {
  const next = this.state.value.clone();
  next.add(direction, 'year');
  this.setAndChangeValue(next);
}

function noop() {}

class QuarterPanel extends Component {
  constructor(props) {
    super(props);
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    this.prefixCls = `${props.rootPrefixCls}-quarter-panel`;
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  setAndChangeValue(value) {
    this.setValue(value);
    this.props.onChange(value);
  }

  setAndSelectValue = (value) => {
    this.setValue(value);
    this.props.onSelect(value);
  }

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
  }

  render() {
    const props = this.props;
    const value = this.state.value;
    const cellRender = props.cellRender;
    const contentRender = props.contentRender;
    const { locale } = props;
    const year = value.year();
    const prefixCls = this.prefixCls;

    return (
      <div className={prefixCls} style={props.style}>
        <div>
          <div className={`${prefixCls}-header`}>
            <a
              className={`${prefixCls}-prev-year-btn`}
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}
            />

            <a
              className={`${prefixCls}-year-select`}
              role="button"
              onClick={props.onYearPanelShow}
              title={locale.yearSelect}
            >
              <span className={`${prefixCls}-year-select-content`}>{year}</span>
              <span className={`${prefixCls}-year-select-arrow`}>x</span>
            </a>

            <a
              className={`${prefixCls}-next-year-btn`}
              role="button"
              onClick={this.nextYear}
              title={locale.nextYear}
            />
          </div>
          <div className={`${prefixCls}-body`}>
            <QuarterTable
              disabledDate={props.disabledDate}
              onSelect={this.setAndSelectValue}
              locale={locale}
              value={value}
              cellRender={cellRender}
              contentRender={contentRender}
              prefixCls={prefixCls}
            />
          </div>
        </div>
      </div>
    );
  }
}

QuarterPanel.defaultProps = {
  onChange: noop,
  onSelect: noop,
};

QuarterPanel.propTypes = {
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  rootPrefixCls: PropTypes.string,
  onChange: PropTypes.func,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
};

export default QuarterPanel;
