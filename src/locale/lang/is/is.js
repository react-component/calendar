//language=冰岛文
var iFormat ={
    "eras": [
        "fyrir Krist",
        "eftir Krist"
    ],
    "months": [
        "janúar",
        "febrúar",
        "mars",
        "apríl",
        "maí",
        "júní",
        "júlí",
        "ágúst",
        "september",
        "október",
        "nóvember",
        "desember"
    ],
    "shortMonths": [
        "jan.",
        "feb.",
        "mar.",
        "apr.",
        "maí",
        "jún.",
        "júl.",
        "ágú.",
        "sep.",
        "okt.",
        "nóv.",
        "des."
    ],
    "weekdays": [
        "sunnudagur",
        "mánudagur",
        "þriðjudagur",
        "miðvikudagur",
        "fimmtudagur",
        "föstudagur",
        "laugardagur"
    ],
    "shortWeekdays": [
        "sun.",
        "mán.",
        "þri.",
        "mið.",
        "fim.",
        "fös.",
        "lau."
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "Þ",
        "M",
        "F",
        "F",
        "L"
    ],
    "ampms": [
        "f.h.",
        "e.h."
    ],
    "datePatterns": [
        "EEEE, d. MMMM y",
        "d. MMMM y",
        "d.M.y",
        "d.M.y"
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
    "today": "í dag",
    "now": "núna",
    "ok": "OK",
    "clear": "Clear",
    "month": "mánuður",
    "year": "ár",
    "previousMonth": "í síðasta mánuði(PageUp)",
    "nextMonth": "í næsta mánuði(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d. MMM y",
    "previousYear": "á síðasta ári(Control + left key)",
    "nextYear": "á næsta ári(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
