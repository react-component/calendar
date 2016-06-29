//language=缅甸文
var iFormat ={
    "eras": [
        "ခရစ်တော် မပေါ်မီကာလ",
        "ခရစ်တော် ပေါ်ထွန်းပြီးကာလ"
    ],
    "months": [
        "ဇန်နဝါရီ",
        "ဖေဖော်ဝါရီ",
        "မတ်",
        "ဧပြီ",
        "မေ",
        "ဇွန်",
        "ဇူလိုင်",
        "ဩဂုတ်",
        "စက်တင်ဘာ",
        "အောက်တိုဘာ",
        "နိုဝင်ဘာ",
        "ဒီဇင်ဘာ"
    ],
    "shortMonths": [
        "ဇန်",
        "ဖေ",
        "မတ်",
        "ဧပြီ",
        "မေ",
        "ဇွန်",
        "ဇူ",
        "ဩ",
        "စက်",
        "အောက်",
        "နို",
        "ဒီ"
    ],
    "weekdays": [
        "တနင်္ဂနွေ",
        "တနင်္လာ",
        "အင်္ဂါ",
        "ဗုဒ္ဓဟူး",
        "ကြာသပတေး",
        "သောကြာ",
        "စနေ"
    ],
    "shortWeekdays": [
        "တနင်္ဂနွေ",
        "တနင်္လာ",
        "အင်္ဂါ",
        "ဗုဒ္ဓဟူး",
        "ကြာသပတေး",
        "သောကြာ",
        "စနေ"
    ],
    "veryShortWeekdays": [
        "တ",
        "တ",
        "အ",
        "ဗ",
        "က",
        "သ",
        "စ"
    ],
    "ampms": [
        "နံနက်",
        "ညနေ"
    ],
    "datePatterns": [
        "EEEE၊ dd MMMM y",
        "d MMMM y",
        "dd-MM-yy",
        "dd-MM-yy"
    ],
    "timePatterns": [
        "HH:mm:ss zzzz",
        "HH:mm:ss z",
        "HH:mm:ss",
        "HH:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "ယနေ့",
    "now": "ယခု",
    "ok": "OK",
    "clear": "Clear",
    "month": "လ",
    "year": "နှစ်",
    "previousMonth": "ယမန်လ(PageUp)",
    "nextMonth": "နောက်လ(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "ယမန်နှစ်(Control + left key)",
    "nextYear": "နောက်နှစ်(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
