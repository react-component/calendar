//language=巴斯克文
var iFormat ={
    "eras": [
        "K.a.",
        "K.o."
    ],
    "months": [
        "urtarrilak",
        "otsailak",
        "martxoak",
        "apirilak",
        "maiatzak",
        "ekainak",
        "uztailak",
        "abuztuak",
        "irailak",
        "urriak",
        "azaroak",
        "abenduak"
    ],
    "shortMonths": [
        "urt.",
        "ots.",
        "mar.",
        "api.",
        "mai.",
        "eka.",
        "uzt.",
        "abu.",
        "ira.",
        "urr.",
        "aza.",
        "abe."
    ],
    "weekdays": [
        "igandea",
        "astelehena",
        "asteartea",
        "asteazkena",
        "osteguna",
        "ostirala",
        "larunbata"
    ],
    "shortWeekdays": [
        "ig.",
        "al.",
        "ar.",
        "az.",
        "og.",
        "or.",
        "lr."
    ],
    "veryShortWeekdays": [
        "I",
        "A",
        "A",
        "A",
        "O",
        "O",
        "L"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "y('e')'ko' MMMM d, EEEE",
        "y('e')'ko' MMMM d",
        "y/MM/dd",
        "y/MM/dd"
    ],
    "timePatterns": [
        "HH:mm:ss (zzzz)",
        "HH:mm:ss (z)",
        "HH:mm:ss",
        "HH:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "gaur",
    "now": "orain",
    "ok": "OK",
    "clear": "Clear",
    "month": "Hilabetea",
    "year": "Urtea",
    "previousMonth": "aurreko hilabetea(PageUp)",
    "nextMonth": "hurrengo hilabetea(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "y MMM d",
    "previousYear": "aurreko urtea(Control + left key)",
    "nextYear": "hurrengo urtea(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
