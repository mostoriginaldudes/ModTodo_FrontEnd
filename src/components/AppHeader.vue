<template>
	<header class="header">
		<ul class="header__ul">
			<li class="header__li">
				{{
					isLoggedIn ? `${userName}님 안녕하세요 :)` : '로그인이 필요합니다 :('
				}}
			</li>
			<li v-if="isLoggedIn" class="header__li">
				<v-btn @click="userLogOut">
					로그아웃
				</v-btn>
			</li>
		</ul>
	</header>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState({
			isLoggedIn: state => !!state.accessToken && !!state.userName,
		}),

		userName() {
			return this.$store.state.userName;
		},
	},
	methods: {
		async userLogOut() {
			await this.$store.dispatch('LOG_OUT');
			this.$router.go('/login');
			// 왜 라우터 푸쉬는 안되는지?
		},
	},
};
</script>

<style scoped>
.header {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 50px;
	margin-bottom: 100px;
	padding-right: 20px;
	background-color: #006ed9;
	color: #fff;
}

.header__ul {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
