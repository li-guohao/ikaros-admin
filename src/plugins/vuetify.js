import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
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
