//language=阿姆哈拉文
var iFormat ={
    "eras": [
        "ዓመተ ዓለም",
        "ዓመተ ምሕረት"
    ],
    "months": [
        "ጃንዩወሪ",
        "ፌብሩወሪ",
        "ማርች",
        "ኤፕሪል",
        "ሜይ",
        "ጁን",
        "ጁላይ",
        "ኦገስት",
        "ሴፕቴምበር",
        "ኦክቶበር",
        "ኖቬምበር",
        "ዲሴምበር"
    ],
    "shortMonths": [
        "ጃንዩ",
        "ፌብሩ",
        "ማርች",
        "ኤፕሪ",
        "ሜይ",
        "ጁን",
        "ጁላይ",
        "ኦገስ",
        "ሴፕቴ",
        "ኦክቶ",
        "ኖቬም",
        "ዲሴም"
    ],
    "weekdays": [
        "እሑድ",
        "ሰኞ",
        "ማክሰኞ",
        "ረቡዕ",
        "ሐሙስ",
        "ዓርብ",
        "ቅዳሜ"
    ],
    "shortWeekdays": [
        "እሑድ",
        "ሰኞ",
        "ማክሰ",
        "ረቡዕ",
        "ሐሙስ",
        "ዓርብ",
        "ቅዳሜ"
    ],
    "veryShortWeekdays": [
        "እ",
        "ሰ",
        "ማ",
        "ረ",
        "ሐ",
        "ዓ",
        "ቅ"
    ],
    "ampms": [
        "ጥዋት",
        "ከሰዓት"
    ],
    "datePatterns": [
        "EEEE ፣d MMMM y",
        "d MMMM y",
        "dd/MM/y",
        "dd/MM/y"
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
    "today": "ዛሬ",
    "now": "አሁን",
    "ok": "OK",
    "clear": "Clear",
    "month": "ወር",
    "year": "ዓመት",
    "previousMonth": "ያለፈው ወር(PageUp)",
    "nextMonth": "የሚቀጥለው ወር(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "ያለፈው ዓመት(Control + left key)",
    "nextYear": "የሚቀጥለው ዓመት(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
