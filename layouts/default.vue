<template>
	<div class="layout">
		<div
			class="layout__header"
			:class="{
				'layout__header--gradient':
					route.path === '/' || route.path === '/customerDetails/customerDetails',
			}"
		>
			<Header />
		</div>
		<div class="layout__body">
			<div class="layout__navbar">
				<Navbar />
			</div>
			<div
				class="layout__page"
				:class="{
					'layout__page--gradient':
						route.path === '/' || route.path === '/customerDetails/customerDetails',
				}"
			>
				<NuxtPage />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useRoute } from "vue-router";

	const route = useRoute();
</script>

<style lang="scss">
	.layout {
		&__header {
			background-color: #f6fafd;

			&--gradient {
				background: linear-gradient(to right, #f6fafd 0%, #f6fafd 71.3%, #eef6fb 0%);
			}
		}

		&__body {
			display: flex;
		}

		&__navbar {
			background-color: #eaeaea;
		}

		&__page {
			padding: 20px;
			border-left: 1px #e6e9f0 solid;
			width: 100%;
			background-color: #f6fafd;

			&--gradient {
				background: linear-gradient(to left, #eef6fb 0%, #eef6fb 30.5%, #f6fafd 30%);
			}
		}
	}
</style>
