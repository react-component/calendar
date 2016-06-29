//language=波兰文
var iFormat ={
    "eras": [
        "p.n.e.",
        "n.e."
    ],
    "months": [
        "stycznia",
        "lutego",
        "marca",
        "kwietnia",
        "maja",
        "czerwca",
        "lipca",
        "sierpnia",
        "września",
        "października",
        "listopada",
        "grudnia"
    ],
    "shortMonths": [
        "sty",
        "lut",
        "mar",
        "kwi",
        "maj",
        "cze",
        "lip",
        "sie",
        "wrz",
        "paź",
        "lis",
        "gru"
    ],
    "weekdays": [
        "niedziela",
        "poniedziałek",
        "wtorek",
        "środa",
        "czwartek",
        "piątek",
        "sobota"
    ],
    "shortWeekdays": [
        "niedz.",
        "pon.",
        "wt.",
        "śr.",
        "czw.",
        "pt.",
        "sob."
    ],
    "veryShortWeekdays": [
        "N",
        "P",
        "W",
        "Ś",
        "C",
        "P",
        "S"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, d MMMM y",
        "d MMMM y",
        "dd.MM.y",
        "dd.MM.y"
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
    "today": "dzisiaj",
    "now": "teraz",
    "ok": "OK",
    "clear": "Clear",
    "month": "miesiąc",
    "year": "rok",
    "previousMonth": "w zeszłym miesiącu(PageUp)",
    "nextMonth": "w przyszłym miesiącu(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d.MM.y",
    "previousYear": "w zeszłym roku(Control + left key)",
    "nextYear": "w przyszłym roku(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
