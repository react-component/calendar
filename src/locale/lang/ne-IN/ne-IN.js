//language=尼泊尔文
//territory=印度
var iFormat ={
    "eras": [
        "ईसा पूर्व",
        "सन्"
    ],
    "months": [
        "जनवरी",
        "फेब्रुअरी",
        "मार्च",
        "अप्रिल",
        "मई",
        "जुन",
        "जुलाई",
        "अगस्ट",
        "सेप्टेम्बर",
        "अक्टोबर",
        "नोभेम्बर",
        "डिसेम्बर"
    ],
    "shortMonths": [
        "जनवरी",
        "फेब्रुअरी",
        "मार्च",
        "अप्रिल",
        "मे",
        "जुन",
        "जुलाई",
        "अगस्ट",
        "सेप्टेम्बर",
        "अक्टोबर",
        "नोभेम्बर",
        "डिसेम्बर"
    ],
    "weekdays": [
        "आइतबार",
        "सोमबार",
        "मङ्गलबार",
        "बुधबार",
        "बिहिबार",
        "शुक्रबार",
        "शनिबार"
    ],
    "shortWeekdays": [
        "आइत",
        "सोम",
        "मङ्गल",
        "बुध",
        "बिही",
        "शुक्र",
        "शनि"
    ],
    "veryShortWeekdays": [
        "आ",
        "सो",
        "म",
        "बु",
        "बि",
        "शु",
        "श"
    ],
    "ampms": [
        "पूर्वाह्न",
        "अपराह्न"
    ],
    "datePatterns": [
        "y MMMM d, EEEE",
        "y MMMM d",
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
    "today": "आज",
    "now": "अब",
    "ok": "OK",
    "clear": "Clear",
    "month": "महिना",
    "year": "वर्ष",
    "previousMonth": "गएको महिना(PageUp)",
    "nextMonth": "अर्को महिना(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "y MMM d",
    "previousYear": "पहिलो वर्ष(Control + left key)",
    "nextYear": "अर्को वर्ष(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
