//language=西班牙文
//territory=巴拉圭
var iFormat ={
    "eras": [
        "antes de Cristo",
        "después de Cristo"
    ],
    "months": [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ],
    "shortMonths": [
        "ene.",
        "feb.",
        "mar.",
        "abr.",
        "may.",
        "jun.",
        "jul.",
        "ago.",
        "sept.",
        "oct.",
        "nov.",
        "dic."
    ],
    "weekdays": [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado"
    ],
    "shortWeekdays": [
        "dom.",
        "lun.",
        "mar.",
        "mié.",
        "jue.",
        "vie.",
        "sáb."
    ],
    "veryShortWeekdays": [
        "d",
        "l",
        "m",
        "m",
        "j",
        "v",
        "s"
    ],
    "ampms": [
        "a.m.",
        "p.m."
    ],
    "datePatterns": [
        "EEEE, d 'de' MMMM 'de' y",
        "d 'de' MMMM 'de' y",
        "d/M/yy",
        "d/M/yy"
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
    "today": "hoy",
    "now": "ahora",
    "ok": "OK",
    "clear": "Clear",
    "month": "mes",
    "year": "año",
    "previousMonth": "el mes pasado(PageUp)",
    "nextMonth": "el próximo mes(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d 'de' MMMM 'de' y",
    "previousYear": "el año pasado(Control + left key)",
    "nextYear": "el próximo año(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
