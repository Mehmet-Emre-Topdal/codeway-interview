import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUser)



createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(store).mount('#app')

