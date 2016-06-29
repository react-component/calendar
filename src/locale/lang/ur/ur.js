//language=乌尔都文
var iFormat ={
    "eras": [
        "قبل مسیح",
        "عیسوی"
    ],
    "months": [
        "جنوری",
        "فروری",
        "مارچ",
        "اپریل",
        "مئی",
        "جون",
        "جولائی",
        "اگست",
        "ستمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر"
    ],
    "shortMonths": [
        "جنوری",
        "فروری",
        "مارچ",
        "اپریل",
        "مئی",
        "جون",
        "جولائی",
        "اگست",
        "ستمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر"
    ],
    "weekdays": [
        "اتوار",
        "سوموار",
        "منگل",
        "بدھ",
        "جمعرات",
        "جمعہ",
        "ہفتہ"
    ],
    "shortWeekdays": [
        "اتوار",
        "سوموار",
        "منگل",
        "بدھ",
        "جمعرات",
        "جمعہ",
        "ہفتہ"
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
    ],
    "ampms": [
        "قبل دوپہر",
        "بعد دوپہر"
    ],
    "datePatterns": [
        "EEEE، d MMMM، y",
        "d MMMM، y",
        "d/M/yy",
        "d/M/yy"
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
    "today": "آج",
    "now": "اب",
    "ok": "OK",
    "clear": "Clear",
    "month": "مہینہ",
    "year": "سال",
    "previousMonth": "پچھلے مہینہ(PageUp)",
    "nextMonth": "اگلے مہینہ(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM، y",
    "previousYear": "گزشتہ سال(Control + left key)",
    "nextYear": "اگلے سال(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
