//language=根语言
var iFormat ={
    "eras": [
        "BCE",
        "CE"
    ],
    "months": [
        "M01",
        "M02",
        "M03",
        "M04",
        "M05",
        "M06",
        "M07",
        "M08",
        "M09",
        "M10",
        "M11",
        "M12"
    ],
    "shortMonths": [
        "M01",
        "M02",
        "M03",
        "M04",
        "M05",
        "M06",
        "M07",
        "M08",
        "M09",
        "M10",
        "M11",
        "M12"
    ],
    "weekdays": [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    "shortWeekdays": [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "y MMMM d, EEEE",
        "y MMMM d",
        "y-MM-dd",
        "y-MM-dd"
    ],
    "timePatterns": [
        "HH:mm:ss zzzz",
        "HH:mm:ss z",
        "HH:mm:ss",
        "HH:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "today",
    "now": "now",
    "ok": "OK",
    "clear": "Clear",
    "month": "Month",
    "year": "Year",
    "previousMonth": "last month(PageUp)",
    "nextMonth": "next month(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "y MMM d",
    "previousYear": "last year(Control + left key)",
    "nextYear": "next year(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
