//language=日文
var iFormat ={
    "eras": [
        "紀元前",
        "西暦"
    ],
    "months": [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
    ],
    "shortMonths": [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
    ],
    "weekdays": [
        "日曜日",
        "月曜日",
        "火曜日",
        "水曜日",
        "木曜日",
        "金曜日",
        "土曜日"
    ],
    "shortWeekdays": [
        "日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土"
    ],
    "veryShortWeekdays": [
        "日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土"
    ],
    "ampms": [
        "午前",
        "午後"
    ],
    "datePatterns": [
        "y年M月d日EEEE",
        "y年M月d日",
        "y/MM/dd",
        "y/MM/dd"
    ],
    "timePatterns": [
        "H時mm分ss秒 zzzz",
        "H:mm:ss z",
        "H:mm:ss",
        "H:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "今日",
    "now": "今すぐ",
    "ok": "OK",
    "clear": "Clear",
    "month": "月",
    "year": "年",
    "previousMonth": "先月(PageUp)",
    "nextMonth": "翌月(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y年",
    "monthFormat": "M月",
    "dateFormat": "y年M月d日",
    "previousYear": "昨年(Control + left key)",
    "nextYear": "翌年(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
