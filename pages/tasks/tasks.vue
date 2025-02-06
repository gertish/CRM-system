<template>
	<div class="tasks">
		<SortingHeader :total="tasks.length" :title="`tasks`" :sortOptions="dealSortOptions" @sortChange="handleSortChange" />

		<TasksOption :option="option" :ImageUrl="ImageUrl"/>
		<div v-if="tasks.length > 0">
			<TaskItem v-for="task in processedTasks" :key="task.id" :task="task" />
		</div>
		<div class="task__not-found" v-else>
			<img src="@/assets/icons/TaskNotFound.svg" alt="">
			<p>No task found.</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, provide } from "vue";
import { $fetch } from "ofetch";
import type { Task } from "~/types/tasks.d.ts";
import IconUrl from "@/assets/icons/Icon.svg";
const option = ["Due Date", "Task", "Edit"];
const ImageUrl = IconUrl;
const dealSortOptions = ["Due Date", "Task Name", "Status: Pending", "Status: Completed"];

const tasks = ref<Task[]>([])
const selectedSortOption = ref<string>("Due Date");

const fetchTasks = async () => {
	try {
		const res = await $fetch<Task[]>("/api/tasks");
		tasks.value = res || [];
	} catch (e) {
		console.log("Ошибка при загрузке задач:", e);
	}
};

const handleSortChange = (option: string) => {
	selectedSortOption.value = option;
};

const processedTasks = computed(() => {
	const temp = [...tasks.value];

if(selectedSortOption.value.startsWith('Status:')){
const status = selectedSortOption.value.replace('Status:', '').trim().toLowerCase();
return temp.filter((task:Task) => task.status.toLowerCase() === status);
}

	if(selectedSortOption.value === "Due Date"){
		return temp.sort((a: Task, b: Task) => +new Date(a.dueDate) - +new Date(b.dueDate));
	}

	if(selectedSortOption.value === "Task Name"){
		return temp.sort((a: Task, b: Task) => a.description.localeCompare(b.description));
	}
	return temp;
});

provide('tasks', tasks)
onMounted(fetchTasks);
</script>

<style lang="scss">
.tasks {
	padding: 34px 24px 24px;
	display: flex;
	flex-direction: column;
	height: 750px;
	overflow-y: auto;

	.task__not-found {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
		height: 100%;

		img {
			height: 50px;
			width: 50px;
		}

		p {
			font-size: 50px;
			color: #7e92a2;
			font-weight: 400;
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
