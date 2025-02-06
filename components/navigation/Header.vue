<template>
	<header class="header">
		<nuxt-link to="/">
			<div class="header__logo">
				<img src="@/assets/icons/Logo.svg" alt="" />
			</div>
		</nuxt-link>

		<div>
			<SectionTitle :title="title" class="header__title" />
		</div>
		<div class="header__actions">
			<div class="header__add">
				<UIButton :btnText="btnText" @click="handleModalOrEntity" v-if="!iscustomerDetails" />
			</div>
			<div class="header__search">
				<img src="@/assets/icons/Search.svg" alt="" />
			</div>
			<div class="header__avatar">
				<img src="@/assets/icons/Avatar.svg" alt="Avatar" />
			</div>
		</div>
		<AddEntity v-if="isHomePage && currentModal === 'AddEntity'" @close="closeModal"
			@showAddNewCustomer="showAddNewCustomer" @showAddNewDeal="showAddNewDeal" />

		<AddNewCustomer v-if="currentModal === 'AddNewCustomer'" @close="closeModal" @customerAdded="addCustomer" />

		<AddNewDeal v-if="currentModal === 'AddNewDeal'" @close="closeModal" @dealAdded="addDeal" />

		<AddNewTask v-if="currentModal === 'AddNewTask'" @close="closeModal" @taskAdded="addTasks" />
	</header>
</template>

<script lang="ts" setup>
import { computed, ref, watch, inject } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
import type { Customer } from "~/types/customer.d.ts";
import type { Deal } from "~/types/deal.d.ts";
import type { Task } from "~/types/tasks.d.ts";
const route = useRoute();


const customers = inject<Ref<Customer[]> | undefined>("customers");
const deals = inject<Ref<Deal[]> | undefined>("deals");
const tasks = inject<Ref<Task[]> | undefined>("tasks");

const isDealsPage = computed(() => route.path === "/deals/deals");
const isCustomerPage = computed(() => route.path === "/customers/customers");
const isTaskPage = computed(() => route.path === "/tasks/tasks");
const iscustomerDetails = computed(() => route.path === "/customerDetails/customerDetails");
const isHomePage = computed(() => route.path === "/");

const currentModal = ref<
	null | "AddEntity" | "AddNewCustomer" | "AddNewDeal" | "AddNewTask"
>(null);

const showAddEntity = () => {
currentModal.value = "AddEntity";
};

const showAddNewCustomer = () => {
	currentModal.value = "AddNewCustomer";
};

const showAddNewDeal = () => {
	currentModal.value = "AddNewDeal";
};

const showAddNewTaks = () => {
	currentModal.value = "AddNewTask";
};

const closeModal = () => {
	currentModal.value = null;
};

const addCustomer = (newCustomer: Customer) => {
	customers?.value.push(newCustomer);
};

const addDeal = (newDeal: Deal) => {
	deals?.value.push(newDeal);
};

const addTasks = (newTask: Task) => {
	tasks?.value.push(newTask);
};

const handleModalOrEntity = () => {
	if (isDealsPage.value) {
		showAddNewDeal();
	} else if (isCustomerPage.value) {
		showAddNewCustomer();
	} else if (isTaskPage.value) {
		showAddNewTaks();
	} else if (isHomePage.value) {
		showAddEntity();
	}
};

watch(
	() => route.path,
	() => {
		if (isHomePage.value) {
			currentModal.value = null;
		}
	}
);

const title = computed(() => {
	switch (route.name) {
		case "deals-deals":
			return "Deals";
		case "customers-customers":
			return "Customers";
		case "tasks-tasks":
			return "Tasks";
		case "customerDetails-id":
		return "Customer Details"
		default:
			return "Dashboard";
	}
});

const btnText = computed(() => {
	switch (route.name) {
		case "deals-deals":
			return "Add New Deal";
		case "customers-customers":
			return "Add New Customers";
		case "tasks-tasks":
			return "Add New Tasks";
		default:
			return "Add New";
	}
});
</script>

<style lang="scss">
.header {
	display: flex;
	align-items: center;
	padding: 0px 24px 0px 22px;
	border-bottom: 1px #e6e9f0 solid;

	.header__title {
		margin-left: 24px;
	}

	.header__logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 69.5px;
		height: 70px;
		border-right: 1px solid #e6e9f0;
		padding-right: 20px;
		cursor: pointer;
	}

	.header__actions {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-left: auto;
	}

	.header__search {
		background-color: #fff;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px #e6e9f0 solid;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header__avatar {
		img {
			border-radius: 100%;
		}
	}
}
</style>
