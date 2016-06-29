//language=芬兰文
var iFormat ={
    "eras": [
        "ennen Kristuksen syntymää",
        "jälkeen Kristuksen syntymän"
    ],
    "months": [
        "tammikuuta",
        "helmikuuta",
        "maaliskuuta",
        "huhtikuuta",
        "toukokuuta",
        "kesäkuuta",
        "heinäkuuta",
        "elokuuta",
        "syyskuuta",
        "lokakuuta",
        "marraskuuta",
        "joulukuuta"
    ],
    "shortMonths": [
        "tammikuuta",
        "helmikuuta",
        "maaliskuuta",
        "huhtikuuta",
        "toukokuuta",
        "kesäkuuta",
        "heinäkuuta",
        "elokuuta",
        "syyskuuta",
        "lokakuuta",
        "marraskuuta",
        "joulukuuta"
    ],
    "weekdays": [
        "sunnuntaina",
        "maanantaina",
        "tiistaina",
        "keskiviikkona",
        "torstaina",
        "perjantaina",
        "lauantaina"
    ],
    "shortWeekdays": [
        "su",
        "ma",
        "ti",
        "ke",
        "to",
        "pe",
        "la"
    ],
    "veryShortWeekdays": [
        "S",
        "M",
        "T",
        "K",
        "T",
        "P",
        "L"
    ],
    "ampms": [
        "ap.",
        "ip."
    ],
    "datePatterns": [
        "cccc d. MMMM y",
        "d. MMMM y",
        "d.M.y",
        "d.M.y"
    ],
    "timePatterns": [
        "H.mm.ss zzzz",
        "H.mm.ss z",
        "H.mm.ss",
        "H.mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "tänään",
    "now": "nyt",
    "ok": "OK",
    "clear": "Clear",
    "month": "kuukausi",
    "year": "vuosi",
    "previousMonth": "viime kuussa(PageUp)",
    "nextMonth": "ensi kuussa(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d. MMM y",
    "previousYear": "viime vuonna(Control + left key)",
    "nextYear": "ensi vuonna(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
