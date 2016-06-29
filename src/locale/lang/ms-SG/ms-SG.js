//language=马来文
//territory=新加坡
var iFormat ={
    "eras": [
        "S.M.",
        "TM"
    ],
    "months": [
        "Januari",
        "Februari",
        "Mac",
        "April",
        "Mei",
        "Jun",
        "Julai",
        "Ogos",
        "September",
        "Oktober",
        "November",
        "Disember"
    ],
    "shortMonths": [
        "Jan",
        "Feb",
        "Mac",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ogo",
        "Sep",
        "Okt",
        "Nov",
        "Dis"
    ],
    "weekdays": [
        "Ahad",
        "Isnin",
        "Selasa",
        "Rabu",
        "Khamis",
        "Jumaat",
        "Sabtu"
    ],
    "shortWeekdays": [
        "Ahd",
        "Isn",
        "Sel",
        "Rab",
        "Kha",
        "Jum",
        "Sab"
    ],
    "veryShortWeekdays": [
        "A",
        "I",
        "S",
        "R",
        "K",
        "J",
        "S"
    ],
    "ampms": [
        "PG",
        "PTG"
    ],
    "datePatterns": [
        "EEEE, d MMMM y",
        "d MMMM y",
        "d/MM/yy",
        "d/MM/yy"
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
    "today": "hari ini",
    "now": "sekarang",
    "ok": "OK",
    "clear": "Clear",
    "month": "Bulan",
    "year": "Tahun",
    "previousMonth": "bulan lalu(PageUp)",
    "nextMonth": "bulan depan(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "tahun lepas(Control + left key)",
    "nextYear": "tahun depan(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
