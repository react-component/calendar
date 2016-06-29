//language=中文
//territory=中国香港特别行政区
var iFormat ={
    "eras": [
        "公元前",
        "公元"
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
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    ],
    "shortWeekdays": [
        "週日",
        "週一",
        "週二",
        "週三",
        "週四",
        "週五",
        "週六"
    ],
    "veryShortWeekdays": [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
    ],
    "ampms": [
        "上午",
        "下午"
    ],
    "datePatterns": [
        "y年M月d日EEEE",
        "y年M月d日",
        "d/M/y",
        "d/M/y"
    ],
    "timePatterns": [
        "ah:mm:ss [zzzz]",
        "ah:mm:ss [z]",
        "ah:mm:ss",
        "ah:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "今日",
    "now": "現在",
    "ok": "OK",
    "clear": "Clear",
    "month": "月",
    "year": "年",
    "previousMonth": "上個月(PageUp)",
    "nextMonth": "下個月(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y年",
    "monthFormat": "M月",
    "dateFormat": "y年M月d日",
    "previousYear": "上年(Control + left key)",
    "nextYear": "下年(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
