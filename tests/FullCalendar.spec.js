/* eslint-disable no-undef */
import React from 'react';
import Select from 'rc-select';
import { render } from 'enzyme';
import moment from 'moment';
import FullCalendar from '../src/FullCalendar';
import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';

describe('FullCalendar', () => {
  it('render correctly', () => {
    const zhWrapper = render(
      <FullCalendar
        type="month"
        Select={Select}
        locale={zhCN}
        defaultValue={moment().locale('zh-cn')}
      />
    );
    expect(zhWrapper).toMatchSnapshot();

    const enWrapper = render(
      <FullCalendar
        type="month"
        Select={Select}
        locale={enUS}
        defaultValue={moment().locale('en')}
      />
    );
    expect(enWrapper).toMatchSnapshot();
  });
});
