//language=泰卢固文
var iFormat ={
    "eras": [
        "క్రీస్తు పూర్వం",
        "క్రీస్తు శకం"
    ],
    "months": [
        "జనవరి",
        "ఫిబ్రవరి",
        "మార్చి",
        "ఏప్రిల్",
        "మే",
        "జూన్",
        "జులై",
        "ఆగస్టు",
        "సెప్టెంబర్",
        "అక్టోబర్",
        "నవంబర్",
        "డిసెంబర్"
    ],
    "shortMonths": [
        "జన",
        "ఫిబ్ర",
        "మార్చి",
        "ఏప్రి",
        "మే",
        "జూన్",
        "జులై",
        "ఆగ",
        "సెప్టెం",
        "అక్టో",
        "నవం",
        "డిసెం"
    ],
    "weekdays": [
        "ఆదివారం",
        "సోమవారం",
        "మంగళవారం",
        "బుధవారం",
        "గురువారం",
        "శుక్రవారం",
        "శనివారం"
    ],
    "shortWeekdays": [
        "ఆది",
        "సోమ",
        "మంగళ",
        "బుధ",
        "గురు",
        "శుక్ర",
        "శని"
    ],
    "veryShortWeekdays": [
        "ఆ",
        "సో",
        "మ",
        "బు",
        "గు",
        "శు",
        "శ"
    ],
    "ampms": [
        "[AM]",
        "[PM]"
    ],
    "datePatterns": [
        "d, MMMM y, EEEE",
        "d MMMM, y",
        "dd-MM-yy",
        "dd-MM-yy"
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
    "today": "ఈ రోజు",
    "now": "ప్రస్తుతం",
    "ok": "OK",
    "clear": "Clear",
    "month": "నెల",
    "year": "సంవత్సరం",
    "previousMonth": "గత నెల(PageUp)",
    "nextMonth": "తదుపరి నెల(PageDown)",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "y",
    "monthFormat": "M",
    "dateFormat": "d, MMM y",
    "previousYear": "గత సంవత్సరం(Control + left key)",
    "nextYear": "తదుపరి సంవత్సరం(Control + right key)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
};
data.format = iFormat["default"];
exports["default"] = data;
module.exports = exports["default"];
