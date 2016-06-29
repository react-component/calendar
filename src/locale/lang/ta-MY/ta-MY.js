//language=泰米尔文
//territory=马来西亚
var iFormat ={
    "eras": [
        "கிறிஸ்துவுக்கு முன்",
        "அன்னோ டோமினி"
    ],
    "months": [
        "ஜனவரி",
        "பிப்ரவரி",
        "மார்ச்",
        "ஏப்ரல்",
        "மே",
        "ஜூன்",
        "ஜூலை",
        "ஆகஸ்ட்",
        "செப்டம்பர்",
        "அக்டோபர்",
        "நவம்பர்",
        "டிசம்பர்"
    ],
    "shortMonths": [
        "ஜன.",
        "பிப்.",
        "மார்.",
        "ஏப்.",
        "மே",
        "ஜூன்",
        "ஜூலை",
        "ஆக.",
        "செப்.",
        "அக்.",
        "நவ.",
        "டிச."
    ],
    "weekdays": [
        "ஞாயிறு",
        "திங்கள்",
        "செவ்வாய்",
        "புதன்",
        "வியாழன்",
        "வெள்ளி",
        "சனி"
    ],
    "shortWeekdays": [
        "ஞாயி.",
        "திங்.",
        "செவ்.",
        "புத.",
        "வியா.",
        "வெள்.",
        "சனி"
    ],
    "veryShortWeekdays": [
        "ஞா",
        "தி",
        "செ",
        "பு",
        "வி",
        "வெ",
        "ச"
    ],
    "ampms": [
        "முற்பகல்",
        "பிற்பகல்"
    ],
    "datePatterns": [
        "EEEE, d MMMM, y",
        "d MMMM, y",
        "d/M/yy",
        "d/M/yy"
    ],
    "timePatterns": [
        "a h:mm:ss zzzz",
        "a h:mm:ss z",
        "a h:mm:ss",
        "a h:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "இன்று",
    "now": "இப்போது",
    "ok": "OK",
    "clear": "Clear",
    "month": "மாதம்",
    "year": "ஆண்டு",
    "previousMonth": "கடந்த மாதம்(PageUp)",
    "nextMonth": "அடுத்த மாதம்(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM, y",
    "previousYear": "கடந்த ஆண்டு(Control + left key)",
    "nextYear": "அடுத்த ஆண்டு(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
