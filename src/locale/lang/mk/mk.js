//language=马其顿文
var iFormat ={
    "eras": [
        "пред нашата ера",
        "од нашата ера"
    ],
    "months": [
        "јануари",
        "февруари",
        "март",
        "април",
        "мај",
        "јуни",
        "јули",
        "август",
        "септември",
        "октомври",
        "ноември",
        "декември"
    ],
    "shortMonths": [
        "јан.",
        "фев.",
        "мар.",
        "апр.",
        "мај",
        "јун.",
        "јул.",
        "авг.",
        "септ.",
        "окт.",
        "ноем.",
        "дек."
    ],
    "weekdays": [
        "недела",
        "понеделник",
        "вторник",
        "среда",
        "четврток",
        "петок",
        "сабота"
    ],
    "shortWeekdays": [
        "нед.",
        "пон.",
        "вт.",
        "сре.",
        "чет.",
        "пет.",
        "саб."
    ],
    "veryShortWeekdays": [
        "н",
        "п",
        "в",
        "с",
        "ч",
        "п",
        "с"
    ],
    "ampms": [
        "претпладне",
        "попладне"
    ],
    "datePatterns": [
        "EEEE, dd MMMM y",
        "dd MMMM y",
        "dd.M.yy",
        "dd.M.yy"
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
    "today": "денес",
    "now": "сега",
    "ok": "OK",
    "clear": "Clear",
    "month": "месец",
    "year": "година",
    "previousMonth": "минатиот месец(PageUp)",
    "nextMonth": "следниот месец(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y 'г'.",
    "previousYear": "минатата година(Control + left key)",
    "nextYear": "следната година(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
