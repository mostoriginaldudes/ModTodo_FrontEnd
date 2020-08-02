<template>
	<v-app>
		<app-header />
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
	components: { AppHeader },
};
</script>

<style scoped>
@import './style/reset.css';

.main {
	max-width: 1100px;
	width: 100%;
	margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
