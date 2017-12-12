/* eslint react/no-multi-comp:0, no-console:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import TbCalendar from "../src/TbCalendar";

ReactDOM.render((<TbCalendar showTime={true} format="YYYY-MM-DD HH:mm:ss"/>

                ), document.getElementById('__react-content'));
