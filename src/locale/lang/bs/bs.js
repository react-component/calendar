//language=波斯尼亚文
var iFormat ={
    "eras": [
        "Prije nove ere",
        "Nove ere"
    ],
    "months": [
        "januar",
        "februar",
        "mart",
        "april",
        "maj",
        "juni",
        "juli",
        "august",
        "septembar",
        "oktobar",
        "novembar",
        "decembar"
    ],
    "shortMonths": [
        "jan",
        "feb",
        "mar",
        "apr",
        "maj",
        "jun",
        "jul",
        "aug",
        "sep",
        "okt",
        "nov",
        "dec"
    ],
    "weekdays": [
        "nedjelja",
        "ponedjeljak",
        "utorak",
        "srijeda",
        "četvrtak",
        "petak",
        "subota"
    ],
    "shortWeekdays": [
        "ned",
        "pon",
        "uto",
        "sri",
        "čet",
        "pet",
        "sub"
    ],
    "veryShortWeekdays": [
        "N",
        "P",
        "U",
        "S",
        "Č",
        "P",
        "S"
    ],
    "ampms": [
        "prije podne",
        "popodne"
    ],
    "datePatterns": [
        "EEEE, dd. MMMM y.",
        "dd. MMMM y.",
        "dd.MM.yy.",
        "dd.MM.yy."
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
    "today": "danas",
    "now": "now",
    "ok": "OK",
    "clear": "Clear",
    "month": "mjesec",
    "year": "godina",
    "previousMonth": "prošli mjesec(PageUp)",
    "nextMonth": "sljedeći mjesec(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y.",
    "monthFormat": "M",
    "dateFormat": "dd. MMM y.",
    "previousYear": "prošle godine(Control + left key)",
    "nextYear": "sljedeće godine(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
