//language=泰文
var iFormat ={
    "eras": [
        "ปีก่อนคริสต์ศักราช",
        "คริสต์ศักราช"
    ],
    "months": [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
    ],
    "shortMonths": [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค."
    ],
    "weekdays": [
        "วันอาทิตย์",
        "วันจันทร์",
        "วันอังคาร",
        "วันพุธ",
        "วันพฤหัสบดี",
        "วันศุกร์",
        "วันเสาร์"
    ],
    "shortWeekdays": [
        "อา.",
        "จ.",
        "อ.",
        "พ.",
        "พฤ.",
        "ศ.",
        "ส."
    ],
    "veryShortWeekdays": [
        "อา",
        "จ",
        "อ",
        "พ",
        "พฤ",
        "ศ",
        "ส"
    ],
    "ampms": [
        "ก่อนเที่ยง",
        "หลังเที่ยง"
    ],
    "datePatterns": [
        "EEEEที่ d MMMM G y",
        "d MMMM G y",
        "d/M/yy",
        "d/M/yy"
    ],
    "timePatterns": [
        "H นาฬิกา mm นาที ss วินาที zzzz",
        "H นาฬิกา mm นาที ss วินาที z",
        "HH:mm:ss",
        "HH:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "วันนี้",
    "now": "ขณะนี้",
    "ok": "OK",
    "clear": "Clear",
    "month": "เดือน",
    "year": "ปี",
    "previousMonth": "เดือนที่แล้ว(PageUp)",
    "nextMonth": "เดือนหน้า(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "ปีที่แล้ว(Control + left key)",
    "nextYear": "ปีหน้า(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
