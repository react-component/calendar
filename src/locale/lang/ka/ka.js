//language=格鲁吉亚文
var iFormat ={
    "eras": [
        "ძველი წელთაღრიცხვით",
        "ახალი წელთაღრიცხვით"
    ],
    "months": [
        "იანვარი",
        "თებერვალი",
        "მარტი",
        "აპრილი",
        "მაისი",
        "ივნისი",
        "ივლისი",
        "აგვისტო",
        "სექტემბერი",
        "ოქტომბერი",
        "ნოემბერი",
        "დეკემბერი"
    ],
    "shortMonths": [
        "იან",
        "თებ",
        "მარ",
        "აპრ",
        "მაი",
        "ივნ",
        "ივლ",
        "აგვ",
        "სექ",
        "ოქტ",
        "ნოე",
        "დეკ"
    ],
    "weekdays": [
        "კვირა",
        "ორშაბათი",
        "სამშაბათი",
        "ოთხშაბათი",
        "ხუთშაბათი",
        "პარასკევი",
        "შაბათი"
    ],
    "shortWeekdays": [
        "კვი",
        "ორშ",
        "სამ",
        "ოთხ",
        "ხუთ",
        "პარ",
        "შაბ"
    ],
    "veryShortWeekdays": [
        "კ",
        "ო",
        "ს",
        "ო",
        "ხ",
        "პ",
        "შ"
    ],
    "ampms": [
        "AM",
        "PM"
    ],
    "datePatterns": [
        "EEEE, dd MMMM, y",
        "d MMMM, y",
        "dd.MM.yy",
        "dd.MM.yy"
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
    "today": "დღეს",
    "now": "ახლა",
    "ok": "OK",
    "clear": "Clear",
    "month": "თვე",
    "year": "წელი",
    "previousMonth": "გასულ თვეს(PageUp)",
    "nextMonth": "მომავალ თვეს(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d MMM. y",
    "previousYear": "გასულ წელს(Control + left key)",
    "nextYear": "მომავალ წელს(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
