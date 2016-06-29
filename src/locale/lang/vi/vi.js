//language=越南文
var iFormat ={
    "eras": [
        "tr. CN",
        "sau CN"
    ],
    "months": [
        "tháng 1",
        "tháng 2",
        "tháng 3",
        "tháng 4",
        "tháng 5",
        "tháng 6",
        "tháng 7",
        "tháng 8",
        "tháng 9",
        "tháng 10",
        "tháng 11",
        "tháng 12"
    ],
    "shortMonths": [
        "thg 1",
        "thg 2",
        "thg 3",
        "thg 4",
        "thg 5",
        "thg 6",
        "thg 7",
        "thg 8",
        "thg 9",
        "thg 10",
        "thg 11",
        "thg 12"
    ],
    "weekdays": [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy"
    ],
    "shortWeekdays": [
        "CN",
        "Th 2",
        "Th 3",
        "Th 4",
        "Th 5",
        "Th 6",
        "Th 7"
    ],
    "veryShortWeekdays": [
        "CN",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7"
    ],
    "ampms": [
        "SA",
        "CH"
    ],
    "datePatterns": [
        "EEEE, 'ngày' dd MMMM 'năm' y",
        "'Ngày' dd 'tháng' MM 'năm' y",
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
    "today": "Hôm nay",
    "now": "bây giờ",
    "ok": "OK",
    "clear": "Clear",
    "month": "Tháng",
    "year": "Năm",
    "previousMonth": "tháng trước(PageUp)",
    "nextMonth": "tháng sau(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM, y",
    "previousYear": "năm ngoái(Control + left key)",
    "nextYear": "năm sau(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
