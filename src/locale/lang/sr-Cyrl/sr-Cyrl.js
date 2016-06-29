//language=塞尔维亚文
var iFormat ={
    "eras": [
        "пре нове ере",
        "нове ере"
    ],
    "months": [
        "јануар",
        "фебруар",
        "март",
        "април",
        "мај",
        "јун",
        "јул",
        "август",
        "септембар",
        "октобар",
        "новембар",
        "децембар"
    ],
    "shortMonths": [
        "јан",
        "феб",
        "мар",
        "апр",
        "мај",
        "јун",
        "јул",
        "авг",
        "сеп",
        "окт",
        "нов",
        "дец"
    ],
    "weekdays": [
        "недеља",
        "понедељак",
        "уторак",
        "среда",
        "четвртак",
        "петак",
        "субота"
    ],
    "shortWeekdays": [
        "нед",
        "пон",
        "уто",
        "сре",
        "чет",
        "пет",
        "суб"
    ],
    "veryShortWeekdays": [
        "н",
        "п",
        "у",
        "с",
        "ч",
        "п",
        "с"
    ],
    "ampms": [
        "пре подне",
        "по подне"
    ],
    "datePatterns": [
        "EEEE, dd. MMMM y.",
        "dd. MMMM y.",
        "d.M.yy.",
        "d.M.yy."
    ],
    "timePatterns": [
        "HH.mm.ss zzzz",
        "HH.mm.ss z",
        "HH.mm.ss",
        "HH.mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "данас",
    "now": "сада",
    "ok": "OK",
    "clear": "Clear",
    "month": "месец",
    "year": "година",
    "previousMonth": "прошлог месеца(PageUp)",
    "nextMonth": "следећег месеца(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y.",
    "monthFormat": "M",
    "dateFormat": "d. MMM y.",
    "previousYear": "прошле године(Control + left key)",
    "nextYear": "следеће године(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
