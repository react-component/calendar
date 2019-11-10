import React, { useState, ReactNode } from 'react';
import classnames from 'classnames';
import { Moment } from 'moment';

const ROW = 4;
const COL = 3;

interface DecadePanelProps {
  value?: Moment;
  defaultValue?: Moment;
  locale?: {
    [key: string]: any;
  };
  rootPrefixCls?: string;
  renderFooter: (key: string) => ReactNode;
  onSelect: (value: Moment) => void;
}

const DecadePanel: React.FC<DecadePanelProps> = props => {
  const [value, setValue] = useState(props.value || props.defaultValue);
  function chooseDecade(year, event) {
    const next = value.clone();
    next.year(year);
    next.month(value.month());
    if (props.onSelect) {
      props.onSelect(next);
    }
    event.preventDefault();
  }

  const nextCentury = () => {
    const next = value.clone();
    next.add(100, 'years');
    setValue(next);
  };

  const previousCentury = () => {
    const next = value.clone();
    next.add(-100, 'years');
    setValue(next);
  };

  // bind methods
  const prefixCls = `${props.rootPrefixCls}-decade-panel`;

  const { locale, renderFooter } = props;

  const currentYear = value.year();
  const startYear = parseInt(`${currentYear / 100}`, 10) * 100;
  const preYear = startYear - 10;
  const endYear = startYear + 99;
  const decades: { startDecade: number; endDecade: number }[][] = [];
  let index = 0;

  for (let rowIndex = 0; rowIndex < ROW; rowIndex += 1) {
    decades[rowIndex] = [];
    for (let colIndex = 0; colIndex < COL; colIndex += 1) {
      const startDecade = preYear + index * 10;
      const endDecade = preYear + index * 10 + 9;
      decades[rowIndex][colIndex] = {
        startDecade,
        endDecade,
      };
      index += 1;
    }
  }

  const footer = renderFooter && renderFooter('decade');

  const decadesEls = decades.map((row, decadeIndex) => {
    const tds = row.map(decadeData => {
      const dStartDecade = decadeData.startDecade;
      const dEndDecade = decadeData.endDecade;
      const isLast = dStartDecade < startYear;
      const isNext = dEndDecade > endYear;
      const classNameMap = {
        [`${prefixCls}-cell`]: 1,
        [`${prefixCls}-selected-cell`]: dStartDecade <= currentYear && currentYear <= dEndDecade,
        [`${prefixCls}-last-century-cell`]: isLast,
        [`${prefixCls}-next-century-cell`]: isNext,
      };
      const content = `${dStartDecade}-${dEndDecade}`;
      let clickHandler;
      if (isLast) {
        clickHandler = previousCentury;
      } else if (isNext) {
        clickHandler = nextCentury;
      } else {
        clickHandler = chooseDecade.bind(this, dStartDecade);
      }
      return (
        <td
          key={dStartDecade}
          onClick={clickHandler}
          role="gridcell"
          className={classnames(classNameMap)}
        >
          <a className={`${prefixCls}-decade`}>{content}</a>
        </td>
      );
    });
    return (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={decadeIndex} role="row">
        {tds}
      </tr>
    );
  });

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-header`}>
        <a
          className={`${prefixCls}-prev-century-btn`}
          role="button"
          onClick={previousCentury}
          title={locale.previousCentury}
        >
          {' '}
        </a>

        <div className={`${prefixCls}-century`}>
          {startYear}-{endYear}
        </div>
        <a
          className={`${prefixCls}-next-century-btn`}
          role="button"
          onClick={nextCentury}
          title={locale.nextCentury}
        >
          {' '}
        </a>
      </div>
      <div className={`${prefixCls}-body`}>
        <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
          <tbody className={`${prefixCls}-tbody`}>{decadesEls}</tbody>
        </table>
      </div>

      {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
    </div>
  );
};

export default DecadePanel;
