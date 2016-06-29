//language=马拉雅拉姆文
var iFormat ={
    "eras": [
        "ക്രിസ്‌തുവിന് മുമ്പ്",
        "ആന്നോ ഡൊമിനി"
    ],
    "months": [
        "ജനുവരി",
        "ഫെബ്രുവരി",
        "മാർച്ച്",
        "ഏപ്രിൽ",
        "മേയ്",
        "ജൂൺ",
        "ജൂലൈ",
        "ഓഗസ്റ്റ്",
        "സെപ്റ്റംബർ",
        "ഒക്‌ടോബർ",
        "നവംബർ",
        "ഡിസംബർ"
    ],
    "shortMonths": [
        "ജനു",
        "ഫെബ്രു",
        "മാർ",
        "ഏപ്രി",
        "മേയ്",
        "ജൂൺ",
        "ജൂലൈ",
        "ഓഗ",
        "സെപ്റ്റം",
        "ഒക്ടോ",
        "നവം",
        "ഡിസം"
    ],
    "weekdays": [
        "ഞായറാഴ്‌ച",
        "തിങ്കളാഴ്‌ച",
        "ചൊവ്വാഴ്ച",
        "ബുധനാഴ്‌ച",
        "വ്യാഴാഴ്‌ച",
        "വെള്ളിയാഴ്‌ച",
        "ശനിയാഴ്‌ച"
    ],
    "shortWeekdays": [
        "ഞായർ",
        "തിങ്കൾ",
        "ചൊവ്വ",
        "ബുധൻ",
        "വ്യാഴം",
        "വെള്ളി",
        "ശനി"
    ],
    "veryShortWeekdays": [
        "ഞ",
        "തി",
        "ചൊ",
        "ബു",
        "വ്യാ",
        "വെ",
        "ശ"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "y, MMMM d, EEEE",
        "y, MMMM d",
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
    "today": "ഇന്ന്",
    "now": "ഇപ്പോൾ",
    "ok": "OK",
    "clear": "Clear",
    "month": "മാസം",
    "year": "വർഷം",
    "previousMonth": "കഴിഞ്ഞ മാസം(PageUp)",
    "nextMonth": "അടുത്ത മാസം(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "y MMM d",
    "previousYear": "കഴിഞ്ഞ വർഷം(Control + left key)",
    "nextYear": "അടുത്തവർഷം(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
