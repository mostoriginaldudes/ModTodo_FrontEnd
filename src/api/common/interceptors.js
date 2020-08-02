import store from '../../store/store.js';

export const setInterceptors = instance => {
	instance.interceptors.request.use(
		function(config) {
			config.headers.Authorization = store.state.accessToken;
			return config;
		},
		function(error) {
			return Promise.reject(error);
		},
	),
		instance.interceptors.response.use(
			function(response) {
				return response;
			},
			function(error) {
				return Promise.reject(error);
			},
		);
};
