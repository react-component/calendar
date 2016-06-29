//language=马拉地文
var iFormat ={
    "eras": [
        "ईसवीसनपूर्व",
        "ईसवीसन"
    ],
    "months": [
        "जानेवारी",
        "फेब्रुवारी",
        "मार्च",
        "एप्रिल",
        "मे",
        "जून",
        "जुलै",
        "ऑगस्ट",
        "सप्टेंबर",
        "ऑक्टोबर",
        "नोव्हेंबर",
        "डिसेंबर"
    ],
    "shortMonths": [
        "जाने",
        "फेब्रु",
        "मार्च",
        "एप्रि",
        "मे",
        "जून",
        "जुलै",
        "ऑग",
        "सप्टें",
        "ऑक्टो",
        "नोव्हें",
        "डिसें"
    ],
    "weekdays": [
        "रविवार",
        "सोमवार",
        "मंगळवार",
        "बुधवार",
        "गुरुवार",
        "शुक्रवार",
        "शनिवार"
    ],
    "shortWeekdays": [
        "रवि",
        "सोम",
        "मंगळ",
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
        "म.पू.",
        "म.उ."
    ],
    "datePatterns": [
        "EEEE, d MMMM, y",
        "d MMMM, y",
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
    "now": "आत्ता",
    "ok": "OK",
    "clear": "Clear",
    "month": "महिना",
    "year": "वर्ष",
    "previousMonth": "मागील महिना(PageUp)",
    "nextMonth": "पुढील महिना(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM, y",
    "previousYear": "मागील वर्ष(Control + left key)",
    "nextYear": "पुढील वर्ष(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
