const mutations = {
	SET_USER(state, payload) {
		state.userName = payload;
	},

	SET_TOKEN(state, payload) {
		state.accessToken = payload;
	},

	SET_TODO(state, payload) {
		state.todoList = payload;
	},

	SET_TODAY(state, payload) {
		const pickedDayList = state.todoList.filter(
			v =>
				v.todoYear === payload.todoYear &&
				v.todoMonth === payload.todoMonth &&
				v.todoDay === payload.todoDay,
		);
		state.pickedDayList = pickedDayList;
	},

	SET_DATE(state, payload) {
		const date = payload.split('-');
		state.todayDate = {
			todoYear: parseInt(date[0]),
			todoMonth: parseInt(date[1]),
			todoDay: parseInt(date[2]),
		};
	},

	ADD_TODO(state, payload) {
		state.todoList.push(payload);
	},

	UPDATE_TODO(state, { todoId, todoContent }) {
		const newTodoList = [...state.todoList];
		const index = newTodoList.findIndex(v => v.todoId === todoId);
		newTodoList.splice(index, 1, todoContent);
		state.todoList = newTodoList;
	},

	DELETE_TODO(state, payload) {
		const newTodoList = [...state.todoList];
		const index = newTodoList.findIndex(v => v.todoId === payload.todoId);
		newTodoList.splice(index, 1);
		state.todoList = newTodoList;
	},
};

export default mutations;
