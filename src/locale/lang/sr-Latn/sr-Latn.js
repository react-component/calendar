//language=塞尔维亚文
var iFormat ={
    "eras": [
        "pre nove ere",
        "nove ere"
    ],
    "months": [
        "januar",
        "februar",
        "mart",
        "april",
        "maj",
        "jun",
        "jul",
        "avgust",
        "septembar",
        "oktobar",
        "novembar",
        "decembar"
    ],
    "shortMonths": [
        "jan",
        "feb",
        "mar",
        "apr",
        "maj",
        "jun",
        "jul",
        "avg",
        "sep",
        "okt",
        "nov",
        "dec"
    ],
    "weekdays": [
        "nedelja",
        "ponedeljak",
        "utorak",
        "sreda",
        "četvrtak",
        "petak",
        "subota"
    ],
    "shortWeekdays": [
        "ned",
        "pon",
        "uto",
        "sre",
        "čet",
        "pet",
        "sub"
    ],
    "veryShortWeekdays": [
        "n",
        "p",
        "u",
        "s",
        "č",
        "p",
        "s"
    ],
    "ampms": [
        "pre podne",
        "po podne"
    ],
    "datePatterns": [
        "EEEE, dd. MMMM y.",
        "dd. MMMM y.",
        "d.M.yy.",
        "d.M.yy."
    ],
    "timePatterns": [
        "HH.mm.ss zzzz",
        "HH.mm.ss z",
        "HH.mm.ss",
        "HH.mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "danas",
    "now": "sada",
    "ok": "OK",
    "clear": "Clear",
    "month": "mesec",
    "year": "godina",
    "previousMonth": "prošlog meseca(PageUp)",
    "nextMonth": "sledećeg meseca(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y.",
    "monthFormat": "M",
    "dateFormat": "d. MMM y.",
    "previousYear": "prošle godine(Control + left key)",
    "nextYear": "sledeće godine(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
