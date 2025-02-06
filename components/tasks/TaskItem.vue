<template>
	<div class="task-item">
		<div class="task-item__info">
			<div class="task-item__indicator">
				<img :src="statusIcons[task.status]" alt="" />
			</div>
			<p>{{ formattedDate }}</p>
			<p>{{ task.description }}</p>
			<nuxt-link :to="`/EditTasks/${task.id}`">
				<div class="task-actions">
				<img src="@/assets/icons/Addition.svg" alt="" />
			</div>
			</nuxt-link>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from "vue";
	import { formateDate } from "~/utils/formatDate";
	import Pending from "@/assets/icons/Tasks-checked.svg";
	import Completed from "@/assets/icons/Icon-Check.svg";

	const statusIcons = {
		Pending: Pending,
		Completed: Completed,
	};

	const props = defineProps<{
		task: {
			id: string,
			description: string;
			dueDate: string;
			status: 'Pending' | 'Completed';
		};
	}>();

	const formattedDate = computed(() => formateDate(props.task.dueDate));
</script>

<style lang="scss" scoped>
	.task-item {
		border-top: 1px solid #e6e9f0;
		display: flex;
		align-items: center;
		padding: 14px 24px 14px 12px;

		p {
			color: #092c4c;
		}

		.task-item__info {
			display: grid;
			align-items: center;
			grid-template-columns: 2.6fr 18fr 53fr 0fr;
		}
	}
</style>
