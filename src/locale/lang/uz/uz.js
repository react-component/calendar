//language=乌兹别克文
var iFormat ={
    "eras": [
        "miloddan avvalgi",
        "milodiy"
    ],
    "months": [
        "yanvar",
        "fevral",
        "mart",
        "aprel",
        "may",
        "iyun",
        "iyul",
        "avgust",
        "Sentabr",
        "Oktabr",
        "noyabr",
        "dekabr"
    ],
    "shortMonths": [
        "yan",
        "fev",
        "mar",
        "apr",
        "may",
        "iyn",
        "iyl",
        "avg",
        "sen",
        "okt",
        "noy",
        "dek"
    ],
    "weekdays": [
        "yakshanba",
        "dushanba",
        "seshanba",
        "chorshanba",
        "payshanba",
        "juma",
        "shanba"
    ],
    "shortWeekdays": [
        "Ya",
        "Du",
        "Se",
        "Ch",
        "Pa",
        "Ju",
        "Sh"
    ],
    "veryShortWeekdays": [
        "Y",
        "D",
        "S",
        "C",
        "P",
        "J",
        "S"
    ],
    "ampms": [
        "TO",
        "TK"
    ],
    "datePatterns": [
        "EEEE, y MMMM dd",
        "d-MMMM, y",
        "dd/MM/yy",
        "dd/MM/yy"
    ],
    "timePatterns": [
        "H:mm:ss (zzzz)",
        "H:mm:ss (z)",
        "HH:mm:ss",
        "HH:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "bugun",
    "now": "hozir",
    "ok": "OK",
    "clear": "Clear",
    "month": "oy",
    "year": "yil",
    "previousMonth": "o‘tgan oy(PageUp)",
    "nextMonth": "keyingi oy(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "MM",
    "dateFormat": "d-MMM, y",
    "previousYear": "oʻtgan yil(Control + left key)",
    "nextYear": "keyingi yil(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
