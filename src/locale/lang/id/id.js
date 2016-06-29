//language=印度尼西亚文
var iFormat ={
    "eras": [
        "Sebelum Masehi",
        "M"
    ],
    "months": [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ],
    "shortMonths": [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agt",
        "Sep",
        "Okt",
        "Nov",
        "Des"
    ],
    "weekdays": [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ],
    "shortWeekdays": [
        "Min",
        "Sen",
        "Sel",
        "Rab",
        "Kam",
        "Jum",
        "Sab"
    ],
    "veryShortWeekdays": [
        "M",
        "S",
        "S",
        "R",
        "K",
        "J",
        "S"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, dd MMMM y",
        "d MMMM y",
        "dd/MM/yy",
        "dd/MM/yy"
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
    "today": "hari ini",
    "now": "sekarang",
    "ok": "OK",
    "clear": "Clear",
    "month": "Bulan",
    "year": "Tahun",
    "previousMonth": "bulan lalu(PageUp)",
    "nextMonth": "Bulan berikutnya(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "tahun lalu(Control + left key)",
    "nextYear": "tahun depan(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
