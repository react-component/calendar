import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

function generateOptions(length, disabledOptions, hideDisabledOptions, step = 1) {
  const arr = [];
  for (let value = 0; value < length; value += step) {
      arr.push(value);
  }
  return arr;
}

class Panel extends React.Component {

  constructor(){
    super();
    this.clickMe = this.clickMe.bind(this);
    this.getMetaData = this.getMetaData.bind(this);
  }
  clickMe(item)
  {
    let defaultValue = moment();
    defaultValue.hour(0);
    defaultValue.minute(0);
    defaultValue.second(0);
    const value = (this.props.value || defaultValue).clone();
    const timePosition = this.props.timePosition;
    if(timePosition == "hour")
    {
      value.hour(item)
    }
    if(timePosition == "min")
    {
      value.minute(item)
    }
    if(timePosition == "second")
    {
      value.second(item)
    }
    this.props.onChange(value);
    this.props.onCloseTimePicker();
  }

  getMetaData()
  {
    const timePosition = this.props.timePosition;
    let arrLength = 60 ;
    let rowNum = 10;
    let label = "小时";
    let current = 0;
    let currentDate = moment();
    let selectValue = this.props.value;
    let selected = -1;
    if(timePosition == "hour")
    {
      arrLength = 24;
      rowNum = 4;
      current = currentDate.hour();
      selected = selectValue && selectValue.hour();
    }
    if(timePosition == "min")
    {
      label = "分钟";
      current = currentDate.minute();
      selected = selectValue && selectValue.minute();
    }
    if(timePosition == "second")
    {
      label = "秒";
      current = currentDate.second();
      selected = selectValue && selectValue.second();
    }

    const options = generateOptions(arrLength);
    const optionArr = [];
    options.map((item,index) => {
      if(index%rowNum == 0)
      {
        optionArr.push([]);
      }
      let arr = optionArr[parseInt(index/rowNum)];
      arr.push(item);
    });



    return {
      "current":current,
      "label":label,
      "arr":optionArr,
      "selected":selected,
    }
  }

  render() {
    const {
      prefixCls, className, placeholder, disabledHours, disabledMinutes,
      disabledSeconds, hideDisabledOptions, allowEmpty, showHour, showMinute, showSecond,
      format, defaultOpenValue, clearText, onEsc, addon, use12Hours, onClear,
      focusOnOpen, onKeyDown, hourStep, minuteStep, secondStep, timePosition
    } = this.props;
    console.info(defaultOpenValue);

   let {current,label,arr,selected} = this.getMetaData();

   function getCellClass(item,current,selected)
   {
     let cls = "rc-calendar-time-panel-time";
     if(item == current)
     {
       cls += " current-time";
     }
     if(item == selected)
     {
       cls += " select-time";
     }
     return cls;
   }


    let self = this;
    return (<div className="rc-calendar-time-panel">
      <div className="rc-calendar-time-panel-header"><div className="rc-calendar-time-panel-title">选择{label}</div></div>
      <div className="rc-calendar-time-panel-body">
        <table className="rc-calendar-time-panel-table" cellSpacing="0">
          <tbody className="rc-calendar-time-panel-tbody">
          {arr.map((item,index)=>{
            return (<tr key={"tr"+index}>

                        {item.map((m,i)=>{
                          return (
                            <td key={"td"+i} className ="rc-calendar-time-panel-cell">
                                    <a onClick={e=>{self.clickMe(m)}} className={getCellClass(m,current,selected)}>{m}</a>
                                  </td>)
                        })}
                    </tr>);
          })}

          </tbody>
        </table>
      </div>
    </div>);
  }
}

export default Panel;
