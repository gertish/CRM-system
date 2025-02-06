<template>
	<div class="section-title">
		<p class="title">{{ title }}</p>
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		title: {
			type: String,
			required: true,
		},
	});
</script>

<style lang="scss">
	.title {
		font-size: 21px;
		font-weight: 600;
		color: #092c4c;
	}
</style>
