//language=加利西亚文
var iFormat ={
    "eras": [
        "antes de Cristo",
        "despois de Cristo"
    ],
    "months": [
        "xaneiro",
        "febreiro",
        "marzo",
        "abril",
        "maio",
        "xuño",
        "xullo",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "decembro"
    ],
    "shortMonths": [
        "xan",
        "feb",
        "mar",
        "abr",
        "mai",
        "xuñ",
        "xul",
        "ago",
        "set",
        "out",
        "nov",
        "dec"
    ],
    "weekdays": [
        "domingo",
        "luns",
        "martes",
        "mércores",
        "xoves",
        "venres",
        "sábado"
    ],
    "shortWeekdays": [
        "dom",
        "luns",
        "mar",
        "mér",
        "xov",
        "ven",
        "sáb"
    ],
    "veryShortWeekdays": [
        "D",
        "L",
        "M",
        "M",
        "X",
        "V",
        "S"
    ],
    "ampms": [
        "a.m.",
        "p.m."
    ],
    "datePatterns": [
        "EEEE dd MMMM y",
        "dd MMMM y",
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
    "today": "hoxe",
    "now": "agora",
    "ok": "OK",
    "clear": "Clear",
    "month": "Mes",
    "year": "Ano",
    "previousMonth": "mes pasado(PageUp)",
    "nextMonth": "mes seguinte(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM, y",
    "previousYear": "ano pasado(Control + left key)",
    "nextYear": "seguinte ano(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
