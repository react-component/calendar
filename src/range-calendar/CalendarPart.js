import React, {PropTypes} from 'react';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import CalendarFooter from '../calendar/CalendarFooter';
import DateInput from '../date/DateInput';

const Calendar = React.createClass({
  propTypes: {
    onTimeSelect: PropTypes.func,
  },

  render() {
    const props = this.props;
    const {value, direction, prefixCls, locale, range, formatter, disabledDate} = props;
    const rangeClassName = `${prefixCls}-range`;
    const newProps = {locale, value, prefixCls};
    const index = direction === 'left' ? 0 : 1;
    return (<div className={`${rangeClassName}-part ${rangeClassName}-${direction}`}>
      <div className={`${prefixCls}-input-wrap`}>
        <DateInput className={`${prefixCls}-input`}
                   formatter={formatter}
                   disabledDate={disabledDate}
                   value={range[index] || range[0]}
                   onChange={props.onInputSelect}/>
        <i className={`${prefixCls}-input-icon`}/>
      </div>
      <div style={{outline: 'none'}}>
        <CalendarHeader
          {...newProps}
          enableNext={direction === 'right'}
          enablePrev={direction === 'left'}
          onValueChange={props.onAnchorChange}/>

        <div className={`${prefixCls}-calendar-body`}>
          <DateTable
            {...newProps}
            range={range}
            dateRender={props.dateRender}
            onSelect={props.onSelect}
            onDayHover={props.onDayHover}
            disabledDate={disabledDate}
            showWeekNumber={props.showWeekNumber}/>
        </div>
        <CalendarFooter
          showTime={props.showTime}
          {...newProps}
          disabledDate={props.disabledDate}
          timeDisabled={!range[index] || !!range.hovering}
          onSelect={this.props.onTimeSelect}
          onToday={this.chooseToday}
          />
      </div>
    </div>);
  },
});

export default Calendar;
