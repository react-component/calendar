//language=希伯来文
var iFormat ={
    "eras": [
        "לפני הספירה",
        "לספירה"
    ],
    "months": [
        "ינואר",
        "פברואר",
        "מרץ",
        "אפריל",
        "מאי",
        "יוני",
        "יולי",
        "אוגוסט",
        "ספטמבר",
        "אוקטובר",
        "נובמבר",
        "דצמבר"
    ],
    "shortMonths": [
        "ינו׳",
        "פבר׳",
        "מרץ",
        "אפר׳",
        "מאי",
        "יוני",
        "יולי",
        "אוג׳",
        "ספט׳",
        "אוק׳",
        "נוב׳",
        "דצמ׳"
    ],
    "weekdays": [
        "יום ראשון",
        "יום שני",
        "יום שלישי",
        "יום רביעי",
        "יום חמישי",
        "יום שישי",
        "יום שבת"
    ],
    "shortWeekdays": [
        "יום א׳",
        "יום ב׳",
        "יום ג׳",
        "יום ד׳",
        "יום ה׳",
        "יום ו׳",
        "שבת"
    ],
    "veryShortWeekdays": [
        "א׳",
        "ב׳",
        "ג׳",
        "ד׳",
        "ה׳",
        "ו׳",
        "ש׳"
    ],
    "ampms": [
        "לפנה״צ",
        "אחה״צ"
    ],
    "datePatterns": [
        "EEEE, d בMMMM y",
        "d בMMMM y",
        "d.M.y",
        "d.M.y"
    ],
    "timePatterns": [
        "H:mm:ss zzzz",
        "H:mm:ss z",
        "H:mm:ss",
        "H:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "היום",
    "now": "עכשיו",
    "ok": "OK",
    "clear": "Clear",
    "month": "חודש",
    "year": "שנה",
    "previousMonth": "החודש שעבר(PageUp)",
    "nextMonth": "החודש הבא(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d בMMM y",
    "previousYear": "השנה שעברה(Control + left key)",
    "nextYear": "השנה הבאה(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
