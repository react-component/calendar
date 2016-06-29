//language=僧伽罗文
var iFormat ={
    "eras": [
        "ක්‍රිස්තු පූර්ව",
        "ක්‍රිස්තු වර්ෂ"
    ],
    "months": [
        "ජනවාරි",
        "පෙබරවාරි",
        "මාර්තු",
        "අප්‍රේල්",
        "මැයි",
        "ජූනි",
        "ජූලි",
        "අගෝස්තු",
        "සැප්තැම්බර්",
        "ඔක්තෝබර්",
        "නොවැම්බර්",
        "දෙසැම්බර්"
    ],
    "shortMonths": [
        "ජන",
        "පෙබ",
        "මාර්තු",
        "අප්‍රේල්",
        "මැයි",
        "ජූනි",
        "ජූලි",
        "අගෝ",
        "සැප්",
        "ඔක්",
        "නොවැ",
        "දෙසැ"
    ],
    "weekdays": [
        "ඉරිදා",
        "සඳුදා",
        "අඟහරුවාදා",
        "බදාදා",
        "බ්‍රහස්පතින්දා",
        "සිකුරාදා",
        "සෙනසුරාදා"
    ],
    "shortWeekdays": [
        "ඉරිදා",
        "සඳුදා",
        "අඟහ",
        "බදාදා",
        "බ්‍රහස්",
        "සිකු",
        "සෙන"
    ],
    "veryShortWeekdays": [
        "ඉ",
        "ස",
        "අ",
        "බ",
        "බ්‍ර",
        "සි",
        "සෙ"
    ],
    "ampms": [
        "පෙ.ව.",
        "ප.ව."
    ],
    "datePatterns": [
        "y MMMM d, EEEE",
        "y MMMM d",
        "y-MM-dd",
        "y-MM-dd"
    ],
    "timePatterns": [
        "HH.mm.ss zzzz",
        "HH.mm.ss z",
        "HH.mm.ss",
        "HH.mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "අද",
    "now": "දැන්",
    "ok": "OK",
    "clear": "Clear",
    "month": "මාසය",
    "year": "වර්ෂය",
    "previousMonth": "පසුගිය මාසය(PageUp)",
    "nextMonth": "ඊළඟ මාසය(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "y MMM d",
    "previousYear": "පසුගිය වසර(Control + left key)",
    "nextYear": "ඊළඟ වසර(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
