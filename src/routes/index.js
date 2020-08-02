import Vue from 'vue';
import VueRouter from 'vue-router';
import { requireAuth, passByAuth } from './navGuard.js';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			alias: '/list', //redirect속성을 적용하면 beforeEnter시 내맘대로 작동안한다... 원인찾기
			component: () => import('@/views/TodolistView.vue'),
			// beforeEnter: requireAuth(),
		},
		{
			path: '/login',
			component: () => import('@/views/LoginView.vue'),
			// beforeEnter: passByAuth(),
		},
		{
			path: '/signup',
			component: () => import('@/views/SignupView.vue'),
			// beforeEnter: passByAuth(),
		},
	],
});

export default router;
