//language=祖鲁文
var iFormat ={
    "eras": [
        "BC",
        "AD"
    ],
    "months": [
        "Januwari",
        "Februwari",
        "Mashi",
        "Ephreli",
        "Meyi",
        "Juni",
        "Julayi",
        "Agasti",
        "Septhemba",
        "Okthoba",
        "Novemba",
        "Disemba"
    ],
    "shortMonths": [
        "Jan",
        "Feb",
        "Mas",
        "Eph",
        "Mey",
        "Jun",
        "Jul",
        "Aga",
        "Sep",
        "Okt",
        "Nov",
        "Dis"
    ],
    "weekdays": [
        "ISonto",
        "UMsombuluko",
        "ULwesibili",
        "ULwesithathu",
        "ULwesine",
        "ULwesihlanu",
        "UMgqibelo"
    ],
    "shortWeekdays": [
        "Son",
        "Mso",
        "Bil",
        "Tha",
        "Sin",
        "Hla",
        "Mgq"
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "B",
        "T",
        "S",
        "H",
        "M"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, MMMM d, y",
        "MMMM d, y",
        "M/d/yy",
        "M/d/yy"
    ],
    "timePatterns": [
        "h:mm:ss a zzzz",
        "h:mm:ss a z",
        "h:mm:ss a",
        "h:mm a"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "namhlanje",
    "now": "manje",
    "ok": "OK",
    "clear": "Clear",
    "month": "Inyanga",
    "year": "Unyaka",
    "previousMonth": "inyanga edlule(PageUp)",
    "nextMonth": "inyanga ezayo(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "MMM d, y",
    "previousYear": "onyakeni odlule(Control + left key)",
    "nextYear": "unyaka ozayo(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
