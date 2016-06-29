//language=波斯文
//territory=阿富汗
var iFormat ={
    "eras": [
        "قبل از میلاد",
        "میلادی"
    ],
    "months": [
        "جنوری",
        "فبروری",
        "مارچ",
        "اپریل",
        "می",
        "جون",
        "جولای",
        "اگست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر"
    ],
    "shortMonths": [
        "جنو",
        "فبروری",
        "مارچ",
        "اپریل",
        "می",
        "جون",
        "جول",
        "اگست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسم"
    ],
    "weekdays": [
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه",
        "شنبه"
    ],
    "shortWeekdays": [
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه",
        "شنبه"
    ],
    "veryShortWeekdays": [
        "ی",
        "د",
        "س",
        "چ",
        "پ",
        "ج",
        "ش"
    ],
    "ampms": [
        "قبل‌ازظهر",
        "بعدازظهر"
    ],
    "datePatterns": [
        "EEEE d MMMM y",
        "d MMMM y",
        "y/M/d",
        "y/M/d"
    ],
    "timePatterns": [
        "H:mm:ss (zzzz)",
        "H:mm:ss (z)",
        "H:mm:ss",
        "H:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "امروز",
    "now": "اکنون",
    "ok": "OK",
    "clear": "Clear",
    "month": "ماه",
    "year": "سال",
    "previousMonth": "ماه گذشته(PageUp)",
    "nextMonth": "ماه آینده(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "سال گذشته(Control + left key)",
    "nextYear": "سال آینده(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
