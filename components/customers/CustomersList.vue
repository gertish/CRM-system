<template>
	<div class="customers">
		<div class="customers__title">
			<div>
				<h2>Customers</h2>
			</div>
			<div>
				<p>View All</p>
			</div>
		</div>
		<div v-for="customer in customers" :key="customer.id" class="customers__item">
			<img class="customers__avatar" :src="customer.avatar || DefaultImg" alt="" />
			<div class="customers__contact">
				<p>{{ customer.firstName }} {{ customer.lastName }}</p>
				<span>{{ customer.email }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Customer } from '~/types/customer';
import { $fetch } from 'ofetch';
import DefaultImg from '@/assets/icons/DefaultImg.svg';

const customers = ref<Customer[]>([]);

const fetchCustomers = async () => {
	try {
		const res = await $fetch<Customer[]>('/api/customers');
		customers.value = res || [];
	} catch (e) {
		console.log("Ошибка при загрузке клиентов:", e);
	}
};

onMounted(() => {
	fetchCustomers();
});
</script>

<style lang="scss" setup>
	.customers {
		min-width: 340px;
		height: 360px;
		margin-top: 17px;
		margin-left: 15px;
		overflow-y: auto;

		.customers__title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24px;

			h2 {
				color: #092c4c;
			}

			p {
				color: #514ef3;
			}
		}

		.customers__item {
			display: flex;
			align-items: center;
			margin-top: 12px;

			.customers__contact {
				margin-left: 16px;
				line-height: 30px;

				span {
					font-weight: 300;
					color: #7e92a2;
				}

				p {
					font-size: 15px;
					font-weight: 600;
					color: #092c4c;
				}
			}

			.customers__addition {
				margin-left: auto;
			}
			.customers__avatar{
				height: 44px;
				width: 44px;
				border-radius: 50%;
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
