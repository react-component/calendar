//language=白俄罗斯文
var iFormat ={
    "eras": [
        "да нашай эры",
        "нашай эры"
    ],
    "months": [
        "студзеня",
        "лютага",
        "сакавіка",
        "красавіка",
        "мая",
        "чэрвеня",
        "ліпеня",
        "жніўня",
        "верасня",
        "кастрычніка",
        "лістапада",
        "снежня"
    ],
    "shortMonths": [
        "сту",
        "лют",
        "сак",
        "кра",
        "мая",
        "чэр",
        "ліп",
        "жні",
        "вер",
        "кас",
        "ліс",
        "сне"
    ],
    "weekdays": [
        "нядзеля",
        "панядзелак",
        "аўторак",
        "серада",
        "чацвер",
        "пятніца",
        "субота"
    ],
    "shortWeekdays": [
        "нд",
        "пн",
        "аў",
        "ср",
        "чц",
        "пт",
        "сб"
    ],
    "veryShortWeekdays": [
        "н",
        "п",
        "а",
        "с",
        "ч",
        "п",
        "с"
    ],
    "ampms": [
        "да паўдня",
        "пасля паўдня"
    ],
    "datePatterns": [
        "EEEE, d MMMM y",
        "d MMMM y",
        "d.M.yy",
        "d.M.yy"
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
    "today": "сёння",
    "now": "now",
    "ok": "OK",
    "clear": "Clear",
    "month": "месяц",
    "year": "год",
    "previousMonth": "у мінулым месяцы(PageUp)",
    "nextMonth": "у наступным месяцы(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "у мінулым годзе(Control + left key)",
    "nextYear": "у наступным годзе(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
