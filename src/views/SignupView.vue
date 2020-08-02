<template>
	<div class="signup">
		<v-container>
			<v-card>
				<v-container>
					<v-card-title>회원가입</v-card-title>
				</v-container>
				<v-form ref="signup" @submit.prevent="onSubmitSignUpForm">
					<v-row class="signup__row">
						<v-col cols="5">
							<v-container>
								<v-text-field
									label="PHONE NUMBER"
									:rules="pnRules"
									v-model="userPhoneNumber"
									required
								></v-text-field>
							</v-container>
						</v-col>
						<v-col cols="3">
							<v-container>
								<v-btn color="primary" @click="onClickPnCheck" block
									>중복확인</v-btn
								>
							</v-container>
						</v-col>
						<v-col cols="8">
							<v-container>
								<v-text-field
									label="PASSWORD"
									:rules="pwRules"
									v-model="userPassword"
									type="password"
									required
								></v-text-field>
							</v-container>
							<v-container>
								<v-text-field
									label="PASSWORD CHECK"
									:rules="pwCheckRules"
									v-model="userPwCheck"
									type="password"
									required
								></v-text-field>
								<v-container>
									<v-text-field
										label="NAME"
										v-model="userName"
										required
									></v-text-field>
								</v-container>
							</v-container>
							<v-container>
								<v-btn color="primary" block type="submit">회원가입</v-btn>
							</v-container>
						</v-col>
					</v-row>
				</v-form>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import Rules from '@/mixins/rules.js';

export default {
	mixins: [Rules],

	data() {
		return {
			userPhoneNumber: '',
			PnRedundant: true,
			userPassword: '',
			userName: '',
			userPwCheck: '',
			pwCheckRules: [
				v => v === this.userPassword || '비밀번호와 일치하지 않습니다.',
			],
		};
	},

	methods: {
		async onClickPnCheck() {
			try {
				const res = await this.$store.dispatch(
					'CHECK_PHONE_NUMBER',
					this.userPhoneNumber,
				);
				if (res) {
					this.PnRedundant = false;
					alert('사용할 수 있는 번호입니다.');
				} else {
					throw new Error('이미 가입된 번호입니다.');
				}
			} catch ({ message }) {
				alert(message);
			}
		},

		async onSubmitSignUpForm() {
			try {
				if (!this.PnRedundant && this.$refs.signup.validate()) {
					const userObj = {
						userPhoneNumber: this.userPhoneNumber,
						userPassword: this.userPassword,
						userName: this.userName,
					};
					const res = await this.$store.dispatch('SIGN_UP', userObj);

					if (res) {
						const loginRes = await this.$store.dispatch('LOG_IN', {
							userPhoneNumber: this.userPhoneNumber,
							userPassword: this.userPassword,
						});
						if (loginRes) {
							this.initForm();
							this.$router.go('/list');
						} else {
							alert('회원 정보가 일치하지 않습니다.');
						}
					}
				} else {
					alert('회원가입 양식 또는 핸드폰 번호 중복을 확인해주세요.');
				}
			} catch (err) {
				console.error(err);
			}
		},

		initForm() {
			this.userPhoneNumber = '';
			this.userPassword = '';
			this.userPwCheck = '';
			this.userName = '';
			this.PnRedundant = true;
		},
	},
};
</script>

<style scoped>
.signup {
	width: 100%;
}

.signup__row {
	display: flex;
	justify-content: center;
}
</style>
