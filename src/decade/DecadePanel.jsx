import React from 'react';
const ROW = 4;
const COL = 3;
import {classSet as cx} from 'rc-util';

function goYear(direction) {
  const next = this.state.value.clone();
  next.addYear(direction);
  this.setState({
    value: next,
  });
}

function chooseDecade(year, e) {
  const next = this.state.value.clone();
  next.setYear(year);
  this.props.onSelect(next);
  e.preventDefault();
}

export default
class DecadePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
    };

    // bind methods
    this.prefixCls = props.rootPrefixCls + '-decade-panel';
    this.nextCentury = goYear.bind(this, 100);
    this.previousCentury = goYear.bind(this, -100);
  }

  render() {
    const value = this.state.value;
    const locale = this.props.locale;
    const currentYear = value.getYear();
    const startYear = parseInt(currentYear / 100, 10) * 100;
    const preYear = startYear - 10;
    const endYear = startYear + 99;
    const decades = [];
    let index = 0;
    const prefixCls = this.prefixCls;

    for (let i = 0; i < ROW; i++) {
      decades[i] = [];
      for (let j = 0; j < COL; j++) {
        const startDecade = preYear + index * 10;
        const endDecade = preYear + index * 10 + 9;
        decades[i][j] = {
          startDecade: startDecade,
          endDecade: endDecade,
        };
        index++;
      }
    }

    const decadesEls = decades.map((row, decadeIndex) => {
      const tds = row.map(d => {
        const dStartDecade = d.startDecade;
        const dEndDecade = d.endDecade;
        const isLast = dStartDecade < startYear;
        const isNext = dEndDecade > endYear;
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-selected-cell`]: dStartDecade <= currentYear && currentYear <= dEndDecade,
          [`${prefixCls}-last-century-cell`]: isLast,
          [`${prefixCls}-next-century-cell`]: isNext,
        };
        let content;
        let clickHandler;
        if (isLast) {
          clickHandler = this.previousCentury;
        } else if (isNext) {
          clickHandler = this.nextCentury;
        } else {
          content = dStartDecade + '-' + dEndDecade;
          clickHandler = chooseDecade.bind(this, dStartDecade);
        }
        return (<td
          key={dStartDecade}
          onClick={clickHandler}
          role="gridcell"
          className={cx(classNameMap)}
          >
          <a
            className={`${prefixCls}-decade`}>
            {content}
          </a>
        </td>);
      });
      return (<tr key={decadeIndex} role="row">{tds}</tr>);
    });

    return (
      <div className={this.prefixCls}>
        <div className={`${prefixCls}-header`}>
          <a className={`${prefixCls}-prev-century-btn`}
             role="button"
             onClick={this.previousCentury}
             title={locale.previousCentury}>
            «
          </a>

          <div className={`${prefixCls}-century`}>
            {startYear}-{endYear}
          </div>
          <a className={`${prefixCls}-next-century-btn`}
             role="button"
             onClick={this.nextCentury}
             title={locale.nextCentury}>
            »
          </a>
        </div>
        <div className={`${prefixCls}-body`}>
          <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
            <tbody className={`${prefixCls}-tbody`}>
            {decadesEls}
            </tbody>
          </table>
        </div>
      </div>);
  }
}

DecadePanel.propTypes = {
  locale: React.PropTypes.object,
};

DecadePanel.defaultProps = {
  onSelect() {
  },
};
