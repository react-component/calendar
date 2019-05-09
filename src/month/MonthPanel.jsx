import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import MonthTable from './MonthTable';

function goYear(direction) {
  this.props.changeYear(direction);
}

function noop() {

}

class MonthPanel extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    disabledDate: PropTypes.func,
    onSelect: PropTypes.func,
    renderFooter: PropTypes.func,
    rootPrefixCls: PropTypes.string,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
  }

  static defaultProps = {
    onChange: noop,
    onSelect: noop,
  }

  constructor(props) {
    super(props);

    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    this.prefixCls = `${props.rootPrefixCls}-month-panel`;

    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  static getDerivedStateFromProps(props) {
    let newState = {};

    if ('value' in props) {
      newState = {
        value: props.value,
      };
    }

    return newState;
  }


  setAndSelectValue = (value) => {
    this.setValue(value);
    this.props.onSelect(value);
  }

  setValue = (value) => {
    if ('value' in this.props) {
      this.setState({
        value,
      });
    }
  }

  render() {
    const props = this.props;
    const value = this.state.value;
    const { locale, cellRender, contentRender, renderFooter } = props;
    const year = value.year();
    const prefixCls = this.prefixCls;

    const footer = renderFooter && renderFooter('month');

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
            <MonthTable
              disabledDate={props.disabledDate}
              onSelect={this.setAndSelectValue}
              locale={locale}
              value={value}
              cellRender={cellRender}
              contentRender={contentRender}
              prefixCls={prefixCls}
            />
          </div>
          {footer && (
            <div className={`${prefixCls}-footer`}>
              {footer}
            </div>)}
        </div>
      </div>);
  }
}

polyfill(MonthPanel);

export default MonthPanel;
