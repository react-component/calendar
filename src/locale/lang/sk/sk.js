//language=斯洛伐克文
var iFormat ={
    "eras": [
        "pred Kristom",
        "po Kristovi"
    ],
    "months": [
        "januára",
        "februára",
        "marca",
        "apríla",
        "mája",
        "júna",
        "júla",
        "augusta",
        "septembra",
        "októbra",
        "novembra",
        "decembra"
    ],
    "shortMonths": [
        "jan",
        "feb",
        "mar",
        "apr",
        "máj",
        "jún",
        "júl",
        "aug",
        "sep",
        "okt",
        "nov",
        "dec"
    ],
    "weekdays": [
        "nedeľa",
        "pondelok",
        "utorok",
        "streda",
        "štvrtok",
        "piatok",
        "sobota"
    ],
    "shortWeekdays": [
        "ne",
        "po",
        "ut",
        "st",
        "št",
        "pi",
        "so"
    ],
    "veryShortWeekdays": [
        "n",
        "p",
        "u",
        "s",
        "š",
        "p",
        "s"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, d. MMMM y",
        "d. MMMM y",
        "d.M.yy",
        "d.M.yy"
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
    "now": "teraz",
    "ok": "OK",
    "clear": "Clear",
    "month": "mesiac",
    "year": "rok",
    "previousMonth": "minulý mesiac(PageUp)",
    "nextMonth": "budúci mesiac(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M.",
    "dateFormat": "d. M. y",
    "previousYear": "minulý rok(Control + left key)",
    "nextYear": "budúci rok(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
