//language=斯瓦希里文
//territory=乌干达
var iFormat ={
    "eras": [
        "Kabla ya Kristo",
        "Baada ya Kristo"
    ],
    "months": [
        "Januari",
        "Februari",
        "Machi",
        "Aprili",
        "Mei",
        "Juni",
        "Julai",
        "Agosti",
        "Septemba",
        "Oktoba",
        "Novemba",
        "Desemba"
    ],
    "shortMonths": [
        "Jan",
        "Feb",
        "Mac",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Okt",
        "Nov",
        "Des"
    ],
    "weekdays": [
        "Jumapili",
        "Jumatatu",
        "Jumanne",
        "Jumatano",
        "Alhamisi",
        "Ijumaa",
        "Jumamosi"
    ],
    "shortWeekdays": [
        "Jumapili",
        "Jumatatu",
        "Jumanne",
        "Jumatano",
        "Alhamisi",
        "Ijumaa",
        "Jumamosi"
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, d MMMM y",
        "d MMMM y",
        "dd/MM/y",
        "dd/MM/y"
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
    "today": "leo",
    "now": "sasa",
    "ok": "OK",
    "clear": "Clear",
    "month": "Mwezi",
    "year": "Mwaka",
    "previousMonth": "mwezi uliopita(PageUp)",
    "nextMonth": "mwezi ujao(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "mwaka uliopita(Control + left key)",
    "nextYear": "mwaka ujao(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
