//language=威尔士文
var iFormat ={
    "eras": [
        "Cyn Crist",
        "Oed Crist"
    ],
    "months": [
        "Ionawr",
        "Chwefror",
        "Mawrth",
        "Ebrill",
        "Mai",
        "Mehefin",
        "Gorffennaf",
        "Awst",
        "Medi",
        "Hydref",
        "Tachwedd",
        "Rhagfyr"
    ],
    "shortMonths": [
        "Ion",
        "Chwef",
        "Maw",
        "Ebrill",
        "Mai",
        "Meh",
        "Gorff",
        "Awst",
        "Medi",
        "Hyd",
        "Tach",
        "Rhag"
    ],
    "weekdays": [
        "Dydd Sul",
        "Dydd Llun",
        "Dydd Mawrth",
        "Dydd Mercher",
        "Dydd Iau",
        "Dydd Gwener",
        "Dydd Sadwrn"
    ],
    "shortWeekdays": [
        "Sul",
        "Llun",
        "Maw",
        "Mer",
        "Iau",
        "Gwen",
        "Sad"
    ],
    "veryShortWeekdays": [
        "S",
        "Ll",
        "M",
        "M",
        "I",
        "G",
        "S"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, d MMMM y",
        "d MMMM y",
        "dd/MM/yy",
        "dd/MM/yy"
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
    "today": "heddiw",
    "now": "nawr",
    "ok": "OK",
    "clear": "Clear",
    "month": "mis",
    "year": "blwyddyn",
    "previousMonth": "mis diwethaf(PageUp)",
    "nextMonth": "mis nesaf(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "llynedd(Control + left key)",
    "nextYear": "blwyddyn nesaf(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
