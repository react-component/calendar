//language=阿塞拜疆文
var iFormat ={
    "eras": [
        "eramızdan əvvəl",
        "eramız"
    ],
    "months": [
        "yanvar",
        "fevral",
        "mart",
        "aprel",
        "may",
        "iyun",
        "iyul",
        "avqust",
        "sentyabr",
        "oktyabr",
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
        "avq",
        "sen",
        "okt",
        "noy",
        "dek"
    ],
    "weekdays": [
        "bazar",
        "bazar ertəsi",
        "çərşənbə axşamı",
        "çərşənbə",
        "cümə axşamı",
        "cümə",
        "şənbə"
    ],
    "shortWeekdays": [
        "B.",
        "B.E.",
        "Ç.A.",
        "Ç.",
        "C.A.",
        "C.",
        "Ş."
    ],
    "veryShortWeekdays": [
        "7",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "d MMMM y, EEEE",
        "d MMMM y",
        "dd.MM.yy",
        "dd.MM.yy"
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
    "today": "bu gün",
    "now": "indi",
    "ok": "OK",
    "clear": "Clear",
    "month": "Ay",
    "year": "İl",
    "previousMonth": "keçən ay(PageUp)",
    "nextMonth": "gələn ay(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "keçən il(Control + left key)",
    "nextYear": "gələn il(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
