//language=哈萨克文
var iFormat ={
    "eras": [
        "Біздің заманымызға дейін",
        "Біздің заманымыз"
    ],
    "months": [
        "қаңтар",
        "ақпан",
        "наурыз",
        "сәуір",
        "мамыр",
        "маусым",
        "шілде",
        "тамыз",
        "қыркүйек",
        "қазан",
        "қараша",
        "желтоқсан"
    ],
    "shortMonths": [
        "қаң.",
        "ақп.",
        "нау.",
        "сәу.",
        "мам.",
        "мау.",
        "шіл.",
        "там.",
        "қыр.",
        "қаз.",
        "қар.",
        "жел."
    ],
    "weekdays": [
        "жексенбі",
        "дүйсенбі",
        "сейсенбі",
        "сәрсенбі",
        "бейсенбі",
        "жұма",
        "сенбі"
    ],
    "shortWeekdays": [
        "Жс",
        "Дс",
        "Сс",
        "Ср",
        "Бс",
        "Жм",
        "Сб"
    ],
    "veryShortWeekdays": [
        "Ж",
        "Д",
        "С",
        "С",
        "Б",
        "Ж",
        "С"
    ],
    "ampms": [
        "таңғы",
        "түскі/кешкі"
    ],
    "datePatterns": [
        "y 'ж'. d MMMM, EEEE",
        "y 'ж'. d MMMM",
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
    "today": "бүгін",
    "now": "қазір",
    "ok": "OK",
    "clear": "Clear",
    "month": "ай",
    "year": "жыл",
    "previousMonth": "өткен ай(PageUp)",
    "nextMonth": "келесі ай(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "y 'ж'. d MMM",
    "previousYear": "былтырғы жыл(Control + left key)",
    "nextYear": "келесі жыл(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
