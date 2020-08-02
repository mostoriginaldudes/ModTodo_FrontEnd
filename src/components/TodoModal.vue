<template>
	<div>
		<div class="modal-mask" @click="$emit('off:modal')" />
		<div class="todo-modal">
			<header class="todo-modal__header">
				<span class="todo-modal__title">TODO 수정</span>
				<span @click.stop="$emit('off:modal')">
					<i class="fas fa-times" />
				</span>
			</header>
			<p class="todo-modal__p">{{ todo.todoContent }}</p>
			<form
				class="todo-modal__form"
				ref="form"
				@submit.prevent="updateTodo(todo.todoId)"
			>
				<input
					type="text"
					placeholder="수정할 일정을 입력하세요."
					v-model="newContent"
					class="todo-modal__input"
				/>
				<button type="submit" class="todo-modal__btn">내용 변경하기</button>
			</form>
		</div>
	</div>
</template>

<script>
import Bus from '@/utils/bus.js';

export default {
	data() {
		return {
			newContent: '',
		};
	},
	props: ['todo'],
	methods: {
		async updateTodo(todoId) {
			try {
				const updateConfirm = confirm('해당 내용을 수정하시겠습니까?');
				if (updateConfirm) {
					const res = await this.$store.dispatch('UPDATE_TODO', {
						todoId,
						todoContent: this.newContent,
					});

					if (res) {
						this.$parent.$data.onModal = false;
						this.newContent = '';
						Bus.$emit('update:todo');
						alert('일정을 수정하였습니다.');
					} else {
						throw new Error('일정 수정을 실패하였습니다.');
					}
				}
			} catch (err) {
				console.error(err);
				alert(err.message);
			}
		},
	},
};
</script>

<style scoped>
.modal-mask {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9998;
	background-color: rgba(0, 0, 0, 0.1);
}

.todo-modal {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 300px;
	height: 250px;
	border-radius: 10px;
	background-color: #fff;
	position: fixed;
	top: 20vw;
	left: 70vh;
	z-index: 9999;
}

.todo-modal__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 50px;
	padding: 0 20px;
	margin-bottom: 20px;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	background-color: #006ed9;
	color: #fff;
	font-weight: 600;
}

.todo-modal__p {
	width: 100%;
	font-size: 20px;
	font-weight: 600;
	text-align: center;
}

.todo-modal__form {
	display: flex;
	flex-direction: column;

	width: 100%;
	padding: 20px;
}

.todo-modal__input {
	width: 100%;
	height: 30px;
	border: 1px solid #006ed9;
	border-radius: 10px;
	margin-bottom: 20px;
	padding: 0 10px;
}

.todo-modal__btn {
	color: #fff;
	font-weight: 600;
	font-size: 20px;
	background-color: #006ed9;
	border-radius: 10px;
	width: 100%;
	height: 30px;
}
.fa-times {
	cursor: pointer;
}
</style>
