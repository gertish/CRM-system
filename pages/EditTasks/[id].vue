<template>
    <div class="edit-tasks-overlay" @click="backRoute">
        <div class="edit-tasks-modal" @click.stop>
            <div class="edit-tasks-modal__header">
                <h4>Edit Task</h4>
                <img @click="backRoute" src="@/assets/icons/Close.svg" alt="" />
            </div>

            <div class="edit-tasks-modal__status">
                <div class="edit-tasks-modal__title">
                    <h4>Complete?</h4>
                </div>
                <div class="edit-tasks-modal__icon-status" @click="toggleStatus">
                    <img :src="statusIcon" alt="">
                </div>
            </div>

            <div class="edit-tasks-modal__content">
                <div class="edit-tasks-modal__description">
                    <input v-model="task.description" type="text" placeholder="Enter tasks description" />
                </div>
                <div class="edit-tasks-modal__due-date">
                    <h4>Due Date</h4>
                    <input v-model="formattedDueDate" type="text" placeholder="Due date" />
                </div>
            </div>
            <div>
                <div class="edit-tasks-modal__buttons">
                    <button class="edit-tasks-modal__delete" @click="deleteTasks">Delete</button>
                    <button class="edit-tasks-modal__done" @click="editTaks">Done</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Task } from '~/types/tasks';
import { useRoute } from 'vue-router';
import { $fetch } from 'ofetch';
import { navigateTo } from 'nuxt/app';
import Completed from '@/assets/icons/Icon-Check.svg'
import Pending from '@/assets/icons/Tasks-checked.svg'
import { formateDate } from '~/utils/formatDate';


const route = useRoute();
const id = route.params.id

const task = ref<Task>({
    id: '',
    dueDate: '',
    description: '',
    status: 'Completed'
});

const formattedDueDate = computed(() => {
    return task.value.dueDate ? formateDate(task.value.dueDate) : '';
})

const toggleStatus = () => {
    task.value.status = task.value.status === 'Completed' ? 'Pending' : 'Completed'
}

const statusIcon = computed(() => {
    return task.value.status === 'Completed' ? Completed : Pending
})


const backRoute = () => {
    return navigateTo(`/tasks/tasks`)
}

onMounted(async () => {
    try {
        const res = await $fetch(`/api/tasks/${id}`)
        task.value = res;
    } catch (e) {
        console.log('Ошибка при загрузке задач:', e)
    }
})


const editTaks = async () => {
    const updatedTask = {
        description: task.value.description,
        dueDate:new Date(formattedDueDate.value).toISOString(),
        status: task.value.status
    }

    try {
        const updated = await $fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            body: updatedTask
        })
        task.value = updated;
        backRoute();
    } catch (e) {
        console.log('Ошибка при сохранении задачи:', e)
    }
}

const deleteTasks = async () => {
    const conf = confirm("Вы действительно хотите удалить эту задачу?");
    if (!conf) return;

    try {
        await $fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        backRoute();
    } catch (e) {
        console.log('Ошиюка при удалении задачи:', e)
    }
}

</script>



<style lang="scss">
.edit-tasks-overlay {
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

    .edit-tasks-modal {
        background-color: #fff;
        padding: 24px 32px 24px 32px;
        border-radius: 12px;
        width: 400px;

        .edit-tasks-modal__header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            color: #092c4c;
            font-weight: 600;
        }

        .edit-tasks-modal__status {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;

            .edit-tasks-modal__title {
                h4 {
                    color: #092c4c;
                    font-weight: 600;
                }
            }
        }

        .edit-tasks-modal__content {
            .edit-tasks-modal__description {
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

            .edit-tasks-modal__due-date {
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

        .edit-tasks-modal__buttons {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 16px;
            gap: 10px;

            button {
                border-radius: 8px;
                font-size: 14px;
                cursor: pointer;

                &.edit-tasks-modal__delete {
                    background-color: #ffffff;
                    -webkit-box-shadow: 0px 0px 4px 1px rgba(34, 60, 80, 0.23);
                    -moz-box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
                    box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
                    border: none;
                    color: #fe8084;
                    border-radius: 50px;
                    padding: 15px 58px;

                    &:hover {
                        background-color: #f5f8fa;
                    }
                }

                &.edit-tasks-modal__done {
                    background-color: #514ef3;
                    border: none;
                    color: #ffffff;
                    border-radius: 50px;
                    padding: 15px 62px;

                    &:hover {
                        background-color: #4b49e5;
                    }
                }
            }
        }
    }
}
</style>
