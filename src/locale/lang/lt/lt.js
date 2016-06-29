//language=立陶宛文
var iFormat ={
    "eras": [
        "prieš Kristų",
        "po Kristaus"
    ],
    "months": [
        "sausio",
        "vasario",
        "kovo",
        "balandžio",
        "gegužės",
        "birželio",
        "liepos",
        "rugpjūčio",
        "rugsėjo",
        "spalio",
        "lapkričio",
        "gruodžio"
    ],
    "shortMonths": [
        "saus.",
        "vas.",
        "kov.",
        "bal.",
        "geg.",
        "birž.",
        "liep.",
        "rugp.",
        "rugs.",
        "spal.",
        "lapkr.",
        "gruod."
    ],
    "weekdays": [
        "sekmadienis",
        "pirmadienis",
        "antradienis",
        "trečiadienis",
        "ketvirtadienis",
        "penktadienis",
        "šeštadienis"
    ],
    "shortWeekdays": [
        "sk",
        "pr",
        "an",
        "tr",
        "kt",
        "pn",
        "št"
    ],
    "veryShortWeekdays": [
        "S",
        "P",
        "A",
        "T",
        "K",
        "P",
        "Š"
    ],
    "ampms": [
        "priešpiet",
        "popiet"
    ],
    "datePatterns": [
        "y 'm'. MMMM d 'd'., EEEE",
        "y 'm'. MMMM d 'd'.",
        "y-MM-dd",
        "y-MM-dd"
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
    "today": "šiandien",
    "now": "dabar",
    "ok": "OK",
    "clear": "Clear",
    "month": "mėnuo",
    "year": "metai",
    "previousMonth": "praėjusį mėnesį(PageUp)",
    "nextMonth": "kitą mėnesį(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "MM",
    "dateFormat": "y-MM-dd",
    "previousYear": "praėjusiais metais(Control + left key)",
    "nextYear": "kitais metais(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
