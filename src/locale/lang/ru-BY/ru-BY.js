//language=俄文
//territory=白俄罗斯
var iFormat ={
    "eras": [
        "до Рождества Христова",
        "от Рождества Христова"
    ],
    "months": [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ],
    "shortMonths": [
        "янв.",
        "февр.",
        "мар.",
        "апр.",
        "мая",
        "июн.",
        "июл.",
        "авг.",
        "сент.",
        "окт.",
        "нояб.",
        "дек."
    ],
    "weekdays": [
        "воскресенье",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота"
    ],
    "shortWeekdays": [
        "вс",
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб"
    ],
    "veryShortWeekdays": [
        "вс",
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб"
    ],
    "ampms": [
        "ДП",
        "ПП"
    ],
    "datePatterns": [
        "EEEE, d MMMM y 'г'.",
        "d MMMM y 'г'.",
        "dd.MM.yy",
        "dd.MM.yy"
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
    "today": "сегодня",
    "now": "сейчас",
    "ok": "OK",
    "clear": "Clear",
    "month": "месяц",
    "year": "год",
    "previousMonth": "в прошлом месяце(PageUp)",
    "nextMonth": "в следующем месяце(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y 'г'.",
    "previousYear": "в прошлом году(Control + left key)",
    "nextYear": "в следующем году(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
