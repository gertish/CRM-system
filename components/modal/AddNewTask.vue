<template>
	<div class="add-tasks-overlay" @click="$emit('close')">
		<div class="add-tasks-modal" @click.stop>
			<div class="add-tasks-modal__header">
				<h4>Add New Task</h4>
				<img @click="$emit('close')" src="@/assets/icons/Close.svg" alt="" />
			</div>

			<div class="add-tasks-modal__content">
				<div class="add-tasks-description">
					<input
						v-model="description"
						type="text"
						placeholder="Enter tasks description"
					/>
				</div>
				<div class="add-tasks-due-date">
					<h4>Due Date</h4>
					<input v-model="dueDate" type="text" placeholder="Due date" />
				</div>
			</div>
			<div>
				<div class="add-tasks-modal__buttons">
					<button class="buttons__cancel" @click="$emit('close')"> Cancel </button>
					<button class="buttons__save" @click="saveTasks">Save Task</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { $fetch } from "ofetch";
	import { ref } from "vue";
	import type { Task } from "~/types/tasks.d.ts";
	const emit = defineEmits(["close", "taskAdded"]);

	const description = ref("");
	const dueDate = ref("");

	const saveTasks = async () => {
		if (!description.value || !dueDate.value) {
			alert("Пожалуйста, заполните все поля!");
		}

		try {
			const newTask = {
				description: description.value,
				dueDate: new Date(dueDate.value),
				status: 'Pending',
			};

			const task = await $fetch<Task[]>("/api/tasks", {
				method: "POST",
				body: newTask,
			});
			if (task) {
				emit("taskAdded", task);
				emit("close");
			}
		} catch (e) {
			console.log("Ошибка при добавлении задачи:", e);
		}
	};
</script>

<style lang="scss">
	.add-tasks-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;

		.add-tasks-modal {
			background-color: #fff;
			padding: 24px 32px 24px 32px;
			border-radius: 12px;
			width: 400px;

			.add-tasks-modal__header {
				display: flex;
				justify-content: space-between;
				margin-bottom: 24px;
				color: #092c4c;
				font-weight: 600;
			}

			.add-tasks-modal__content {
				.add-tasks-description {
					input {
						padding: 10px 20px;
						min-height: 110px;
						min-width: 336px;
						background-color: #f6fafd;
						outline: none;
						border: none;
						-webkit-box-shadow: 0px 0px 4px 1px rgba(34, 60, 80, 0.23);
						-moz-box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
						box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
						border-radius: 12px;
					}
				}

				.add-tasks-due-date {
					margin-top: 24px;
					h4 {
						color: #092c4c;
						margin-bottom: 12px;
					}

					input {
						padding: 10px 20px;
						min-height: 75px;
						min-width: 336px;
						background-color: #f6fafd;
						outline: none;
						border: none;
						-webkit-box-shadow: 0px 0px 4px 1px rgba(34, 60, 80, 0.23);
						-moz-box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
						box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
						border-radius: 12px;
					}
				}
			}
			.add-tasks-modal__buttons {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin-top: 16px;
				gap: 10px;

				button {
					padding: 10px 24px;
					border-radius: 8px;
					font-size: 14px;
					cursor: pointer;

					&.buttons__cancel {
						background-color: #ffffff;
						-webkit-box-shadow: 0px 0px 4px 1px rgba(34, 60, 80, 0.23);
						-moz-box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
						box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
						border: none;
						color: #092c4c;
						border-radius: 50px;

						&:hover {
							background-color: #f5f8fa;
						}
					}

					&.buttons__save {
						background-color: #514ef3;
						border: none;
						color: #ffffff;
						border-radius: 50px;

						&:hover {
							background-color: #4b49e5;
						}
					}
				}
			}
		}
	}
</style>
