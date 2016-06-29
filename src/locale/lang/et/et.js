//language=爱沙尼亚文
var iFormat ={
    "eras": [
        "enne Kristust",
        "pärast Kristust"
    ],
    "months": [
        "jaanuar",
        "veebruar",
        "märts",
        "aprill",
        "mai",
        "juuni",
        "juuli",
        "august",
        "september",
        "oktoober",
        "november",
        "detsember"
    ],
    "shortMonths": [
        "jaan",
        "veebr",
        "märts",
        "apr",
        "mai",
        "juuni",
        "juuli",
        "aug",
        "sept",
        "okt",
        "nov",
        "dets"
    ],
    "weekdays": [
        "pühapäev",
        "esmaspäev",
        "teisipäev",
        "kolmapäev",
        "neljapäev",
        "reede",
        "laupäev"
    ],
    "shortWeekdays": [
        "P",
        "E",
        "T",
        "K",
        "N",
        "R",
        "L"
    ],
    "veryShortWeekdays": [
        "P",
        "E",
        "T",
        "K",
        "N",
        "R",
        "L"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, d. MMMM y",
        "d. MMMM y",
        "dd.MM.yy",
        "dd.MM.yy"
    ],
    "timePatterns": [
        "H:mm.ss zzzz",
        "H:mm.ss z",
        "H:mm.ss",
        "H:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "täna",
    "now": "nüüd",
    "ok": "OK",
    "clear": "Clear",
    "month": "kuu",
    "year": "aasta",
    "previousMonth": "eelmine kuu(PageUp)",
    "nextMonth": "järgmine kuu(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d. MMM y",
    "previousYear": "eelmine aasta(Control + left key)",
    "nextYear": "järgmine aasta(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
