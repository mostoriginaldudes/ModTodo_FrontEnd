<template>
	<ul class="todo-view">
		<li class="todo-view__li todo-calender">
			<todo-calender></todo-calender>
		</li>
		<li class="todo-view__li todo-input">
			<todo-input></todo-input>
			<todo-list></todo-list>
		</li>
	</ul>
</template>

<script>
import TodoCalender from '@/components/TodoCalender.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';

export default {
	components: {
		TodoCalender,
		TodoInput,
		TodoList,
	},
};
</script>

<style scoped>
.todo-view {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
}
.todo-view__li.todo-input {
	width: 100%;
}
</style>
