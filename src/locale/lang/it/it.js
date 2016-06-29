//language=意大利文
var iFormat ={
    "eras": [
        "a.C.",
        "d.C."
    ],
    "months": [
        "gennaio",
        "febbraio",
        "marzo",
        "aprile",
        "maggio",
        "giugno",
        "luglio",
        "agosto",
        "settembre",
        "ottobre",
        "novembre",
        "dicembre"
    ],
    "shortMonths": [
        "gen",
        "feb",
        "mar",
        "apr",
        "mag",
        "giu",
        "lug",
        "ago",
        "set",
        "ott",
        "nov",
        "dic"
    ],
    "weekdays": [
        "domenica",
        "lunedì",
        "martedì",
        "mercoledì",
        "giovedì",
        "venerdì",
        "sabato"
    ],
    "shortWeekdays": [
        "dom",
        "lun",
        "mar",
        "mer",
        "gio",
        "ven",
        "sab"
    ],
    "veryShortWeekdays": [
        "D",
        "L",
        "M",
        "M",
        "G",
        "V",
        "S"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE d MMMM y",
        "d MMMM y",
        "dd/MM/yy",
        "dd/MM/yy"
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
    "today": "oggi",
    "now": "ora",
    "ok": "OK",
    "clear": "Clear",
    "month": "mese",
    "year": "anno",
    "previousMonth": "mese scorso(PageUp)",
    "nextMonth": "mese prossimo(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "anno scorso(Control + left key)",
    "nextYear": "anno prossimo(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
