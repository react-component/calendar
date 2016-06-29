//language=高棉文
var iFormat ={
    "eras": [
        "មុន​គ្រិស្តសករាជ",
        "គ្រិស្តសករាជ"
    ],
    "months": [
        "មករា",
        "កុម្ភៈ",
        "មីនា",
        "មេសា",
        "ឧសភា",
        "មិថុនា",
        "កក្កដា",
        "សីហា",
        "កញ្ញា",
        "តុលា",
        "វិច្ឆិកា",
        "ធ្នូ"
    ],
    "shortMonths": [
        "មករា",
        "កុម្ភៈ",
        "មីនា",
        "មេសា",
        "ឧសភា",
        "មិថុនា",
        "កក្កដា",
        "សីហា",
        "កញ្ញា",
        "តុលា",
        "វិច្ឆិកា",
        "ធ្នូ"
    ],
    "weekdays": [
        "អាទិត្យ",
        "ច័ន្ទ",
        "អង្គារ",
        "ពុធ",
        "ព្រហស្បតិ៍",
        "សុក្រ",
        "សៅរ៍"
    ],
    "shortWeekdays": [
        "អាទិត្យ",
        "ច័ន្ទ",
        "អង្គារ",
        "ពុធ",
        "ព្រហស្បតិ៍",
        "សុក្រ",
        "សៅរ៍"
    ],
    "veryShortWeekdays": [
        "អា",
        "ច",
        "អ",
        "ពុ",
        "ព្រ",
        "សុ",
        "ស"
    ],
    "ampms": [
        "ព្រឹក",
        "ល្ងាច"
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
    "today": "ថ្ងៃ​នេះ",
    "now": "ឥឡូវ",
    "ok": "OK",
    "clear": "Clear",
    "month": "ខែ",
    "year": "ឆ្នាំ",
    "previousMonth": "ខែ​មុន(PageUp)",
    "nextMonth": "ខែ​ក្រោយ(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "ឆ្នាំ​មុន(Control + left key)",
    "nextYear": "ឆ្នាំ​ក្រោយ(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
