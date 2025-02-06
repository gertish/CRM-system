<template>
	<div class="customer-details">
		<div v-if="customer">
			<div class="customer-details__avatar">
				<div class="customer-details__avatar-image">
					<img src="@/assets/icons/Cover.svg" alt="" />
				</div>
				<div class="customer-details__avatar-edit">
					<div class="customer-details__avatar">
						<img :src="customer.avatar || DefaultImg" alt="" />
					</div>
					<div class="customer-details__edit" @click="onAvatarSelected">
						<input type="file" id="avatarInput" accept="image/*" />

						<label for="avatarInput">
							<img src="@/assets/icons/Edit.svg" alt="">
						</label>

					</div>
				</div>
				<div class="customer-details__avatar-delete" @click="deleteCustomer">
					<img src="@/assets/icons/trash.svg" alt="" />
				</div>
			</div>

			<div class="customer-details__contact">
				<div class="customer-details__contact-fields">
					<div class="customer-details__data-filed">
						<h4>First Name</h4>
						<input type="text" v-model="customer.firstName" />
					</div>

					<div class="customer-details__data-filed">
						<h4>Last Name</h4>
						<input type="text" v-model="customer.lastName" />
					</div>

					<div class="customer-details__data-filed">
						<h4>Email</h4>
						<input type="text" v-model="customer.email" />
					</div>

					<div class="customer-details__data-filed">
						<h4>Phone</h4>
						<input type="text" v-model="customer.phone" />
					</div>
				</div>

				<div class="customer-details__address-section">
					<h4>Address</h4>
					<div class="customer-details__address-group">
						<div class="address__field">
							<input type="text" placeholder="Street Address" v-model="customer.streetAddress" />
						</div>
						<div class="address__field">
							<input type="text" placeholder="City" v-model="customer.city" />
						</div>
						<div class="address__field">
							<input type="text" placeholder="State / Province" v-model="customer.state" />
						</div>
						<div class="address__field">
							<input type="text" placeholder="Zip Code" v-model="customer.zipCode" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="recent-deals">
			<div class="recent-deals__header">
				<h3>Recent Deals</h3>
				<button>
					<Icon class="plus" name="material-symbols:add-rounded" />
				</button>
			</div>
			<div class="recent-deals__content"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { $fetch } from "ofetch";
import type { Customer } from "~/types/customer.d.ts";
import DefaultImg from "@/assets/icons/DefaultImg.svg";

const route = useRoute();
const customerId = route.params.id;
const customer = ref<Customer | null>(null);

onMounted(async () => {
	try {
		const signleCustomers = await $fetch(`/api/customers/${customerId}`);
		customer.value = signleCustomers;
	} catch (e) {
		console.log("Ошибка при загрузке клиента:", e);
	}
});

const onAvatarSelected = async (e: Event) => {
	const file = (e.target as HTMLInputElement).files?.[0];
	if (!file) return;

	const formData = new FormData();
	formData.append("avatar", file);

	try {
		const updated = await $fetch<Customer>(`/api/customers/${customerId}`, {
			method: "PATCH",
			body: formData,
		});
		customer.value = updated;
	} catch (e) {
		console.log("Ошибка при обновлении аватара:", e);
	}
};

const deleteCustomer = async () => {
	const conf = confirm("Вы действительно хотите удалить этого клиента");
	if (!conf) return;

	try {
		await $fetch(`/api/customers/${customerId}`, {
			method: "DELETE",
		});
		navigateTo(`/customers/customers`);
	} catch (e) {
		console.log("Ошибка при удалении заказчика:", e);
	}
};
</script>

<style lang="scss">
.customer-details {
	display: grid;
	grid-template-columns: 1fr 370px;

	.customer-details__avatar {
		position: relative;

		.customer-details__avatar-image {
			img {
				width: 930px;
				height: auto;
				border-radius: 12px;
			}
		}

		.customer-details__avatar-edit {
			position: absolute;
			top: 46%;
			left: 2%;

			.customer-details__avatar {
				img {
					width: 100px;
					height: 100px;
					border-radius: 50%;
				}
			}

			.customer-details__edit {
			
				label{
				position: absolute;
				background-color: #514ef3;
				bottom: -4px;
				right: 2px;
				border-radius: 50%;
				background-repeat: no-repeat;
				background-position: center;
				width: 32px;
				height: 32px;
				padding: 8px;
				cursor: pointer;
				}

				input {
					display: none;
				}

			}
		}

		.customer-details__avatar-delete {
			position: absolute;
			bottom: 30px;
			left: 835px;
			background-color: #fff;
			border-radius: 50%;
			padding: 16px;
			cursor: pointer;
		}
	}

	.customer-details__contact {
		width: 930px;

		.customer-details__contact-fields {
			margin-top: 30px;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 15px;

			.customer-details__data-filed {
				h4 {
					margin-bottom: 12px;
					color: #092c4c;
				}

				input {
					box-shadow: 0 0 0 0.7px #eaeef4;
					border: none;
					background-color: #eef6fb;
					padding: 10px 25px;
					border-radius: 8px;
					outline: none;
					width: 100%;
				}
			}
		}

		.customer-details__address-section {
			margin-top: 20px;

			.customer-details__address-group {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 15px;

				.address__field {
					display: flex;
					flex-direction: column;

					h4 {
						margin-bottom: 12px;
						color: #092c4c;
					}

					input {
						box-shadow: 0 0 0 0.7px #eaeef4;
						border: none;
						background-color: #eef6fb;
						border-radius: 8px;
						outline: none;
						padding: 10px;
					}

					&:first-child {
						grid-column: span 3;
					}
				}
			}
		}
	}

	.recent-deals {
		.recent-deals__header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			h3 {
				color: #092c4c;
			}

			button {
				background-color: #514ef3;
				padding: 13px 14px;
				border-radius: 50%;
				border: none;
				transition: all 0.3s ease-in-out;

				&:hover {
					background-color: #4946ee;
				}

				.plus {
					color: #fff;
					width: 16px;
					height: 16px;
				}
			}
		}
	}
}
</style>
