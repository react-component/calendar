//language=挪威博克马尔文
var iFormat ={
    "eras": [
        "før Kristus",
        "etter Kristus"
    ],
    "months": [
        "januar",
        "februar",
        "mars",
        "april",
        "mai",
        "juni",
        "juli",
        "august",
        "september",
        "oktober",
        "november",
        "desember"
    ],
    "shortMonths": [
        "jan.",
        "feb.",
        "mar.",
        "apr.",
        "mai",
        "jun.",
        "jul.",
        "aug.",
        "sep.",
        "okt.",
        "nov.",
        "des."
    ],
    "weekdays": [
        "søndag",
        "mandag",
        "tirsdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lørdag"
    ],
    "shortWeekdays": [
        "søn.",
        "man.",
        "tir.",
        "ons.",
        "tor.",
        "fre.",
        "lør."
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "T",
        "O",
        "T",
        "F",
        "L"
    ],
    "ampms": [
        "a.m.",
        "p.m."
    ],
    "datePatterns": [
        "EEEE d. MMMM y",
        "d. MMMM y",
        "dd.MM.y",
        "dd.MM.y"
    ],
    "timePatterns": [
        "HH.mm.ss zzzz",
        "HH.mm.ss z",
        "HH.mm.ss",
        "HH.mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "i dag",
    "now": "nå",
    "ok": "OK",
    "clear": "Clear",
    "month": "måned",
    "year": "år",
    "previousMonth": "forrige måned(PageUp)",
    "nextMonth": "neste måned(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M.",
    "dateFormat": "d. MMM y",
    "previousYear": "i fjor(Control + left key)",
    "nextYear": "neste år(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
