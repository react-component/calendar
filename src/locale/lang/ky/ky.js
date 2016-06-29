//language=吉尔吉斯文
var iFormat ={
    "eras": [
        "биздин заманга чейин",
        "биздин заман"
    ],
    "months": [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь"
    ],
    "shortMonths": [
        "янв.",
        "фев.",
        "мар.",
        "апр.",
        "май",
        "июн.",
        "июл.",
        "авг.",
        "сен.",
        "окт.",
        "ноя.",
        "дек."
    ],
    "weekdays": [
        "жекшемби",
        "дүйшөмбү",
        "шейшемби",
        "шаршемби",
        "бейшемби",
        "жума",
        "ишемби"
    ],
    "shortWeekdays": [
        "жек.",
        "дүй.",
        "шейш.",
        "шарш.",
        "бейш.",
        "жума",
        "ишм."
    ],
    "veryShortWeekdays": [
        "Ж",
        "Д",
        "Ш",
        "Ш",
        "Б",
        "Ж",
        "И"
    ],
    "ampms": [
        "таңкы",
        "түштөн кийинки"
    ],
    "datePatterns": [
        "EEEE, d-MMMM, y-'ж'.",
        "y MMMM d",
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
    "today": "бүгүн",
    "now": "азыр",
    "ok": "OK",
    "clear": "Clear",
    "month": "ай",
    "year": "жыл",
    "previousMonth": "өткөн айда(PageUp)",
    "nextMonth": "эмдиги айда(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "y-'ж'. d-MMM",
    "previousYear": "былтыр(Control + left key)",
    "nextYear": "эмдиги жылы(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
