//language=加泰罗尼亚文
//territory=意大利
var iFormat ={
    "eras": [
        "abans de Crist",
        "després de Crist"
    ],
    "months": [
        "de gener",
        "de febrer",
        "de març",
        "d’abril",
        "de maig",
        "de juny",
        "de juliol",
        "d’agost",
        "de setembre",
        "d’octubre",
        "de novembre",
        "de desembre"
    ],
    "shortMonths": [
        "gen.",
        "febr.",
        "març",
        "abr.",
        "maig",
        "juny",
        "jul.",
        "ag.",
        "set.",
        "oct.",
        "nov.",
        "des."
    ],
    "weekdays": [
        "diumenge",
        "dilluns",
        "dimarts",
        "dimecres",
        "dijous",
        "divendres",
        "dissabte"
    ],
    "shortWeekdays": [
        "dg.",
        "dl.",
        "dt.",
        "dc.",
        "dj.",
        "dv.",
        "ds."
    ],
    "veryShortWeekdays": [
        "dg",
        "dl",
        "dt",
        "dc",
        "dj",
        "dv",
        "ds"
    ],
    "ampms": [
        "a. m.",
        "p. m."
    ],
    "datePatterns": [
        "EEEE, d MMMM 'de' y",
        "d MMMM 'de' y",
        "d/M/yy",
        "d/M/yy"
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
    "today": "avui",
    "now": "ara",
    "ok": "OK",
    "clear": "Clear",
    "month": "mes",
    "year": "any",
    "previousMonth": "el mes passat(PageUp)",
    "nextMonth": "el mes que ve(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "l’any passat(Control + left key)",
    "nextYear": "l’any que ve(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
