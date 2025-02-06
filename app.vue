<template>
	<div class="app">
		<NuxtLayout />
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, onUnmounted } from "vue";

	const disableScroll = () => {
		document.body.style.overflow = "hidden";
	};

	const enableScroll = () => {
		document.body.style.overflow = "";
	};

	onMounted(() => {
		disableScroll();
	});

	onUnmounted(() => {
		enableScroll();
	});
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html,
	body {
		background-color: #e5e5e5;
		font-family: "Rubik", sans-serif;
	}

	.app {
		width: 1500px;
		height: 910px;
		margin: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
