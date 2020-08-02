const state = {
	accessToken: JSON.parse(sessionStorage.getItem('token')) || null,
	userName: JSON.parse(sessionStorage.getItem('user')) || null,
	todoList: [],
	pickedDayList: [],
	todayDate: {},
};

export default state;
