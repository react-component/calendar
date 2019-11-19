import React, { ReactNode, CSSProperties } from 'react';
import { Moment } from 'moment';

import { polyfill } from 'react-lifecycles-compat';
import MonthTable from './MonthTable';

export interface MonthPanelProps {
  value?: Moment;
  onSelect?: (value: Moment) => void;
  prefixCls?: string;
  rootPrefixCls?: string;
  locale?: { [key: string]: any };
  contentRender?: (value: Moment, locale: { [key: string]: any }) => ReactNode;
  cellRender?: (value: Moment, locale: { [key: string]: any }) => ReactNode;
  disabledDate?: (value: Moment) => boolean;
  renderFooter?: (key: string) => ReactNode;
  changeYear?: (direction: number) => void;
  style?: CSSProperties;
  onYearPanelShow: React.MouseEventHandler<HTMLAnchorElement>;
}
export interface MonthPanelState {
  value: Moment;
}

class MonthPanel extends React.Component<MonthPanelProps, MonthPanelState> {
  static defaultProps = {
    onChange: () => null,
    onSelect: () => null,
  };

  goYear = (direction: number) => {
    this.props.changeYear(direction);
  };

  nextYear = () => this.goYear(1);

  previousYear = () => this.goYear(-1);

  prefixCls = `${this.props.rootPrefixCls}-month-panel`;

  constructor(props) {
    super(props);

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

  setAndSelectValue = value => {
    this.setValue(value);
    this.props.onSelect(value);
  };

  setValue = value => {
    if ('value' in this.props) {
      this.setState({
        value,
      });
    }
  };

  render() {
    const { props } = this;
    const { value } = this.state;
    const { locale, cellRender, contentRender, renderFooter } = props;
    const year = value.year();
    const { prefixCls } = this;

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
          {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        </div>
      </div>
    );
  }
}

polyfill(MonthPanel);

export default MonthPanel;
