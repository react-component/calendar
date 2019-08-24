import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class CalendarRightPanel extends React.Component {

  static propTypes = {
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    onSelect: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      highlightTime: this.props.value || null,
    };
    this.timeRef = React.createRef();
  }

  onSelect = (value) => {
    this.setState({
      highlightTime: value,
    });
    this.props.onSelect(value);
  }

  scrollUp = () => {
    this.timeRef.current.scrollBy(0, -200);
  }

  scrollDown = () => {
    this.timeRef.current.scrollBy(0, 200);
  }

  render() {
    const { value, prefixCls } = this.props;
    const selectedDate = value.format().slice(0, 10);
    const times = [];
    for (let i = 0; i < 24; i++) {
      const str = (String(i) + ':00').padStart(5, '0');
      const str1 = (String(i) + ':30').padStart(5, '0');
      times.push(str);
      times.push(str1);
    }
    return (
      <div className={`${prefixCls}-right-panel`}>
        <div className={`${prefixCls}-right-panel-header`} onClick={this.scrollUp}>
          <span></span>
        </div>
        <div className={`${prefixCls}-right-panel-body`} ref={this.timeRef}>
          <ul>
            {times.map((time) => {
              const current = moment(selectedDate + ' ' + time);
              const isHightlight = current.isSame(this.state.highlightTime) ? 'highlight' : '';
              return (
                <li
                  key={time}
                  onClick={this.onSelect.bind(null, current)}
                  className={`${isHightlight}`}
                >{time}</li>
              );
            })}
          </ul>
        </div>
        <div className={`${prefixCls}-right-panel-footer`} onClick={this.scrollDown}>
          <span></span>
        </div>
      </div>
    );
  }
}
