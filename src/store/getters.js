const getters = {
	isLoggedIn(state) {
		return !!state.userName && !!state.accessToken;
	},
	getTotalTodo(state) {
		return state.todoList;
	},
	getDayTodo(state) {
		return state.pickedDayList;
	},
};

export default getters;
