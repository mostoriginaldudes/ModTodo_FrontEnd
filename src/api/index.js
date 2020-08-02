import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8081/',
	timeout: 1000,
	headers: {
		Authorization: JSON.parse(sessionStorage.getItem('token')) || null,
	},
});

axios.interceptors.request.use(
	function(config) {
		config.headers.Authorization =
			JSON.parse(sessionStorage.getItem('token')) || null;
		return config;
	},
	function(error) {
		return Promise.reject(error);
	},
),
	axios.interceptors.response.use(
		function(config) {
			return config;
		},
		function(error) {
			return Promise.reject(error);
		},
	);

/* Auth
----------------------------------------------------------*/

function userLogin(payload) {
	return instance.post('users/signin', payload);
}

function phoneNumCheck(payload) {
	return instance.get(`users/valid/${payload}`);
}

function userSignup(payload) {
	return instance.post('users/signup', payload);
}

function userLogout() {
	return instance.post('users/logout');
}

/* TODO
----------------------------------------------------------*/

function getTodo(month) {
	return instance.get(`todo/${month}`);
}

function addTodo(payload) {
	return instance.post('todo', payload);
}

function updateTodo({ todoId, todoContent }) {
	return instance.patch(`todo/${todoId}`, { todoContent });
}

function deleteTodo(todoId) {
	return instance.delete(`todo/${todoId}`);
}

export {
	userLogin,
	phoneNumCheck,
	userSignup,
	userLogout,
	getTodo,
	addTodo,
	updateTodo,
	deleteTodo,
};
