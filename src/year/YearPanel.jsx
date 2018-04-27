import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const ROW = 4;
const COL = 3;

function goYear(direction) {
  const next = this.props.displayedValue.clone();
  next.add(direction, 'year');
  this.props.setDisplayedValue(next);
}

function chooseYear(year) {
  const next = this.props.displayedValue.clone();
  next.year(year);
  this.props.onSelect(next);
}

export default
class YearPanel extends React.Component {
  constructor(props) {
    super(props);
    this.prefixCls = `${props.rootPrefixCls}-year-panel`;
    this.state = {
      value: props.value || props.defaultValue,
    };
    this.nextDecade = goYear.bind(this, 10);
    this.previousDecade = goYear.bind(this, -10);
  }

  years() {
    const displayedValue = this.props.displayedValue;
    const currentYear = displayedValue.year();
    const startYear = parseInt(currentYear / 10, 10) * 10;
    const previousYear = startYear - 1;
    const years = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      years[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const year = previousYear + index;
        const content = String(year);
        years[rowIndex][colIndex] = {
          content,
          year,
          title: content,
        };
        index++;
      }
    }
    return years;
  }
  render() {
    const props = this.props;
    const displayedValue = props.displayedValue;
    const locale = props.locale;
    const years = this.years();
    const currentYear = displayedValue.year();
    const startYear = parseInt(currentYear / 10, 10) * 10;
    const endYear = startYear + 9;
    const prefixCls = this.prefixCls;

    const yeasEls = years.map((row, index) => {
      const tds = row.map(yearData => {
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-selected-cell`]: yearData.year === currentYear,
          [`${prefixCls}-last-decade-cell`]: yearData.year < startYear,
          [`${prefixCls}-next-decade-cell`]: yearData.year > endYear,
        };
        let clickHandler;
        if (yearData.year < startYear) {
          clickHandler = this.previousDecade;
        } else if (yearData.year > endYear) {
          clickHandler = this.nextDecade;
        } else {
          clickHandler = chooseYear.bind(this, yearData.year);
        }
        return (
          <td
            role="gridcell"
            title={yearData.title}
            key={yearData.content}
            onClick={clickHandler}
            className={classnames(classNameMap)}
          >
            <a
              className={`${prefixCls}-year`}
            >
              {yearData.content}
            </a>
          </td>);
      });
      return (<tr key={index} role="row">{tds}</tr>);
    });

    return (
      <div className={this.prefixCls}>
        <div>
          <div className={`${prefixCls}-header`}>
            <a
              className={`${prefixCls}-prev-decade-btn`}
              role="button"
              onClick={this.previousDecade}
              title={locale.previousDecade}
            />
            <a
              className={`${prefixCls}-decade-select`}
              role="button"
              onClick={props.onDecadePanelShow}
              title={locale.decadeSelect}
            >
              <span className={`${prefixCls}-decade-select-content`}>
                {startYear}-{endYear}
              </span>
              <span className={`${prefixCls}-decade-select-arrow`}>x</span>
            </a>

            <a
              className={`${prefixCls}-next-decade-btn`}
              role="button"
              onClick={this.nextDecade}
              title={locale.nextDecade}
            />
          </div>
          <div className={`${prefixCls}-body`}>
            <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
              <tbody className={`${prefixCls}-tbody`}>
              {yeasEls}
              </tbody>
            </table>
          </div>
        </div>
      </div>);
  }
}

YearPanel.propTypes = {
  rootPrefixCls: PropTypes.string,
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  displayedValue: PropTypes.object,
};

YearPanel.defaultProps = {
  onSelect() {
  },
};
