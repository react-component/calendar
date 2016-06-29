//language=德文
//territory=卢森堡
var iFormat ={
    "eras": [
        "v. Chr.",
        "n. Chr."
    ],
    "months": [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
    ],
    "shortMonths": [
        "Jan.",
        "Feb.",
        "März",
        "Apr.",
        "Mai",
        "Juni",
        "Juli",
        "Aug.",
        "Sep.",
        "Okt.",
        "Nov.",
        "Dez."
    ],
    "weekdays": [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag"
    ],
    "shortWeekdays": [
        "So.",
        "Mo.",
        "Di.",
        "Mi.",
        "Do.",
        "Fr.",
        "Sa."
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "D",
        "M",
        "D",
        "F",
        "S"
    ],
    "ampms": [
        "vorm.",
        "nachm."
    ],
    "datePatterns": [
        "EEEE, d. MMMM y",
        "d. MMMM y",
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
    "today": "heute",
    "now": "jetzt",
    "ok": "OK",
    "clear": "Clear",
    "month": "Monat",
    "year": "Jahr",
    "previousMonth": "letzten Monat(PageUp)",
    "nextMonth": "nächsten Monat(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d. MMM y",
    "previousYear": "letztes Jahr(Control + left key)",
    "nextYear": "nächstes Jahr(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
