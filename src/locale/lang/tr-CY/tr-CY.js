//language=土耳其文
//territory=塞浦路斯
var iFormat ={
    "eras": [
        "Milattan Önce",
        "Milattan Sonra"
    ],
    "months": [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
    ],
    "shortMonths": [
        "Oca",
        "Şub",
        "Mar",
        "Nis",
        "May",
        "Haz",
        "Tem",
        "Ağu",
        "Eyl",
        "Eki",
        "Kas",
        "Ara"
    ],
    "weekdays": [
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi"
    ],
    "shortWeekdays": [
        "Paz",
        "Pzt",
        "Sal",
        "Çar",
        "Per",
        "Cum",
        "Cmt"
    ],
    "veryShortWeekdays": [
        "P",
        "P",
        "S",
        "Ç",
        "P",
        "C",
        "C"
    ],
    "ampms": [
        "ÖÖ",
        "ÖS"
    ],
    "datePatterns": [
        "d MMMM y EEEE",
        "d MMMM y",
        "d.MM.y",
        "d.MM.y"
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
    "today": "bugün",
    "now": "şimdi",
    "ok": "OK",
    "clear": "Clear",
    "month": "Ay",
    "year": "Yıl",
    "previousMonth": "geçen ay(PageUp)",
    "nextMonth": "gelecek ay(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "dd MMM y",
    "previousYear": "geçen yıl(Control + left key)",
    "nextYear": "gelecek yıl(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
