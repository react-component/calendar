//language=拉脱维亚文
var iFormat ={
    "eras": [
        "pirms mūsu ēras",
        "mūsu ērā"
    ],
    "months": [
        "janvāris",
        "februāris",
        "marts",
        "aprīlis",
        "maijs",
        "jūnijs",
        "jūlijs",
        "augusts",
        "septembris",
        "oktobris",
        "novembris",
        "decembris"
    ],
    "shortMonths": [
        "janv.",
        "febr.",
        "marts",
        "apr.",
        "maijs",
        "jūn.",
        "jūl.",
        "aug.",
        "sept.",
        "okt.",
        "nov.",
        "dec."
    ],
    "weekdays": [
        "svētdiena",
        "pirmdiena",
        "otrdiena",
        "trešdiena",
        "ceturtdiena",
        "piektdiena",
        "sestdiena"
    ],
    "shortWeekdays": [
        "Sv",
        "Pr",
        "Ot",
        "Tr",
        "Ce",
        "Pk",
        "Se"
    ],
    "veryShortWeekdays": [
        "S",
        "P",
        "O",
        "T",
        "C",
        "P",
        "S"
    ],
    "ampms": [
        "priekšpusdienā",
        "pēcpusdienā"
    ],
    "datePatterns": [
        "EEEE, y. 'gada' d. MMMM",
        "y. 'gada' d. MMMM",
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
    "today": "šodien",
    "now": "tagad",
    "ok": "OK",
    "clear": "Clear",
    "month": "mēnesis",
    "year": "gads",
    "previousMonth": "pagājušajā mēnesī(PageUp)",
    "nextMonth": "nākamajā mēnesī(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y. 'g'.",
    "monthFormat": "M",
    "dateFormat": "y. 'g'. d. MMM",
    "previousYear": "pagājušajā gadā(Control + left key)",
    "nextYear": "nākamajā gadā(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
