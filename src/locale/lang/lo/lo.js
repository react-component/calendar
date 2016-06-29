//language=老挝文
var iFormat ={
    "eras": [
        "ກ່ອນຄຣິດສັກກະລາດ",
        "ຄຣິດສັກກະລາດ"
    ],
    "months": [
        "ມັງກອນ",
        "ກຸມພາ",
        "ມີນາ",
        "ເມສາ",
        "ພຶດສະພາ",
        "ມິຖຸນາ",
        "ກໍລະກົດ",
        "ສິງຫາ",
        "ກັນຍາ",
        "ຕຸລາ",
        "ພະຈິກ",
        "ທັນວາ"
    ],
    "shortMonths": [
        "ມ.ກ.",
        "ກ.ພ.",
        "ມ.ນ.",
        "ມ.ສ.",
        "ພ.ພ.",
        "ມິ.ຖ.",
        "ກ.ລ.",
        "ສ.ຫ.",
        "ກ.ຍ.",
        "ຕ.ລ.",
        "ພ.ຈ.",
        "ທ.ວ."
    ],
    "weekdays": [
        "ວັນອາທິດ",
        "ວັນຈັນ",
        "ວັນອັງຄານ",
        "ວັນພຸດ",
        "ວັນພະຫັດ",
        "ວັນສຸກ",
        "ວັນເສົາ"
    ],
    "shortWeekdays": [
        "ວັນອາທິດ",
        "ວັນຈັນ",
        "ວັນອັງຄານ",
        "ວັນພຸດ",
        "ວັນພະຫັດ",
        "ວັນສຸກ",
        "ວັນເສົາ"
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
        "ກ່ອນທ່ຽງ",
        "ຫຼັງທ່ຽງ"
    ],
    "datePatterns": [
        "EEEE ທີ d MMMM G y",
        "d MMMM y",
        "d/M/y",
        "d/M/y"
    ],
    "timePatterns": [
        "H ໂມງ m ນາທີ ss ວິນາທີ zzzz",
        "H ໂມງ m ນາທີ ss ວິນາທີ z",
        "H:mm:ss",
        "H:mm"
    ],
    "dateTimePattern": "{date} {time}"
};
Object.defineProperty(exports, "__esModule", {value: true});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
iFormat = _interopRequireDefault(iFormat);
var data = {
    "today": "ມື້ນີ້",
    "now": "ຕອນນີ້",
    "ok": "OK",
    "clear": "Clear",
    "month": "ເດືອນ",
    "year": "ປີ",
    "previousMonth": "ເດືອນແລ້ວ(PageUp)",
    "nextMonth": "ເດືອນໜ້າ(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM y",
    "previousYear": "ປີກາຍ(Control + left key)",
    "nextYear": "ປີໜ້າ(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
