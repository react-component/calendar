//language=阿尔巴尼亚文
//territory=科索沃
var iFormat ={
    "eras": [
        "para erës së re",
        "erës së re"
    ],
    "months": [
        "janar",
        "shkurt",
        "mars",
        "prill",
        "maj",
        "qershor",
        "korrik",
        "gusht",
        "shtator",
        "tetor",
        "nëntor",
        "dhjetor"
    ],
    "shortMonths": [
        "Jan",
        "Shk",
        "Mar",
        "Pri",
        "Maj",
        "Qer",
        "Kor",
        "Gsh",
        "Sht",
        "Tet",
        "Nën",
        "Dhj"
    ],
    "weekdays": [
        "e diel",
        "e hënë",
        "e martë",
        "e mërkurë",
        "e enjte",
        "e premte",
        "e shtunë"
    ],
    "shortWeekdays": [
        "Die",
        "Hën",
        "Mar",
        "Mër",
        "Enj",
        "Pre",
        "Sht"
    ],
    "veryShortWeekdays": [
        "D",
        "H",
        "M",
        "M",
        "E",
        "P",
        "S"
    ],
    "ampms": [
        "e paradites",
        "e pasdites"
    ],
    "datePatterns": [
        "EEEE, d MMMM y",
        "d MMMM y",
        "d.M.yy",
        "d.M.yy"
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
    "today": "sot",
    "now": "tani",
    "ok": "OK",
    "clear": "Clear",
    "month": "muaj",
    "year": "vit",
    "previousMonth": "muajin e kaluar(PageUp)",
    "nextMonth": "muajin e ardhshëm(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "vitin e kaluar(Control + left key)",
    "nextYear": "vitin e ardhshëm(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
