//language=斯洛文尼亚文
var iFormat ={
    "eras": [
        "pred Kristusom",
        "naše štetje"
    ],
    "months": [
        "januar",
        "februar",
        "marec",
        "april",
        "maj",
        "junij",
        "julij",
        "avgust",
        "september",
        "oktober",
        "november",
        "december"
    ],
    "shortMonths": [
        "jan.",
        "feb.",
        "mar.",
        "apr.",
        "maj",
        "jun.",
        "jul.",
        "avg.",
        "sep.",
        "okt.",
        "nov.",
        "dec."
    ],
    "weekdays": [
        "nedelja",
        "ponedeljek",
        "torek",
        "sreda",
        "četrtek",
        "petek",
        "sobota"
    ],
    "shortWeekdays": [
        "ned.",
        "pon.",
        "tor.",
        "sre.",
        "čet.",
        "pet.",
        "sob."
    ],
    "veryShortWeekdays": [
        "n",
        "p",
        "t",
        "s",
        "č",
        "p",
        "s"
    ],
    "ampms": [
        "dop.",
        "pop."
    ],
    "datePatterns": [
        "EEEE, dd. MMMM y",
        "dd. MMMM y",
        "d. MM. yy",
        "d. MM. yy"
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
    "today": "danes",
    "now": "zdaj",
    "ok": "OK",
    "clear": "Clear",
    "month": "mesec",
    "year": "leto",
    "previousMonth": "prejšnji mesec(PageUp)",
    "nextMonth": "naslednji mesec(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d. MMM y",
    "previousYear": "lani(Control + left key)",
    "nextYear": "naslednje leto(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
