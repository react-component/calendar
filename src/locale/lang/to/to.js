//language=汤加文
var iFormat ={
    "eras": [
        "ki muʻa",
        "taʻu ʻo Sīsū"
    ],
    "months": [
        "Sānuali",
        "Fēpueli",
        "Maʻasi",
        "ʻEpeleli",
        "Mē",
        "Sune",
        "Siulai",
        "ʻAokosi",
        "Sepitema",
        "ʻOkatopa",
        "Nōvema",
        "Tīsema"
    ],
    "shortMonths": [
        "Sān",
        "Fēp",
        "Maʻa",
        "ʻEpe",
        "Mē",
        "Sun",
        "Siu",
        "ʻAok",
        "Sep",
        "ʻOka",
        "Nōv",
        "Tīs"
    ],
    "weekdays": [
        "Sāpate",
        "Mōnite",
        "Tūsite",
        "Pulelulu",
        "Tuʻapulelulu",
        "Falaite",
        "Tokonaki"
    ],
    "shortWeekdays": [
        "Sāp",
        "Mōn",
        "Tūs",
        "Pul",
        "Tuʻa",
        "Fal",
        "Tok"
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "T",
        "P",
        "T",
        "F",
        "T"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE d MMMM y",
        "d MMMM y",
        "d/M/yy",
        "d/M/yy"
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
    "today": "ʻahó ni",
    "now": "taimiʻni",
    "ok": "OK",
    "clear": "Clear",
    "month": "māhina",
    "year": "taʻu",
    "previousMonth": "māhina kuoʻosi(PageUp)",
    "nextMonth": "māhina kahaʻu(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "taʻu kuoʻosi(Control + left key)",
    "nextYear": "taʻu kahaʻu(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
