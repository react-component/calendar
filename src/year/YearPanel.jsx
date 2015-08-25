import React from 'react';
import {classSet as cx} from 'rc-util';
import DecadePanel from '../decade/DecadePanel';
const ROW = 4;
const COL = 3;

function goYear(direction) {
  const next = this.state.value.clone();
  next.addYear(direction);
  this.setState({value: next});
}

function chooseYear(year) {
  const next = this.state.value.clone();
  next.setYear(year);
  this.props.onSelect(next);
}

export default
class YearPanel extends React.Component {
  constructor(props) {
    super(props);
    this.prefixCls = props.rootPrefixCls + '-year-panel';
    this.state = {
      value: props.value || props.defaultValue,
    };
    this.nextDecade = goYear.bind(this, 10);
    this.previousDecade = goYear.bind(this, -10);
    ['showDecadePanel', 'onDecadePanelSelect'].forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  onDecadePanelSelect(current) {
    this.setState({
      value: current,
      showDecadePanel: 0,
    });
  }

  getYears() {
    const value = this.state.value;
    const currentYear = value.getYear();
    const startYear = parseInt(currentYear / 10, 10) * 10;
    const previousYear = startYear - 1;
    const endYear = startYear + 9;
    const years = [];
    let index = 0;
    for (let i = 0; i < ROW; i++) {
      years[i] = [];
      for (let j = 0; j < COL; j++) {
        const year = previousYear + index;
        let content;
        if (year < startYear) {
          content = '';
        } else if (year > endYear) {
          content = '';
        } else {
          content = year + '';
        }
        years[i][j] = {
          content: content,
          year: year,
          title: content,
        };
        index++;
      }
    }
    return years;
  }

  render() {
    const props = this.props;
    const value = this.state.value;
    const locale = props.locale;
    const years = this.getYears();
    const currentYear = value.getYear();
    const startYear = parseInt(currentYear / 10, 10) * 10;
    const endYear = startYear + 9;
    const prefixCls = this.prefixCls;

    const yeasEls = years.map((row, index) => {
      const tds = row.map(y => {
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-selected-cell`]: y.year === currentYear,
          [`${prefixCls}-last-decade-cell`]: y.year < startYear,
          [`${prefixCls}-next-decade-cell`]: y.year > endYear,
        };
        let clickHandler;
        if (y.year < startYear) {
          clickHandler = this.previousDecade;
        } else if (y.year > endYear) {
          clickHandler = this.nextDecade;
        } else {
          clickHandler = chooseYear.bind(this, y.year);
        }
        return (
          <td role="gridcell"
              title={y.title}
              key={y.content}
              onClick={clickHandler}
              className={cx(classNameMap)}
            >
            <a
              className={`${prefixCls}-year`}>
              {y.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    let decadePanel;
    if (this.state.showDecadePanel) {
      decadePanel = (<DecadePanel locale={locale} value={value} rootPrefixCls={props.rootPrefixCls}
                                 onSelect={this.onDecadePanelSelect}/>);
    }

    return (
      <div className={this.prefixCls}>
        <div>
          <div className={`${prefixCls}-header`}>
            <a className={`${prefixCls}-prev-decade-btn`}
               role="button"
               onClick={this.previousDecade}
               title={locale.previousDecade}>
              «
            </a>
            <a className={`${prefixCls}-decade-select`}
               role="button"
               onClick={this.showDecadePanel}
               title={locale.decadeSelect}>
              <span className={`${prefixCls}-decade-select-content`}>
                {startYear}-{endYear}
              </span>
              <span className={`${prefixCls}-decade-select-arrow`}>x</span>
            </a>

            <a className={`${prefixCls}-next-decade-btn`}
               role="button"
               onClick={this.nextDecade}
               title={locale.nextDecade}>
              »
            </a>
          </div>
          <div className={`${prefixCls}-body`}>
            <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
              <tbody className={`${prefixCls}-tbody`}>
              {yeasEls}
              </tbody>
            </table>
          </div>
        </div>
        {decadePanel}
      </div>);
  }

  showDecadePanel() {
    this.setState({
      showDecadePanel: 1,
    });
  }
}

YearPanel.defaultProps = {
  onSelect() {
  },
};
