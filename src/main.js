import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import vueDebounce from 'vue-debounce'

import Popover  from 'vue-js-popover'
import Notifications from 'vue-notification'
import SvgIcon from './components/UILibrary/SvgIcon'
import BreadCrumbs from './components/UILibrary/BreadCrumbs'
import BaseButton from './components/UILibrary/Buttons/BaseButton'
import BaseCheckbox from './components/UILibrary/Checkboxs/BaseCheckbox'
import BaseSelect from './components/UILibrary/Selects/BaseSelect'
import BaseInput from './components/UILibrary/Inputs/BaseInput'
import NumberInput from './components/UILibrary/Inputs/NumberInput'
import BaseTextarea from './components/UILibrary/BaseTextarea'
import SelectFilterInput from './components/UILibrary/Selects/SelectFilterInput'
import SelectFilterInputNew from './components/UILibrary/Selects/SelectFilterInputNew'
import Loader from './components/UILibrary/Loader'
import wysiwyg from "vue-wysiwyg";
import * as VueGoogleMaps from 'vue2-google-maps'
// Floara plugins
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/table.min.css';
import 'froala-editor/css/plugins/char_counter.min.css';
import 'froala-editor/css/plugins/code_view.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/draggable.min.css';
import 'froala-editor/css/third_party/embedly.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';
import 'froala-editor/css/plugins/file.min.css';
import 'froala-editor/css/plugins/fullscreen.min.css';
import 'froala-editor/css/plugins/help.min.css';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/image_manager.min.css';
import 'froala-editor/css/third_party/image_tui.min.css';
import 'froala-editor/css/plugins/line_breaker.min.css';
import 'froala-editor/css/plugins/quick_insert.min.css';
import 'froala-editor/css/plugins/special_characters.min.css';
// import 'froala-editor/css/plugins/spell_checker.min.css';
import 'froala-editor/css/plugins/table.min.css';
import 'froala-editor/css/plugins/video.min.css';



import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/entities.min.js';
import 'froala-editor/js/plugins/file.min.js';
// import 'froala-editor/js/plugins/font_awesome.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/help.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/plugins/inline_class.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/print.min.js';
import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/save.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';
// import 'froala-editor/js/third_party/spell_checker.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';















import VueFroala from 'vue-froala-wysiwyg';










// Vue plugins
Vue.use(Notifications)
Vue.use(Popover)
Vue.use(vueDebounce)
Vue.use(wysiwyg, {});
Vue.use(VueFroala,{key: "WE1B5dG3F4A3A7C10B6cbnmhmkaB6B-13fC-9yC-7A3md1C-13mD6F5F4I4E1A9A6C3C4F4=="})

// Global Registry components
Vue.component('SvgIcon', SvgIcon)
Vue.component('BreadCrumbs', BreadCrumbs)
Vue.component('BaseButton', BaseButton)
Vue.component('BaseCheckbox', BaseCheckbox)
Vue.component('BaseSelect', BaseSelect)
Vue.component('BaseInput', BaseInput)
Vue.component('SelectFilterInput', SelectFilterInput)
Vue.component('SelectFilterInputNew', SelectFilterInputNew)
Vue.component('Loader', Loader)
Vue.component('BaseTextarea', BaseTextarea)
Vue.component('NumberInput', NumberInput)

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAXkB_Bkau0r3hT-CWAvzB2Dja8r-wNjiw',
        libraries: 'places', // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
