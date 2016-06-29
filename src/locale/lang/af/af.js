//language=南非荷兰文
var iFormat ={
    "eras": [
        "voor Christus",
        "na Christus"
    ],
    "months": [
        "Januarie",
        "Februarie",
        "Maart",
        "April",
        "Mei",
        "Junie",
        "Julie",
        "Augustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ],
    "shortMonths": [
        "Jan.",
        "Feb.",
        "Mrt.",
        "Apr.",
        "Mei",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Okt.",
        "Nov.",
        "Des."
    ],
    "weekdays": [
        "Sondag",
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrydag",
        "Saterdag"
    ],
    "shortWeekdays": [
        "So.",
        "Ma.",
        "Di.",
        "Wo.",
        "Do.",
        "Vr.",
        "Sa."
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "D",
        "W",
        "D",
        "V",
        "S"
    ],
    "ampms": [
        "vm.",
        "nm."
    ],
    "datePatterns": [
        "EEEE, dd MMMM y",
        "dd MMMM y",
        "y-MM-dd",
        "y-MM-dd"
    ],
    "timePatterns": [
        "h:mm:ss a zzzz",
        "h:mm:ss a z",
        "h:mm:ss a",
        "h:mm a"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "vandag",
    "now": "nou",
    "ok": "OK",
    "clear": "Clear",
    "month": "Maand",
    "year": "jaar",
    "previousMonth": "verlede maand(PageUp)",
    "nextMonth": "volgende maand(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "verlede jaar(Control + left key)",
    "nextYear": "volgende jaar(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
