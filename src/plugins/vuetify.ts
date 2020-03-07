import Vue from "vue";
import Vuetify from "vuetify/lib";
import { ja, en } from "vuetify/src/locale";
Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { ja, en },
        current: 'ja'
    }
});
