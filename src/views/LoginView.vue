<template>
	<div class="login">
		<v-container>
			<v-row class="login__row">
				<v-col cols="6">
					<v-container>
						<v-card>
							<v-card-title>로그인</v-card-title>
							<v-form ref="login" @submit.prevent="onClickUserLogIn">
								<v-container>
									<v-text-field
										v-model="loginPn"
										label="PHONE NUMBER"
										:rules="pnRules"
										dense
										required
									></v-text-field>
								</v-container>
								<v-container>
									<v-text-field
										v-model="loginPw"
										label="PASSWORD"
										:rules="pwRules"
										dense
										required
									></v-text-field>
								</v-container>
								<v-container>
									<v-btn block color="primary" type="submit">
										로그인 하기
									</v-btn>
								</v-container>
							</v-form>
						</v-card>
					</v-container>
				</v-col>
				<v-col cols="6">
					<v-container>
						<v-card height="270" class="login__signup">
							<v-card-title>회원가입</v-card-title>
							<v-container>
								<v-card-subtitle>
									MOD TODOLIST에 오신 것을 환영합니다 :)
								</v-card-subtitle>
								<v-card-subtitle>
									회원가입을 하시고 서비스를 이용하실 수 있습니다.
								</v-card-subtitle>
							</v-container>
							<v-container>
								<v-btn block color="primary" @click="onClickSignUp">
									회원가입 하기
								</v-btn>
							</v-container>
						</v-card>
					</v-container>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import Rules from '@/mixins/rules.js';

export default {
	mixins: [Rules],

	data() {
		return {
			loginPn: '',
			loginPw: '',
		};
	},

	methods: {
		async onClickUserLogIn() {
			try {
				if (this.$refs.login.validate()) {
					const res = await this.$store.dispatch('LOG_IN', {
						userPhoneNumber: this.loginPn,
						userPassword: this.loginPw,
					});
					if (!!res) {
						this.loginPn = '';
						this.loginPw = '';
						this.$router.go('/list');
					}
				} else {
					alert('로그인 양식을 완성하여 주십시오.');
				}
			} catch ({ message }) {
				alert(message);
			}
		},

		onClickSignUp() {
			this.$router.push('/signup');
		},
	},
};
</script>

<style scoped>
.login {
	width: 100%;
	margin: 0 auto;
}

.login__row {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
}

.login__signup {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
