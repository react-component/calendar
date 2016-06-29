//language=印地文
var iFormat ={
    "eras": [
        "ईसा-पूर्व",
        "ईसवी सन"
    ],
    "months": [
        "जनवरी",
        "फ़रवरी",
        "मार्च",
        "अप्रैल",
        "मई",
        "जून",
        "जुलाई",
        "अगस्त",
        "सितंबर",
        "अक्तूबर",
        "नवंबर",
        "दिसंबर"
    ],
    "shortMonths": [
        "जन॰",
        "फ़र॰",
        "मार्च",
        "अप्रैल",
        "मई",
        "जून",
        "जुल॰",
        "अग॰",
        "सित॰",
        "अक्तू॰",
        "नव॰",
        "दिस॰"
    ],
    "weekdays": [
        "रविवार",
        "सोमवार",
        "मंगलवार",
        "बुधवार",
        "गुरुवार",
        "शुक्रवार",
        "शनिवार"
    ],
    "shortWeekdays": [
        "रवि",
        "सोम",
        "मंगल",
        "बुध",
        "गुरु",
        "शुक्र",
        "शनि"
    ],
    "veryShortWeekdays": [
        "र",
        "सो",
        "मं",
        "बु",
        "गु",
        "शु",
        "श"
    ],
    "ampms": [
        "पूर्वाह्न",
        "अपराह्न"
    ],
    "datePatterns": [
        "EEEE, d MMMM y",
        "d MMMM y",
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
    "today": "आज",
    "now": "अब",
    "ok": "OK",
    "clear": "Clear",
    "month": "माह",
    "year": "वर्ष",
    "previousMonth": "पिछला माह(PageUp)",
    "nextMonth": "अगला माह(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "पिछला वर्ष(Control + left key)",
    "nextYear": "अगला वर्ष(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
