//language=菲律宾文
var iFormat ={
    "eras": [
        "BC",
        "AD"
    ],
    "months": [
        "Enero",
        "Pebrero",
        "Marso",
        "Abril",
        "Mayo",
        "Hunyo",
        "Hulyo",
        "Agosto",
        "Setyembre",
        "Oktubre",
        "Nobyembre",
        "Disyembre"
    ],
    "shortMonths": [
        "Ene",
        "Peb",
        "Mar",
        "Abr",
        "May",
        "Hun",
        "Hul",
        "Ago",
        "Set",
        "Okt",
        "Nob",
        "Dis"
    ],
    "weekdays": [
        "Linggo",
        "Lunes",
        "Martes",
        "Miyerkules",
        "Huwebes",
        "Biyernes",
        "Sabado"
    ],
    "shortWeekdays": [
        "Lin",
        "Lun",
        "Mar",
        "Miy",
        "Huw",
        "Biy",
        "Sab"
    ],
    "veryShortWeekdays": [
        "Lin",
        "Lun",
        "Mar",
        "Miy",
        "Huw",
        "Biy",
        "Sab"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, MMMM d, y",
        "MMMM d, y",
        "M/d/yy",
        "M/d/yy"
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
    "today": "ngayong araw",
    "now": "ngayon",
    "ok": "OK",
    "clear": "Clear",
    "month": "buwan",
    "year": "taon",
    "previousMonth": "nakaraang buwan(PageUp)",
    "nextMonth": "susunod na buwan(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "MMM d, y",
    "previousYear": "nakaraang taon(Control + left key)",
    "nextYear": "susunod na taon(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
