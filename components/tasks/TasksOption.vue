<template>
	<div class="tasks-opt">
		<div class="tasks-opt__img">
			<img src="@/assets/icons/Tasks-checked.svg" alt="" />
		</div>
		<div v-for="(opt, index) in option" :key="index">
			{{ opt }}
		</div>
	</div>
</template>

<script lang="ts" setup>
	defineProps<{
		option: string[];
	}>();
</script>

<style lang="scss">
	.tasks-opt {
		display: grid;
		align-items: center;
		padding: 14px 24px 14px 7px;
		color: #7e92a2;
		font-weight: 400;
		grid-template-columns: 0.2fr 1.2fr 3.5fr 0fr;
	}
</style>
