<template>
	<ol class="todo-list" v-if="getTotalTodo.length > 0">
		<li
			class="todo-list__each"
			v-for="(todo, index) in getTotalTodo"
			:key="index"
		>
			<section class="todo-list__section">{{ todo.todoContent }}</section>
			<aside class="todo-list__aside">
				<span @click="openModal(todo)">
					<i class="fas fa-edit" />
				</span>
				<span @click="deleteTodo(todo.todoId)">
					<i class="fas fa-trash-alt" />
				</span>
			</aside>
			<todo-modal
				v-if="onModal"
				:todo="todoToUpdate"
				@off:modal="onModal = false"
			/>
		</li>
	</ol>
</template>

<script>
import TodoModal from '@/components/TodoModal.vue';
import Bus from '@/utils/bus.js';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
	components: {
		TodoModal,
	},

	data() {
		return {
			onModal: false,
			newContent: '',
			todoToUpdate: {},
			pickedDay: {},
		};
	},

	computed: {
		...mapState({
			pickedDayList: state => state.pickedDayList,
			todayDate: state => state.todayDate,
			getTotalTodo: state =>
				state.todoList.filter(
					v =>
						v.todoYear == state.todayDate.todoYear &&
						v.todoMonth == state.todayDate.todoMonth &&
						v.todoDay == state.todayDate.todoDay,
				),
		}),
	},

	methods: {
		...mapMutations(['SET_TODAY']),

		...mapActions(['DELETE_TODO']),

		setDate(changedDate) {
			const date = new Date(changedDate);
			const dateObj = {
				todoYear: date.getFullYear(),
				todoMonth: date.getMonth() + 1,
				todoDay: date.getDate(),
			};
			this.pickedDay = dateObj;
			this.SET_TODAY(dateObj);
		},

		async deleteTodo(id) {
			try {
				const deleteConfirm = confirm('해당 내용을 삭제하시겠습니까?');
				if (deleteConfirm) {
					const res = await this.DELETE_TODO(id);
					if (res) {
						alert('일정을 삭제하였습니다.');
						Bus.$emit('update:todo');
					} else {
						throw new Error('일정 삭제를 실패하였습니다.');
					}
				}
			} catch (err) {
				console.error(err);
				alert(err.message);
			}
		},

		openModal(todo) {
			this.todoToUpdate = todo;
			this.onModal = true;
		},
	},

	mounted() {
		Bus.$on('set-date', this.setDate);
	},

	beforeDestroy() {
		Bus.$off('set-date', this.setDate);
	},
};
</script>

<style scoped>
.todo-list {
	width: 450px;
	height: 450px;
	overflow: scroll;
}

.todo-list__each {
	height: 38px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border: 1px solid #006ed9;
	border-radius: 20px;
	margin-bottom: 10px;
	font-weight: 600;
}

.todo-list__section {
	width: 300px;
	height: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
}

/* 아이콘 */
.fa-edit {
	color: blue;
	cursor: pointer;
}

.fa-trash-alt {
	color: red;
	cursor: pointer;
}
</style>
