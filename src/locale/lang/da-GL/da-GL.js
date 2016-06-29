//language=丹麦文
//territory=格陵兰
var iFormat ={
    "eras": [
        "f.Kr.",
        "e.Kr."
    ],
    "months": [
        "januar",
        "februar",
        "marts",
        "april",
        "maj",
        "juni",
        "juli",
        "august",
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
        "aug.",
        "sep.",
        "okt.",
        "nov.",
        "dec."
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
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE 'den' d. MMMM y",
        "d. MMMM y",
        "dd/MM/y",
        "dd/MM/y"
    ],
    "timePatterns": [
        "h.mm.ss a zzzz",
        "h.mm.ss a z",
        "h.mm.ss a",
        "h.mm a"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "i dag",
    "now": "nu",
    "ok": "OK",
    "clear": "Clear",
    "month": "måned",
    "year": "år",
    "previousMonth": "sidste måned(PageUp)",
    "nextMonth": "næste måned(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d. MMM y",
    "previousYear": "sidste år(Control + left key)",
    "nextYear": "næste år(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
