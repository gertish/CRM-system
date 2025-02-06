<template>
	<div class="select-customers-overlay" @click="$emit('close')">
		<div class="select-customers__modal" @click.stop>
			<div class="select-customers-modal__header">
				<h4>Select Customer</h4>
				<div>
					<p>Add New</p>
					<img
						style="cursor: pointer"
						src="@/assets/icons/Close.svg"
						alt=""
						@click="$emit('close')"
					/>
				</div>
			</div>

			<div class="select-customers__content">
				<div
					v-for="(customer, index) in customers"
					:key="index"
					class="select-customers__item"
					@click="selectCustomer(customer.id)"
				>
					<div class="select-customers__info">
						<img :src="customer.avatar" alt="" />
						<div class="select-customers__contact">
							<p>{{ customer.firstName }} {{ customer.lastName }}</p>
							<p>{{ customer.email }}</p>
						</div>
					</div>
					<img
						class="arrow-right__item"
						src="@/assets/icons/Arrow-right.svg"
						alt=""
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from "vue";
	import { $fetch } from "ofetch";
	import type { Customer } from "~/types/customer.d.ts";
	const emit = defineEmits(["close", "customerSelected"]);

	const customers = ref<Customer[]>([]);

	const fetchCustomers = async () => {
		try {
			const res = await $fetch<Customer[]>("/api/customers");
			customers.value = res ?? [];
		} catch (e) {
			console.error("Ошибка при загрузке заказчика:", e);
		}
	};

	const selectCustomer = (id: string) => {
		emit("customerSelected", id);
	};

	onMounted(fetchCustomers);
</script>

<style lang="scss">
	.select-customers-overlay {
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

		.select-customers__modal {
			background-color: #fff;
			border-radius: 12px;
			box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
			padding: 24px 29px 9px 24px;
			min-width: 400px;
			min-height: 582px;

			.select-customers-modal__header {
				display: flex;
				justify-content: space-between;
				margin-bottom: 24px;

				h4 {
					color: #092c4c;
				}

				& > div {
					display: flex;
					gap: 15px;

					p {
						color: #514ef3;
						cursor: pointer;
					}
				}
			}

			.select-customers__content {
				.select-customers__item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 13px;
					cursor: pointer;

					

					.select-customers__info {
						display: flex;
						align-items: center;
						gap: 15px;
						line-height: 25px;

						img {
							width: 44px;
							height: 44px;
							border-radius: 50%;
						}

						.select-customers__contact {
							line-height: 30px;

							p:nth-of-type(1) {
								color: #092c4c;
								font-weight: 600;
							}

							p:nth-of-type(2) {
								color: #7e92a2;
								font-weight: 300;
							}
						}

					}

					.arrow-right__item {
						transition: all 0.3s ease-in-out;
					
						&:hover {
							transform: scale(1.2);
						}
					}
				}
			}
		}
	}
</style>
