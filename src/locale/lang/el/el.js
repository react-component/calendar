//language=希腊文
var iFormat ={
    "eras": [
        "προ Χριστού",
        "μετά Χριστόν"
    ],
    "months": [
        "Ιανουαρίου",
        "Φεβρουαρίου",
        "Μαρτίου",
        "Απριλίου",
        "Μαΐου",
        "Ιουνίου",
        "Ιουλίου",
        "Αυγούστου",
        "Σεπτεμβρίου",
        "Οκτωβρίου",
        "Νοεμβρίου",
        "Δεκεμβρίου"
    ],
    "shortMonths": [
        "Ιαν",
        "Φεβ",
        "Μαρ",
        "Απρ",
        "Μαΐ",
        "Ιουν",
        "Ιουλ",
        "Αυγ",
        "Σεπ",
        "Οκτ",
        "Νοε",
        "Δεκ"
    ],
    "weekdays": [
        "Κυριακή",
        "Δευτέρα",
        "Τρίτη",
        "Τετάρτη",
        "Πέμπτη",
        "Παρασκευή",
        "Σάββατο"
    ],
    "shortWeekdays": [
        "Κυρ",
        "Δευ",
        "Τρί",
        "Τετ",
        "Πέμ",
        "Παρ",
        "Σάβ"
    ],
    "veryShortWeekdays": [
        "Κ",
        "Δ",
        "Τ",
        "Τ",
        "Π",
        "Π",
        "Σ"
    ],
    "ampms": [
        "π.μ.",
        "μ.μ."
    ],
    "datePatterns": [
        "EEEE, d MMMM y",
        "d MMMM y",
        "d/M/yy",
        "d/M/yy"
    ],
    "timePatterns": [
        "h:mm:ss a zzzz",
        "h:mm:ss a z",
        "h:mm:ss a",
        "h:mm a"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "σήμερα",
    "now": "τώρα",
    "ok": "OK",
    "clear": "Clear",
    "month": "μήνας",
    "year": "έτος",
    "previousMonth": "προηγούμενος μήνας(PageUp)",
    "nextMonth": "επόμενος μήνας(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "πέρσι(Control + left key)",
    "nextYear": "επόμενο έτος(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
