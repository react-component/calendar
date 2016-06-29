//language=韩文
//territory=朝鲜
var iFormat ={
    "eras": [
        "기원전",
        "서기"
    ],
    "months": [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
    ],
    "shortMonths": [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
    ],
    "weekdays": [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
    ],
    "shortWeekdays": [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
    ],
    "veryShortWeekdays": [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
    ],
    "ampms": [
        "오전",
        "오후"
    ],
    "datePatterns": [
        "y년 M월 d일 EEEE",
        "y년 M월 d일",
        "yy. M. d.",
        "yy. M. d."
    ],
    "timePatterns": [
        "a h시 m분 s초 zzzz",
        "a h시 m분 s초 z",
        "a h:mm:ss",
        "a h:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "오늘",
    "now": "지금",
    "ok": "OK",
    "clear": "Clear",
    "month": "월",
    "year": "년",
    "previousMonth": "지난달(PageUp)",
    "nextMonth": "다음 달(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y년",
    "monthFormat": "M월",
    "dateFormat": "y년 MMM d일",
    "previousYear": "작년(Control + left key)",
    "nextYear": "내년(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
