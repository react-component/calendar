//language=瑞典文
//territory=芬兰
var iFormat ={
    "eras": [
        "före Kristus",
        "efter Kristus"
    ],
    "months": [
        "januari",
        "februari",
        "mars",
        "april",
        "maj",
        "juni",
        "juli",
        "augusti",
        "september",
        "oktober",
        "november",
        "december"
    ],
    "shortMonths": [
        "jan.",
        "feb.",
        "mars",
        "apr.",
        "maj",
        "juni",
        "juli",
        "aug.",
        "sep.",
        "okt.",
        "nov.",
        "dec."
    ],
    "weekdays": [
        "söndag",
        "måndag",
        "tisdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lördag"
    ],
    "shortWeekdays": [
        "sön",
        "mån",
        "tis",
        "ons",
        "tors",
        "fre",
        "lör"
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
        "fm",
        "em"
    ],
    "datePatterns": [
        "EEEE d MMMM y",
        "d MMMM y",
        "dd-MM-y",
        "dd-MM-y"
    ],
    "timePatterns": [
        "'kl'. HH:mm:ss zzzz",
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
    "today": "i dag",
    "now": "nu",
    "ok": "OK",
    "clear": "Clear",
    "month": "månad",
    "year": "år",
    "previousMonth": "förra månaden(PageUp)",
    "nextMonth": "nästa månad(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "i fjol(Control + left key)",
    "nextYear": "nästa år(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
