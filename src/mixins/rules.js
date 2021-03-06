export default {
	data() {
		return {
			pnRules: [
				v => /^[0-9]+$/gi.test(v) || '숫자만 입력하세요.',
				v => /^01+[0-9]+$/gi.test(v) || '휴대폰 번호 형식이 올바르지 않습니다.',
				v =>
					(10 <= v.length && v.length <= 11) ||
					'휴대폰 번호 자릿수를 확인해주세요.',
			],
			pwRules: [
				v =>
					/^[a-zA-Z0-9]+/gi.test(v) ||
					'숫자와 알파벳의 조합으로 7자리 이상 11자리 이하의 자릿수로 이루어진 비밀번호를 작성하세요.',
			],
		};
	},
};
