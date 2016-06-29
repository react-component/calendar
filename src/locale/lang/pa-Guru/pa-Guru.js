//language=旁遮普文
var iFormat ={
    "eras": [
        "ਈਸਵੀ ਪੂਰਵ",
        "ਈਸਵੀ ਸੰਨ"
    ],
    "months": [
        "ਜਨਵਰੀ",
        "ਫ਼ਰਵਰੀ",
        "ਮਾਰਚ",
        "ਅਪ੍ਰੈਲ",
        "ਮਈ",
        "ਜੂਨ",
        "ਜੁਲਾਈ",
        "ਅਗਸਤ",
        "ਸਤੰਬਰ",
        "ਅਕਤੂਬਰ",
        "ਨਵੰਬਰ",
        "ਦਸੰਬਰ"
    ],
    "shortMonths": [
        "ਜਨ",
        "ਫ਼ਰ",
        "ਮਾਰਚ",
        "ਅਪ੍ਰੈ",
        "ਮਈ",
        "ਜੂਨ",
        "ਜੁਲਾ",
        "ਅਗ",
        "ਸਤੰ",
        "ਅਕਤੂ",
        "ਨਵੰ",
        "ਦਸੰ"
    ],
    "weekdays": [
        "ਐਤਵਾਰ",
        "ਸੋਮਵਾਰ",
        "ਮੰਗਲਵਾਰ",
        "ਬੁੱਧਵਾਰ",
        "ਵੀਰਵਾਰ",
        "ਸ਼ੁੱਕਰਵਾਰ",
        "ਸ਼ਨਿੱਚਰਵਾਰ"
    ],
    "shortWeekdays": [
        "ਐਤ",
        "ਸੋਮ",
        "ਮੰਗਲ",
        "ਬੁੱਧ",
        "ਵੀਰ",
        "ਸ਼ੁੱਕਰ",
        "ਸ਼ਨਿੱਚਰ"
    ],
    "veryShortWeekdays": [
        "ਐ",
        "ਸੋ",
        "ਮੰ",
        "ਬੁੱ",
        "ਵੀ",
        "ਸ਼ੁੱ",
        "ਸ਼"
    ],
    "ampms": [
        "ਪੂ.ਦੁ.",
        "ਬਾ.ਦੁ."
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
    "today": "ਅੱਜ",
    "now": "ਹੁਣ",
    "ok": "OK",
    "clear": "Clear",
    "month": "ਮਹੀਨਾ",
    "year": "ਸਾਲ",
    "previousMonth": "ਪਿਛਲਾ ਮਹੀਨਾ(PageUp)",
    "nextMonth": "ਅਗਲਾ ਮਹੀਨਾ(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "ਪਿਛਲਾ ਸਾਲ(Control + left key)",
    "nextYear": "ਅਗਲਾ ਸਾਲ(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
