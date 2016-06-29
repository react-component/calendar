//language=法罗文
var iFormat ={
    "eras": [
        "fyri Krist",
        "eftir Krist"
    ],
    "months": [
        "januar",
        "februar",
        "mars",
        "apríl",
        "mai",
        "juni",
        "juli",
        "august",
        "september",
        "oktober",
        "november",
        "desember"
    ],
    "shortMonths": [
        "jan.",
        "feb.",
        "mar.",
        "apr.",
        "mai",
        "jun.",
        "jul.",
        "aug.",
        "sep.",
        "okt.",
        "nov.",
        "des."
    ],
    "weekdays": [
        "sunnudagur",
        "mánadagur",
        "týsdagur",
        "mikudagur",
        "hósdagur",
        "fríggjadagur",
        "leygardagur"
    ],
    "shortWeekdays": [
        "sun.",
        "mán.",
        "týs.",
        "mik.",
        "hós.",
        "frí.",
        "ley."
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "T",
        "M",
        "H",
        "F",
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
    "today": "í dag",
    "now": "now",
    "ok": "OK",
    "clear": "Clear",
    "month": "mánaður",
    "year": "ár",
    "previousMonth": "seinasta mánað(PageUp)",
    "nextMonth": "næsta mánað(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "MM",
    "dateFormat": "d. MMM y",
    "previousYear": "í fjør(Control + left key)",
    "nextYear": "næsta ár(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
