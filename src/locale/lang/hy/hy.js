//language=亚美尼亚文
var iFormat ={
    "eras": [
        "մ.թ.ա.",
        "մ.թ."
    ],
    "months": [
        "հունվարի",
        "փետրվարի",
        "մարտի",
        "ապրիլի",
        "մայիսի",
        "հունիսի",
        "հուլիսի",
        "օգոստոսի",
        "սեպտեմբերի",
        "հոկտեմբերի",
        "նոյեմբերի",
        "դեկտեմբերի"
    ],
    "shortMonths": [
        "հնվ",
        "փտվ",
        "մրտ",
        "ապր",
        "մյս",
        "հնս",
        "հլս",
        "օգս",
        "սեպ",
        "հոկ",
        "նոյ",
        "դեկ"
    ],
    "weekdays": [
        "կիրակի",
        "երկուշաբթի",
        "երեքշաբթի",
        "չորեքշաբթի",
        "հինգշաբթի",
        "ուրբաթ",
        "շաբաթ"
    ],
    "shortWeekdays": [
        "կիր",
        "երկ",
        "երք",
        "չրք",
        "հնգ",
        "ուր",
        "շբթ"
    ],
    "veryShortWeekdays": [
        "Կ",
        "Ե",
        "Ե",
        "Չ",
        "Հ",
        "Ու",
        "Շ"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "yթ. MMMM d, EEEE",
        "dd MMMM, yթ.",
        "dd.MM.yy",
        "dd.MM.yy"
    ],
    "timePatterns": [
        "H:mm:ss, zzzz",
        "H:mm:ss, z",
        "H:mm:ss",
        "H:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "այսօր",
    "now": "այժմ",
    "ok": "OK",
    "clear": "Clear",
    "month": "Ամիս",
    "year": "Տարի",
    "previousMonth": "անցյալ ամիս(PageUp)",
    "nextMonth": "հաջորդ ամիս(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM, yթ.",
    "previousYear": "անցյալ տարի(Control + left key)",
    "nextYear": "հաջորդ տարի(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
