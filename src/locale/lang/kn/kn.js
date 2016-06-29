//language=卡纳达文
var iFormat ={
    "eras": [
        "ಕ್ರಿಸ್ತ ಪೂರ್ವ",
        "ಕ್ರಿಸ್ತ ಶಕ"
    ],
    "months": [
        "ಜನವರಿ",
        "ಫೆಬ್ರವರಿ",
        "ಮಾರ್ಚ್",
        "ಏಪ್ರಿಲ್",
        "ಮೇ",
        "ಜೂನ್",
        "ಜುಲೈ",
        "ಆಗಸ್ಟ್",
        "ಸೆಪ್ಟೆಂಬರ್",
        "ಅಕ್ಟೋಬರ್",
        "ನವೆಂಬರ್",
        "ಡಿಸೆಂಬರ್"
    ],
    "shortMonths": [
        "ಜನ",
        "ಫೆಬ್ರ",
        "ಮಾರ್ಚ್",
        "ಏಪ್ರಿ",
        "ಮೇ",
        "ಜೂನ್",
        "ಜುಲೈ",
        "ಆಗ",
        "ಸೆಪ್ಟೆಂ",
        "ಅಕ್ಟೋ",
        "ನವೆಂ",
        "ಡಿಸೆಂ"
    ],
    "weekdays": [
        "ಭಾನುವಾರ",
        "ಸೋಮವಾರ",
        "ಮಂಗಳವಾರ",
        "ಬುಧವಾರ",
        "ಗುರುವಾರ",
        "ಶುಕ್ರವಾರ",
        "ಶನಿವಾರ"
    ],
    "shortWeekdays": [
        "ಭಾನು",
        "ಸೋಮ",
        "ಮಂಗಳ",
        "ಬುಧ",
        "ಗುರು",
        "ಶುಕ್ರ",
        "ಶನಿ"
    ],
    "veryShortWeekdays": [
        "ಭಾ",
        "ಸೋ",
        "ಮಂ",
        "ಬು",
        "ಗು",
        "ಶು",
        "ಶ"
    ],
    "ampms": [
        "ಪೂರ್ವಾಹ್ನ",
        "ಅಪರಾಹ್ನ"
    ],
    "datePatterns": [
        "EEEE, MMMM d, y",
        "MMMM d, y",
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
    "today": "ಇಂದು",
    "now": "ಇದೀಗ",
    "ok": "OK",
    "clear": "Clear",
    "month": "ತಿಂಗಳು",
    "year": "ವರ್ಷ",
    "previousMonth": "ಕಳೆದ ತಿಂಗಳು(PageUp)",
    "nextMonth": "ಮುಂದಿನ ತಿಂಗಳು(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "MMM d,y",
    "previousYear": "ಕಳೆದ ವರ್ಷ(Control + left key)",
    "nextYear": "ಮುಂದಿನ ವರ್ಷ(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
