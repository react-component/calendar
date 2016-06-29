//language=乌克兰文
var iFormat ={
    "eras": [
        "до нашої ери",
        "нашої ери"
    ],
    "months": [
        "січня",
        "лютого",
        "березня",
        "квітня",
        "травня",
        "червня",
        "липня",
        "серпня",
        "вересня",
        "жовтня",
        "листопада",
        "грудня"
    ],
    "shortMonths": [
        "січ.",
        "лют.",
        "бер.",
        "квіт.",
        "трав.",
        "черв.",
        "лип.",
        "серп.",
        "вер.",
        "жовт.",
        "лист.",
        "груд."
    ],
    "weekdays": [
        "неділя",
        "понеділок",
        "вівторок",
        "середа",
        "четвер",
        "пʼятниця",
        "субота"
    ],
    "shortWeekdays": [
        "Нд",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб"
    ],
    "veryShortWeekdays": [
        "Н",
        "П",
        "В",
        "С",
        "Ч",
        "П",
        "С"
    ],
    "ampms": [
        "дп",
        "пп"
    ],
    "datePatterns": [
        "EEEE, d MMMM y 'р'.",
        "d MMMM y 'р'.",
        "dd.MM.yy",
        "dd.MM.yy"
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
    "today": "сьогодні",
    "now": "зараз",
    "ok": "OK",
    "clear": "Clear",
    "month": "місяць",
    "year": "рік",
    "previousMonth": "минулого місяця(PageUp)",
    "nextMonth": "наступного місяця(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "MM",
    "dateFormat": "d MMM y",
    "previousYear": "торік(Control + left key)",
    "nextYear": "наступного року(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
