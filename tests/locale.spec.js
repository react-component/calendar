import React from 'react';
import { render } from 'enzyme';
import Calendar from '../src/Calendar';

const locales = {
  ar_EG: require('../src/locale/ar_EG'),
  bg_BG: require('../src/locale/bg_BG'),
  ca_ES: require('../src/locale/ca_ES'),
  cs_CZ: require('../src/locale/cs_CZ'),
  da_DK: require('../src/locale/da_DK'),
  de_DE: require('../src/locale/de_DE'),
  el_GR: require('../src/locale/el_GR'),
  en_GB: require('../src/locale/en_GB'),
  en_US: require('../src/locale/en_US'),
  es_ES: require('../src/locale/es_ES'),
  et_EE: require('../src/locale/et_EE'),
  fa_IR: require('../src/locale/fa_IR'),
  fi_FI: require('../src/locale/fi_FI'),
  fr_BE: require('../src/locale/fr_BE'),
  fr_FR: require('../src/locale/fr_FR'),
  hu_HU: require('../src/locale/hu_HU'),
  is_IS: require('../src/locale/is_IS'),
  it_IT: require('../src/locale/it_IT'),
  ja_JP: require('../src/locale/ja_JP'),
  ko_KR: require('../src/locale/ko_KR'),
  ku_IQ: require('../src/locale/ku_IQ'),
  nb_NO: require('../src/locale/nb_NO'),
  nl_BE: require('../src/locale/nl_BE'),
  nl_NL: require('../src/locale/nl_NL'),
  pl_PL: require('../src/locale/pl_PL'),
  pt_BR: require('../src/locale/pt_BR'),
  pt_PT: require('../src/locale/pt_PT'),
  ru_RU: require('../src/locale/ru_RU'),
  sk_SK: require('../src/locale/sk_SK'),
  sr_RS: require('../src/locale/sr_RS'),
  sl_SI: require('../src/locale/sl_SI'),
  sv_SE: require('../src/locale/sv_SE'),
  th_TH: require('../src/locale/th_TH'),
  tr_TR: require('../src/locale/tr_TR'),
  ug_CN: require('../src/locale/ug_CN'),
  uk_UA: require('../src/locale/uk_UA'),
  zh_CN: require('../src/locale/zh_CN'),
  zh_TW: require('../src/locale/zh_TW'),
};

describe('locales', () => {
  Object.keys(locales).forEach(localeCode => {
    it(`renders ${localeCode} correctly`, () => {
      const wrapper = render(<Calendar locale={locales[localeCode]} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
