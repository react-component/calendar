//language=阿拉伯文
//territory=卡塔尔
var iFormat ={
    "eras": [
        "قبل الميلاد",
        "ميلادي"
    ],
    "months": [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر"
    ],
    "shortMonths": [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر"
    ],
    "weekdays": [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"
    ],
    "shortWeekdays": [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"
    ],
    "veryShortWeekdays": [
        "ح",
        "ن",
        "ث",
        "ر",
        "خ",
        "ج",
        "س"
    ],
    "ampms": [
        "ص",
        "م"
    ],
    "datePatterns": [
        "EEEE، d MMMM، y",
        "d MMMM، y",
        "d‏/M‏/y",
        "d‏/M‏/y"
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
    "today": "اليوم",
    "now": "الآن",
    "ok": "OK",
    "clear": "Clear",
    "month": "الشهر",
    "year": "السنة",
    "previousMonth": "الشهر الماضي(PageUp)",
    "nextMonth": "الشهر التالي(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM، y",
    "previousYear": "السنة الماضية(Control + left key)",
    "nextYear": "السنة التالية(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
