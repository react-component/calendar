//language=罗马尼亚文
var iFormat ={
    "eras": [
        "înainte de Hristos",
        "după Hristos"
    ],
    "months": [
        "ianuarie",
        "februarie",
        "martie",
        "aprilie",
        "mai",
        "iunie",
        "iulie",
        "august",
        "septembrie",
        "octombrie",
        "noiembrie",
        "decembrie"
    ],
    "shortMonths": [
        "ian.",
        "feb.",
        "mar.",
        "apr.",
        "mai",
        "iun.",
        "iul.",
        "aug.",
        "sept.",
        "oct.",
        "nov.",
        "dec."
    ],
    "weekdays": [
        "duminică",
        "luni",
        "marți",
        "miercuri",
        "joi",
        "vineri",
        "sâmbătă"
    ],
    "shortWeekdays": [
        "dum.",
        "lun.",
        "mar.",
        "mie.",
        "joi",
        "vin.",
        "sâm."
    ],
    "veryShortWeekdays": [
        "D",
        "L",
        "M",
        "M",
        "J",
        "V",
        "S"
    ],
    "ampms": [
        "a.m.",
        "p.m."
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
    "today": "azi",
    "now": "acum",
    "ok": "OK",
    "clear": "Clear",
    "month": "Lună",
    "year": "An",
    "previousMonth": "luna trecută(PageUp)",
    "nextMonth": "luna viitoare(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "anul trecut(Control + left key)",
    "nextYear": "anul viitor(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
