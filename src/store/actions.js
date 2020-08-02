import {
	userLogin,
	phoneNumCheck,
	userSignup,
	userLogout,
	getTodo,
	addTodo,
	updateTodo,
	deleteTodo,
} from '../api/index.js';

const actions = {
	async LOG_IN({ commit }, payload) {
		try {
			const {
				status,
				headers: { authorization },
				data,
			} = await userLogin(payload);

			if (status === 200) {
				commit('SET_USER', data);
				commit('SET_TOKEN', authorization);
				sessionStorage.setItem('token', JSON.stringify(authorization));
				sessionStorage.setItem('user', JSON.stringify(data));
				return true;
			} else {
				throw new Error('입력하신 정보와 일치하는 회원이 없습니다.');
			}
		} catch (err) {
			alert(err.message);
			throw new Error(err);
		}
	},

	async CHECK_PHONE_NUMBER(context, payload) {
		try {
			const { data } = await phoneNumCheck(payload);
			return data;
		} catch (err) {
			console.error(err);
		}
	},

	async SIGN_UP({ commit }, payload) {
		try {
			const { status } = await userSignup(payload);

			if (status === 200 || status === 201) {
				commit('SET_USER', payload.userName);
				return true;
			}
		} catch (err) {
			alert(err.message);
			throw new Error(err);
		}
	},

	async LOG_OUT({ commit }) {
		try {
			const confirmLogOut = confirm('로그아웃 하시겠습니까?');
			if (confirmLogOut) {
				commit('SET_USER', null);
				sessionStorage.clear();
				alert('로그아웃을 완료하였습니다.');
			}
		} catch (err) {
			console.error(err);
		}
	},

	async FETCH_TODO({ commit }, payload) {
		try {
			const { data } = await getTodo(payload);
			commit('SET_TODO', data);
			return data;
		} catch (error) {
			console.error(error);
		}
	},

	async ADD_TODO({ commit }, payload) {
		try {
			const { data } = await addTodo(payload);
			const newTodo = { ...payload, todoId: data };
			commit('ADD_TODO', newTodo);
			return true;
		} catch (err) {
			console.error(err);
			throw new Error('실패');
		}
	},

	async UPDATE_TODO({ commit }, payload) {
		try {
			await updateTodo(payload);
			commit('UPDATE_TODO', payload);
			return true;
		} catch (err) {
			console.error(err);
		}
	},

	async DELETE_TODO({ commit }, todoId) {
		try {
			await deleteTodo(todoId);
			commit('DELETE_TODO', todoId);
			return true;
		} catch (err) {
			console.error(err);
		}
	},
};

export default actions;
