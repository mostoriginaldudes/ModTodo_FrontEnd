import store from '../store/store.js';

export const requireAuth = () => (to, from, next) => {
	if (store.state.accessToken) {
		next();
		return;
	}
	next('/login');
};

export const passByAuth = () => (to, from, next) => {
	if (store.state.accessToken) {
		next('/');
		return;
	}
	next();
};
