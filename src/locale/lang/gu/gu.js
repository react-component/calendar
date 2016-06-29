//language=古吉拉特文
var iFormat ={
    "eras": [
        "ઈસવીસન પૂર્વે",
        "ઇસવીસન"
    ],
    "months": [
        "જાન્યુઆરી",
        "ફેબ્રુઆરી",
        "માર્ચ",
        "એપ્રિલ",
        "મે",
        "જૂન",
        "જુલાઈ",
        "ઑગસ્ટ",
        "સપ્ટેમ્બર",
        "ઑક્ટોબર",
        "નવેમ્બર",
        "ડિસેમ્બર"
    ],
    "shortMonths": [
        "જાન્યુ",
        "ફેબ્રુ",
        "માર્ચ",
        "એપ્રિલ",
        "મે",
        "જૂન",
        "જુલાઈ",
        "ઑગસ્ટ",
        "સપ્ટે",
        "ઑક્ટો",
        "નવે",
        "ડિસે"
    ],
    "weekdays": [
        "રવિવાર",
        "સોમવાર",
        "મંગળવાર",
        "બુધવાર",
        "ગુરુવાર",
        "શુક્રવાર",
        "શનિવાર"
    ],
    "shortWeekdays": [
        "રવિ",
        "સોમ",
        "મંગળ",
        "બુધ",
        "ગુરુ",
        "શુક્ર",
        "શનિ"
    ],
    "veryShortWeekdays": [
        "ર",
        "સો",
        "મં",
        "બુ",
        "ગુ",
        "શુ",
        "શ"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, d MMMM, y",
        "d MMMM, y",
        "d/M/yy",
        "d/M/yy"
    ],
    "timePatterns": [
        "hh:mm:ss a zzzz",
        "hh:mm:ss a z",
        "hh:mm:ss a",
        "hh:mm a"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "આજે",
    "now": "હમણાં",
    "ok": "OK",
    "clear": "Clear",
    "month": "મહિનો",
    "year": "વર્ષ",
    "previousMonth": "ગયા મહિને(PageUp)",
    "nextMonth": "આવતા મહિને(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM, y",
    "previousYear": "ગયા વર્ષે(Control + left key)",
    "nextYear": "આવતા વર્ષે(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
