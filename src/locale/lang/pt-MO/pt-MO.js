//language=葡萄牙文
//territory=中国澳门特别行政区
var iFormat ={
    "eras": [
        "antes de Cristo",
        "depois de Cristo"
    ],
    "months": [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
    ],
    "shortMonths": [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez"
    ],
    "weekdays": [
        "domingo",
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado"
    ],
    "shortWeekdays": [
        "domingo",
        "segunda",
        "terça",
        "quarta",
        "quinta",
        "sexta",
        "sábado"
    ],
    "veryShortWeekdays": [
        "D",
        "S",
        "T",
        "Q",
        "Q",
        "S",
        "S"
    ],
    "ampms": [
        "da manhã",
        "da tarde"
    ],
    "datePatterns": [
        "EEEE, d 'de' MMMM 'de' y",
        "d 'de' MMMM 'de' y",
        "dd/MM/yy",
        "dd/MM/yy"
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
    "today": "hoje",
    "now": "agora",
    "ok": "OK",
    "clear": "Clear",
    "month": "mês",
    "year": "ano",
    "previousMonth": "mês passado(PageUp)",
    "nextMonth": "próximo mês(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d/MM/y",
    "previousYear": "ano passado(Control + left key)",
    "nextYear": "próximo ano(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
