//language=孟加拉文
//territory=印度
var iFormat ={
    "eras": [
        "খ্রিস্টপূর্ব",
        "খৃষ্টাব্দ"
    ],
    "months": [
        "জানুয়ারী",
        "ফেব্রুয়ারী",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর"
    ],
    "shortMonths": [
        "জানুয়ারী",
        "ফেব্রুয়ারী",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর"
    ],
    "weekdays": [
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",
        "শুক্রবার",
        "শনিবার"
    ],
    "shortWeekdays": [
        "রবি",
        "সোম",
        "মঙ্গল",
        "বুধ",
        "বৃহস্পতি",
        "শুক্র",
        "শনি"
    ],
    "veryShortWeekdays": [
        "র",
        "সো",
        "ম",
        "বু",
        "বৃ",
        "শু",
        "শ"
    ],
    "ampms": [
        "পূর্বাহ্ণ",
        "অপরাহ্ণ"
    ],
    "datePatterns": [
        "EEEE, d MMMM, y",
        "d MMMM, y",
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
    "today": "আজ",
    "now": "এখন",
    "ok": "OK",
    "clear": "Clear",
    "month": "মাস",
    "year": "বছর",
    "previousMonth": "গত মাস(PageUp)",
    "nextMonth": "পরের মাস(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM, y",
    "previousYear": "গত বছর(Control + left key)",
    "nextYear": "পরের বছর(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
