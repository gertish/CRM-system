<template>
	<div class="tasks-list">
		<div class="tasks-list__wrapper">
			<div class="tasks-list__header">
				<h2>Tasks To Do</h2>
				<p>View All</p>
			</div>

			<div class="tasks-list__content">
				<div v-for="task in tasks" :key="task.id" class="tasks-list__task">
					<div class="tasks-list__date">
						<span>{{ formateDate(task.dueDate) }}</span>
						<img :src="statusIcons[task.status]" alt="" />
					</div>
					<p>{{ task.description }}</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Task } from '~/types/task';
import { $fetch } from 'ofetch';
import { formateDate } from '~/utils/formatDate';
import Pending from "@/assets/icons/Tasks-checked.svg";
import Completed from "@/assets/icons/Icon-Check.svg";
const tasks = ref<Task[]>([]);

const statusIcons: Record<string, string> = {
	Pending: Pending,
	Completed: Completed,
};


const fetchTasks = async () => {
	try {
		const res = await $fetch<Task[]>('/api/tasks');
		tasks.value = res || [];
	} catch (e) {
		console.log("Ошибка при загрузке задач:", e);
	}
};

onMounted(() => {
	fetchTasks();
});

</script>

<style lang="scss">
	.tasks-list {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 350px;
		margin-left: 13px;
		border-radius: 12px;
		box-shadow: 0 0 0 1.5px #eaeef4;
		border: none;
		background-color: #ffffff;
		overflow-y: auto;

		.tasks-list__wrapper {
			padding: 24px 24px 0px 24px;
			.tasks-list__header {
				display: flex;
				align-items: center;
				justify-content: space-between;

				h2 {
					color: #092c4c;
				}

				p {
					color: #514ef3;
				}
			}

			.tasks-list__content {
				margin-top: 12px;
				

				.tasks-list__task {
					display: grid;
					grid-template-columns: 150px auto;
					align-items: center;
					gap: 8px;
					margin-bottom: 20px;
					font-weight: 400;
					color: #7e92a2;


					p {
						color: #092c4c;
					}

					.tasks-list__date {
						display: flex;
						gap: 25px;
					}
				}

			}
		}

		.tasks-list__footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 24px 16px 24px;
			border-top: 1px solid #e6e9f0;
			text-align: center;
			color: #7e92a2;
			background-color: #fff;
			cursor: pointer;

			.tasks-list__add-task {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 5px;
				font-weight: 300;
				font-size: 17px;
				color: #7e92a2;

				span {
					color: #514ef3;
					font-weight: bold;
				}
			}
		}
		&::-webkit-scrollbar{
width: 16px;
height: 16px;
}
&::-webkit-scrollbar-thumb {
	background-color: #d1cfcf;
	border-radius: 16px;
}
	}
</style>
