//language=保加利亚文
var iFormat ={
    "eras": [
        "преди Христа",
        "след Христа"
    ],
    "months": [
        "януари",
        "февруари",
        "март",
        "април",
        "май",
        "юни",
        "юли",
        "август",
        "септември",
        "октомври",
        "ноември",
        "декември"
    ],
    "shortMonths": [
        "яну",
        "фев",
        "март",
        "апр",
        "май",
        "юни",
        "юли",
        "авг",
        "сеп",
        "окт",
        "ное",
        "дек"
    ],
    "weekdays": [
        "неделя",
        "понеделник",
        "вторник",
        "сряда",
        "четвъртък",
        "петък",
        "събота"
    ],
    "shortWeekdays": [
        "нд",
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб"
    ],
    "veryShortWeekdays": [
        "н",
        "п",
        "в",
        "с",
        "ч",
        "п",
        "с"
    ],
    "ampms": [
        "пр.об.",
        "сл.об."
    ],
    "datePatterns": [
        "EEEE, d MMMM y 'г'.",
        "d MMMM y 'г'.",
        "d.MM.yy 'г'.",
        "d.MM.yy 'г'."
    ],
    "timePatterns": [
        "H:mm:ss zzzz",
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
    "today": "днес",
    "now": "сега",
    "ok": "OK",
    "clear": "Clear",
    "month": "месец",
    "year": "година",
    "previousMonth": "миналият месец(PageUp)",
    "nextMonth": "следващият месец(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y 'г'.",
    "monthFormat": "M",
    "dateFormat": "d.MM.y 'г'.",
    "previousYear": "миналата година(Control + left key)",
    "nextYear": "следващата година(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
