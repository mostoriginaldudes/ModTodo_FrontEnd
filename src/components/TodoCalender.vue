<template>
	<div class="calendar">
		<v-row class="fill-height">
			<v-col>
				<v-sheet width="800" height="64">
					<v-toolbar flat color="white">
						<v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"
							>Today</v-btn
						>
						<v-btn fab text small color="grey darken-2" @click="prev">
							<v-icon small>mdi-chevron-left</v-icon>
						</v-btn>
						<v-btn fab text small color="grey darken-2" @click="next">
							<v-icon small>mdi-chevron-right</v-icon>
						</v-btn>
						<v-toolbar-title v-if="$refs.calendar">
							{{
								$refs.calendar.title
									.split(' ')
									.reverse()
									.join(' ')
							}}
						</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-toolbar>
				</v-sheet>
				<v-sheet width="800" height="500">
					<v-calendar
						ref="calendar"
						v-model="focus"
						color="primary"
						:events="todos"
						:event-color="getEventColor"
						:type="'month'"
						@change="updateRange"
					></v-calendar>
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import dummy from '@/static/dummy.js';
import Bus from '@/utils/bus.js';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
	data: () => ({
		todos: [],
		focus: '',
		today: '',
		colors: ['red', 'green', 'blue', 'orange'],
	}),

	computed: {
		...mapGetters(['getTotalTodo']),
	},

	methods: {
		...mapMutations(['SET_DATE']),

		...mapActions(['FETCH_TODO', 'ADD_TODO']),

		viewDay({ date }) {
			this.focus = date;
		},

		getEventColor() {
			return this.colors[Math.floor(Math.random() * 4)];
		},

		setToday() {
			this.focus = this.today;
		},

		prev() {
			this.$refs.calendar.prev();
		},

		next() {
			this.$refs.calendar.next();
		},

		async updateCalendar(month) {
			try {
				const todos = [];
				const res = await this.FETCH_TODO(month);
				res.forEach(v => {
					const currentDate = new Date(
						`${v.todoYear}-${
							v.todoMonth < 10 ? '0' + v.todoMonth : v.todoMonth
						}-${v.todoDay < 10 ? '0' + v.todoDay : v.todoDay}T00:00:00`,
					);

					const newObj = {
						name: v.todoContent,
						start: currentDate,
						end: currentDate,
						color: this.colors[Math.floor(Math.random() * 4)],
						timed: false,
					};
					todos.push(newObj);
				});
				this.todos = todos;
			} catch (err) {
				console.error(err);
			}
		},

		updateRange({ start: { month } }) {
			this.updateCalendar(month);
		},

		getPickedDate(selectedDate) {
			const date = new Date(selectedDate);
			const todoYear = date.getFullYear();
			const todoMonth = date.getMonth() + 1;
			const todoDay = date.getDate();

			return {
				todoYear,
				todoMonth,
				todoDay,
				ymd: `${todoYear}-${todoMonth + 1 < 10 ? '0' + todoMonth : todoMonth}-${
					todoDay < 10 ? '0' + todoDay : todoDay
				}`,
			};
		},

		async addNewTodo(todoContent) {
			try {
				const { todoYear, todoMonth, todoDay } = this.getPickedDate(this.focus);

				const newTodo = {
					todoYear,
					todoMonth,
					todoDay,
					todoContent,
				};

				const res = await this.ADD_TODO(newTodo);
				if (res) {
					alert('일정을 추가하였습니다.');
					this.updateCalendar(todoMonth);
				}
			} catch (err) {
				console.error(err);
				alert('일정 추가를 실패하였습니다.');
			}
		},
	},

	created() {
		const dateObj = this.getPickedDate(Date());
		this.today = dateObj.ymd;
		this.focus = this.today;
		Bus.$emit('set-date', this.today);
		this.SET_DATE(this.today);
		this.updateCalendar(dateObj.todoMonth);
	},

	mounted() {
		this.$refs.calendar.checkChange();
		Bus.$on('add:new-todo', this.addNewTodo);
		Bus.$on('update:todo', () =>
			this.updateCalendar(this.getPickedDate(this.focus).todoMonth),
		);
	},

	watch: {
		focus(newVal, oldVal) {
			Bus.$emit('set-date', newVal);
			this.SET_DATE(newVal);
		},
	},
};
</script>

<style scoped>
.calendar {
	width: 100%;
	margin: 0 20px;
}
</style>
