import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './App.vue';

import store from './store/store.js';
import router from './routes/index.js';
import vuetify from './plugins/vuetify.js';

new Vue({
	store,
	router,
	vuetify,
	render: h => h(App),
}).$mount('#app');
