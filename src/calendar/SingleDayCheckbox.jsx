import React, { PropTypes } from 'react';

const SingleDayCheckbox = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    singleDay: PropTypes.bool,
    onSingleDayToggle: PropTypes.func,
  },

  render() {
    return (
      <div>
        <input type="checkbox"
          className={`${this.props.prefixCls}-single-day-checkbox`}
          role="checkbox"
          checked={this.props.singleDay}
          onChange={() => { this.props.onSingleDayToggle(); }}
        />
        <label className={`${this.props.prefixCls}-single-day-checkbox-label`}>
          Single-day Event
        </label>
      </div>
    );
  },
});

export default SingleDayCheckbox;
