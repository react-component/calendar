/* eslint react/no-multi-comp:0, no-console:0 */
import React from 'react';
import ReactDOM from 'react-dom';

import TbCalendar from "../src/TbCalendar";

ReactDOM.render((<div
  style={{
    zIndex: 1000,
    position: 'relative',
    width: 900,
    margin: '20px auto',
  }}
>
  <div>
    <div style={{ float: 'left', width: 300 }}>
      <TbCalendar showTime={true} defaultValue="2017-12-31 12:01:02" format="YYYY-MM-DD HH:mm:ss"/>
    </div>
  </div>
</div>), document.getElementById('__react-content'));
