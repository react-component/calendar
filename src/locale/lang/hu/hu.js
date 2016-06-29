//language=匈牙利文
var iFormat ={
    "eras": [
        "időszámításunk előtt",
        "időszámításunk szerint"
    ],
    "months": [
        "január",
        "február",
        "március",
        "április",
        "május",
        "június",
        "július",
        "augusztus",
        "szeptember",
        "október",
        "november",
        "december"
    ],
    "shortMonths": [
        "jan.",
        "febr.",
        "márc.",
        "ápr.",
        "máj.",
        "jún.",
        "júl.",
        "aug.",
        "szept.",
        "okt.",
        "nov.",
        "dec."
    ],
    "weekdays": [
        "vasárnap",
        "hétfő",
        "kedd",
        "szerda",
        "csütörtök",
        "péntek",
        "szombat"
    ],
    "shortWeekdays": [
        "V",
        "H",
        "K",
        "Sze",
        "Cs",
        "P",
        "Szo"
    ],
    "veryShortWeekdays": [
        "V",
        "H",
        "K",
        "Sz",
        "Cs",
        "P",
        "Sz"
    ],
    "ampms": [
        "de.",
        "du."
    ],
    "datePatterns": [
        "y. MMMM d., EEEE",
        "y. MMMM d.",
        "y. MM. dd.",
        "y. MM. dd."
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
    "today": "ma",
    "now": "most",
    "ok": "OK",
    "clear": "Clear",
    "month": "hónap",
    "year": "év",
    "previousMonth": "előző hónap(PageUp)",
    "nextMonth": "következő hónap(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y.",
    "monthFormat": "M",
    "dateFormat": "y. MMM d.",
    "previousYear": "előző év(Control + left key)",
    "nextYear": "következő év(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
