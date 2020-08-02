<template>
	<div class="todo-input">
		<v-container>
			<v-form @submit.prevent="onSubmitToDo">
				<v-row>
					<v-col cols="8">
						<v-text-field
							label="할 일을 입력하세요:)"
							v-model="newContent"
							outlined
							required
						>
						</v-text-field>
					</v-col>
					<v-col cols="2">
						<v-container>
							<v-btn color="primary" type="submit">
								할일 추가
							</v-btn>
						</v-container>
					</v-col>
				</v-row>
			</v-form>
		</v-container>
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

	methods: {
		onSubmitToDo() {
			const trimmedContent = this.newContent.replace(/ /g, '');
			if (trimmedContent.length > 0) {
				Bus.$emit('add:new-todo', this.newContent);
			} else {
				alert('내용이 존재하지 않습니다.');
			}
			this.newContent = '';
		},
	},
};
</script>

<style scoped>
.todo-input {
	width: 100%;
}
</style>
