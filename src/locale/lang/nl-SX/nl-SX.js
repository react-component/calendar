//language=荷兰文
//territory=荷属圣马丁
var iFormat ={
    "eras": [
        "voor Christus",
        "na Christus"
    ],
    "months": [
        "januari",
        "februari",
        "maart",
        "april",
        "mei",
        "juni",
        "juli",
        "augustus",
        "september",
        "oktober",
        "november",
        "december"
    ],
    "shortMonths": [
        "jan.",
        "feb.",
        "mrt.",
        "apr.",
        "mei",
        "jun.",
        "jul.",
        "aug.",
        "sep.",
        "okt.",
        "nov.",
        "dec."
    ],
    "weekdays": [
        "zondag",
        "maandag",
        "dinsdag",
        "woensdag",
        "donderdag",
        "vrijdag",
        "zaterdag"
    ],
    "shortWeekdays": [
        "zo",
        "ma",
        "di",
        "wo",
        "do",
        "vr",
        "za"
    ],
    "veryShortWeekdays": [
        "Z",
        "M",
        "D",
        "W",
        "D",
        "V",
        "Z"
    ],
    "ampms": [
        "a.m.",
        "p.m."
    ],
    "datePatterns": [
        "EEEE d MMMM y",
        "d MMMM y",
        "dd-MM-yy",
        "dd-MM-yy"
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
    "today": "vandaag",
    "now": "nu",
    "ok": "OK",
    "clear": "Clear",
    "month": "maand",
    "year": "jaar",
    "previousMonth": "vorige maand(PageUp)",
    "nextMonth": "volgende maand(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "vorig jaar(Control + left key)",
    "nextYear": "volgend jaar(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
