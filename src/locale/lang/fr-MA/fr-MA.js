//language=法文
//territory=摩洛哥
var iFormat ={
    "eras": [
        "avant Jésus-Christ",
        "après Jésus-Christ"
    ],
    "months": [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre"
    ],
    "shortMonths": [
        "jan.",
        "fév.",
        "mar.",
        "avr.",
        "mai",
        "jui.",
        "juil.",
        "août",
        "sept.",
        "oct.",
        "nov.",
        "déc."
    ],
    "weekdays": [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi"
    ],
    "shortWeekdays": [
        "dim.",
        "lun.",
        "mar.",
        "mer.",
        "jeu.",
        "ven.",
        "sam."
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
    "today": "aujourd’hui",
    "now": "maintenant",
    "ok": "OK",
    "clear": "Clear",
    "month": "mois",
    "year": "année",
    "previousMonth": "le mois dernier(PageUp)",
    "nextMonth": "le mois prochain(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "l’année dernière(Control + left key)",
    "nextYear": "l’année prochaine(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
