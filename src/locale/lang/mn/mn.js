//language=蒙古文
var iFormat ={
    "eras": [
        "манай эриний өмнөх",
        "манай эриний"
    ],
    "months": [
        "Нэгдүгээр сар",
        "Хоёрдугаар сар",
        "Гуравдугаар сар",
        "Дөрөвдүгээр сар",
        "Тавдугаар сар",
        "Зургадугаар сар",
        "Долдугаар сар",
        "Наймдугаар сар",
        "Есдүгээр сар",
        "Аравдугаар сар",
        "Арван нэгдүгээр сар",
        "Арван хоёрдугаар сар"
    ],
    "shortMonths": [
        "1-р сар",
        "2-р сар",
        "3-р сар",
        "4-р сар",
        "5-р сар",
        "6-р сар",
        "7-р сар",
        "8-р сар",
        "9-р сар",
        "10-р сар",
        "11-р сар",
        "12-р сар"
    ],
    "weekdays": [
        "ням",
        "даваа",
        "мягмар",
        "лхагва",
        "пүрэв",
        "баасан",
        "бямба"
    ],
    "shortWeekdays": [
        "Ня",
        "Да",
        "Мя",
        "Лх",
        "Пү",
        "Ба",
        "Бя"
    ],
    "veryShortWeekdays": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
    ],
    "ampms": [
        "ҮӨ",
        "ҮХ"
    ],
    "datePatterns": [
        "EEEE, y 'оны' MM 'сарын' d",
        "y 'оны' MM 'сарын' d",
        "y-MM-dd",
        "y-MM-dd"
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
    "today": "өнөөдөр",
    "now": "Одоо",
    "ok": "OK",
    "clear": "Clear",
    "month": "Сар",
    "year": "Жил",
    "previousMonth": "өнгөрсөн сар(PageUp)",
    "nextMonth": "ирэх сар(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "y MMM d",
    "previousYear": "өнгөрсөн жил(Control + left key)",
    "nextYear": "ирэх жил(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
