//language=捷克文
var iFormat ={
    "eras": [
        "př. n. l.",
        "n. l."
    ],
    "months": [
        "ledna",
        "února",
        "března",
        "dubna",
        "května",
        "června",
        "července",
        "srpna",
        "září",
        "října",
        "listopadu",
        "prosince"
    ],
    "shortMonths": [
        "led",
        "úno",
        "bře",
        "dub",
        "kvě",
        "čvn",
        "čvc",
        "srp",
        "zář",
        "říj",
        "lis",
        "pro"
    ],
    "weekdays": [
        "neděle",
        "pondělí",
        "úterý",
        "středa",
        "čtvrtek",
        "pátek",
        "sobota"
    ],
    "shortWeekdays": [
        "ne",
        "po",
        "út",
        "st",
        "čt",
        "pá",
        "so"
    ],
    "veryShortWeekdays": [
        "N",
        "P",
        "Ú",
        "S",
        "Č",
        "P",
        "S"
    ],
    "ampms": [
        "dop.",
        "odp."
    ],
    "datePatterns": [
        "EEEE d. MMMM y",
        "d. MMMM y",
        "dd.MM.yy",
        "dd.MM.yy"
    ],
    "timePatterns": [
        "H:mm:ss zzzz",
        "H:mm:ss z",
        "H:mm:ss",
        "H:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "dnes",
    "now": "nyní",
    "ok": "OK",
    "clear": "Clear",
    "month": "měsíc",
    "year": "rok",
    "previousMonth": "minulý měsíc(PageUp)",
    "nextMonth": "příští měsíc(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d. M. y",
    "previousYear": "minulý rok(Control + left key)",
    "nextYear": "příští rok(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
