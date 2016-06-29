//language=克罗地亚文
//territory=波斯尼亚和黑塞哥维那
var iFormat ={
    "eras": [
        "prije Krista",
        "poslije Krista"
    ],
    "months": [
        "siječnja",
        "veljače",
        "ožujka",
        "travnja",
        "svibnja",
        "lipnja",
        "srpnja",
        "kolovoza",
        "rujna",
        "listopada",
        "studenoga",
        "prosinca"
    ],
    "shortMonths": [
        "sij",
        "velj",
        "ožu",
        "tra",
        "svi",
        "lip",
        "srp",
        "kol",
        "ruj",
        "lis",
        "stu",
        "pro"
    ],
    "weekdays": [
        "nedjelja",
        "ponedjeljak",
        "utorak",
        "srijeda",
        "četvrtak",
        "petak",
        "subota"
    ],
    "shortWeekdays": [
        "ned",
        "pon",
        "uto",
        "sri",
        "čet",
        "pet",
        "sub"
    ],
    "veryShortWeekdays": [
        "N",
        "P",
        "U",
        "S",
        "Č",
        "P",
        "S"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, d. MMMM y.",
        "d. MMMM y.",
        "dd.MM.y.",
        "dd.MM.y."
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
    "today": "danas",
    "now": "sada",
    "ok": "OK",
    "clear": "Clear",
    "month": "mjesec",
    "year": "godina",
    "previousMonth": "prošli mjesec(PageUp)",
    "nextMonth": "sljedeći mjesec(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y.",
    "monthFormat": "M.",
    "dateFormat": "d. MMM y.",
    "previousYear": "prošle godine(Control + left key)",
    "nextYear": "sljedeće godine(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
