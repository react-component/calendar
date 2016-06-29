//language=斯瓦希里文
//territory=刚果（金）
var iFormat ={
    "eras": [
        "Kabla ya Kristo",
        "Baada ya Kristo"
    ],
    "months": [
        "mwezi ya kwanja",
        "mwezi ya pili",
        "mwezi ya tatu",
        "mwezi ya ine",
        "mwezi ya tanu",
        "mwezi ya sita",
        "mwezi ya saba",
        "mwezi ya munane",
        "mwezi ya tisa",
        "mwezi ya kumi",
        "mwezi ya kumi na moya",
        "mwezi ya kumi ya mbili"
    ],
    "shortMonths": [
        "mkw",
        "mpi",
        "mtu",
        "min",
        "mtn",
        "mst",
        "msb",
        "mun",
        "mts",
        "mku",
        "mkm",
        "mkb"
    ],
    "weekdays": [
        "siku ya yenga",
        "siku ya kwanza",
        "siku ya pili",
        "siku ya tatu",
        "siku ya ine",
        "siku ya tanu",
        "siku ya sita"
    ],
    "shortWeekdays": [
        "yen",
        "kwa",
        "pil",
        "tat",
        "ine",
        "tan",
        "sit"
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
        "ya asubuyi",
        "ya muchana"
    ],
    "datePatterns": [
        "EEEE d MMMM y",
        "d MMMM y",
        "d/M/y",
        "d/M/y"
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
