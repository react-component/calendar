//language=爱尔兰文
var iFormat ={
    "eras": [
        "Roimh Chríost",
        "Anno Domini"
    ],
    "months": [
        "Eanáir",
        "Feabhra",
        "Márta",
        "Aibreán",
        "Bealtaine",
        "Meitheamh",
        "Iúil",
        "Lúnasa",
        "Meán Fómhair",
        "Deireadh Fómhair",
        "Samhain",
        "Nollaig"
    ],
    "shortMonths": [
        "Ean",
        "Feabh",
        "Márta",
        "Aib",
        "Beal",
        "Meith",
        "Iúil",
        "Lún",
        "MFómh",
        "DFómh",
        "Samh",
        "Noll"
    ],
    "weekdays": [
        "Dé Domhnaigh",
        "Dé Luain",
        "Dé Máirt",
        "Dé Céadaoin",
        "Déardaoin",
        "Dé hAoine",
        "Dé Sathairn"
    ],
    "shortWeekdays": [
        "Domh",
        "Luan",
        "Máirt",
        "Céad",
        "Déar",
        "Aoine",
        "Sath"
    ],
    "veryShortWeekdays": [
        "D",
        "L",
        "M",
        "C",
        "D",
        "A",
        "S"
    ],
    "ampms": [
        "a.m.",
        "p.m."
    ],
    "datePatterns": [
        "EEEE d MMMM y",
        "d MMMM y",
        "dd/MM/y",
        "dd/MM/y"
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
    "today": "inniu",
    "now": "anois",
    "ok": "OK",
    "clear": "Clear",
    "month": "Mí",
    "year": "Bliain",
    "previousMonth": "an mhí seo caite(PageUp)",
    "nextMonth": "an mhí seo chugainn(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "MM",
    "dateFormat": "d MMM y",
    "previousYear": "anuraidh(Control + left key)",
    "nextYear": "an bhliain seo chugainn(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
