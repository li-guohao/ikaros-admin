import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors' 

// Vuetify i18n 
import zhHans from 'vuetify/es5/locale/zh-Hans' // zhHans-Chinese
import en from 'vuetify/es5/locale/en' // en-English
import ja from 'vuetify/es5/locale/ja' // ja-Japanese


Vue.use(Vuetify);

export default new Vuetify({
  lang: { //i18n 当前默认为中文
    locales: { zhHans, en, ja },
    current: 'zhHans',
  },
  theme: { 
      dark: false,//是否开启深色模式
      themes: {
          light: { 
            primary: colors.blueGrey.lighten2,
            secondary: colors.grey.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
          }, // 浅色模式颜色配置
          dark: {
            primary: colors.shades.black,
          },// 深色模式颜色配置
        },
    }, 
});
