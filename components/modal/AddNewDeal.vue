<template>
	<div v-if="showSelectCustomers">
		<SelectCustomers @close="closeSelectCustomers" @customerSelected="handleCustomerSelected" />
	</div>
	<div v-else>
		<div class="add-deal-overlay" @click="$emit('close')">
			<div class="add-deal-modal" @click.stop>
				<div class="add-deal-modal__header">
					<h4>Add New Deal</h4>
					<img src="@/assets/icons/Close.svg" alt="" @click="$emit('close')" />
				</div>

				<div class="add-deal-modal__customer">
					<img src="@/assets/icons/DefaultImg.svg" alt="" />
					<div class="add-deal-modal__customer-info">
						<p>Customer</p>
					</div>
					<button class="add-deal-modal__change-customer-button" @click="openSelectCustomers">
						Change Customer
					</button>
				</div>

				<div class="add-deal-modal__content">
					<div class="add-deal-modal__room-img">
						<h4>Room images</h4>
						<div class="add-deal-modal__room-img-upload">
							<label class="upload-file">
							ADD
							<input type="file" accept="image/*" @change="onImageChange" />
						</label>
						</div>
					<div class="add-deal-modal__room-img-preview">
						<!-- <img :src="deal.avatar || DefaultImg" alt=""> -->
					</div>
					</div>

					<div class="add-deal-modal__address-section">
						<div class="address-section__field">
							<h4>Address</h4>
							<input type="text" placeholder="Street Address" v-model="deal.streetAddress" />
						</div>
						<div class="address-section__field">
							<input type="text" placeholder="City" v-model="deal.city" />
						</div>
						<div class="address-section__field">
							<input type="text" placeholder="State / Province" v-model="deal.state" />
						</div>
						<div class="address-section__field">
							<input type="text" placeholder="Zip Code" v-model="deal.zipCode" />
						</div>
					</div>

					<div class="add-deal-modal__details-section">
						<div class="details__row">
							<div class="details__field">
								<h4>Room Area (m2)</h4>
								<input type="text" v-model="deal.roomArea" />
							</div>

							<div class="details__field">
								<h4># of People</h4>
								<input type="text" v-model="deal.numberOfPeople" />
							</div>
						</div>

						<div class="details__row">
							<div class="details__field">
								<h4>Appointment Date</h4>
								<input type="date" v-model="deal.appointmentDate" />
							</div>

							<div class="details__field">
								<h4>Special Instructions</h4>
								<input type="text" v-model="deal.specialInstructions" />
							</div>
						</div>

						<div class="details__row">
							<div class="details__field">
								<h4>Room Access</h4>
								<select class="room-access__select" v-model="deal.roomAccess">
									<option class="room-access__option">Keys with doorman</option>
									<option class="room-access__option">Direct access</option>
								</select>
							</div>
							<div class="details__field">
								<h4>Price ($)</h4>
								<input type="text" v-model="deal.price" />
							</div>
						</div>
					</div>

					<div class="add-deal-modal__footer">
						<div class="add-deal-modal__status">
							<label for="status">Progress</label>
							<select id="status" v-model="deal.status">
								<option>In Progress</option>
								<option>Completed</option>
							</select>
						</div>

						<div class="add-deal-modal__buttons">
							<button class="buttons__cancel" @click="$emit('close')">
								Cancel
							</button>
							<button class="buttons__save" @click="saveDeal">Save Deal</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import type { Ref } from "vue";
import { $fetch } from "ofetch";
import { StatusDeal } from "~/types/statusDeal.d.ts";
import type { Deal } from "~/types/deal.d.ts";
import type { Customer } from "~/types/customer";


const emit = defineEmits(["showSelectCustomers", "close", "dealAdded"]);
const customers = inject<Ref<Customer[]> | undefined>("customers");

const deal = ref<Deal>({
	id: null,
	customerId: null,
	streetAddress: "",
	city: "",
	state: "",
	zipCode: "",
	roomArea: 0,
	numberOfPeople: 0,
	avatar: null as File | null,
	appointmentDate: "",
	specialInstructions: "",
	roomAccess: "",
	price: 0,
	status: StatusDeal.InProgress,
});




const showSelectCustomers = ref(false);

const openSelectCustomers = () => {
	showSelectCustomers.value = true;
};

const closeSelectCustomers = () => {
	showSelectCustomers.value = false;
};

const handleCustomerSelected = (customerId: string) => {
	deal.value.customerId = customerId;
	closeSelectCustomers();
};

const onImageChange = (event: Event) => {
	const file = (event.target as HTMLInputElement).files?.[0];
	if (file) {
		deal.value.avatar = file;
	}
};

const saveDeal = async () => {
	if (customers?.value.length === 0) {
		alert(
			"Для того чтобы создать сделку нужно сначала создать хотя бы одного клиента!"
		);
	}

	if (
		!deal.value.numberOfPeople ||
		!deal.value.appointmentDate ||
		!deal.value.specialInstructions ||
		!deal.value.price
	) {
		alert(
			"Заполните эти поля: # of People, Appointment Date, Special Instructions, price, avatar"
		);
	}
	const formData = new FormData();

	for (const [key, value] of Object.entries(deal.value)) {
		if (value !== null && value !== undefined) {
			formData.append(key, value instanceof File ? value : String(value));
		}
	}

	try {
		const res = await $fetch("/api/deals", {
			method: "POST",
			body: formData,
		});
		console.log(res);

		if (res) {
			emit("dealAdded", res);
			emit("close");
		}
	} catch (e) {
		console.error("Ошибка при загрузке сделок:", e);
		alert("An error occurred while saving the deal/customer.");
	}
};
</script>

<style lang="scss">
.add-deal-overlay {
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

	.add-deal-modal {
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		overflow: hidden;

		.add-deal-modal__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16px 24px;
			background-color: #f5f8fa;

			h4 {
				font-size: 18px;
				font-weight: 600;
				color: #092c4c;
			}

			img {
				cursor: pointer;
			}
		}

		.add-deal-modal__customer {
			background-color: #eef6fb;
			display: flex;
			align-items: center;
			padding: 16px 24px;
			box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);

			img {
				width: 48px;
				height: 48px;
				border-radius: 50%;
			}

			.add-deal-modal__customer-info {
				margin-left: 16px;
				line-height: 23px;

				p:first-child {
					font-size: 12px;
					color: #7e92a2;
				}

				p:last-child {
					font-size: 14px;
					font-weight: 600;
					color: #092c4c;
				}
			}

			.add-deal-modal__change-customer-button {
				margin-left: auto;
				padding: 15px 29px;
				background-color: #fff;
				box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
				border-radius: 50px;
				border: none;
				color: #092c4c;
				cursor: pointer;
				transition: all 0.3s ease-in-out;

				&:hover {
					background-color: #f6f8fa;
				}
			}
		}


		.add-deal-modal__content {
			padding: 24px;

			h4 {
				font-size: 14px;
				font-weight: 600;
				margin-bottom: 8px;
				color: #092c4c;
			}

			input,
			select {
				width: 100%;
				padding: 10px 12px;
				background-color: #f9fafc;
				border: 1px solid #e3e9ef;
				border-radius: 8px;
				font-size: 14px;
				outline: none;
				color: #092c4c;

				&::placeholder {
					color: #7e92a2;
				}
			}

			.add-deal-modal__room-img {
				margin-bottom: 20px;

				.upload-file {
					padding: 10px 20px;
					background-color: #f6fafd;
					color: #7e92a2;
					border-radius: 8px;
					font-size: 14px;
					transition: all 0.3s ease;
					box-shadow: 0 0 0 0.7px #eaeef4;
					border: none;
					cursor: pointer;

					&:hover {
						background-color: #d0e6f5;
					}
				}

				h4 {
					margin-bottom: 24px;
					color: #092c4c;
					font-weight: 600;
				}

				input {
					display: none;
				}
			}

			.add-deal-modal__address-section {
				margin-top: 20px;
				margin-bottom: 20px;
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				gap: 15px;

				.address-section__field {
					display: flex;
					flex-direction: column;

					h4 {
						margin-bottom: 12px;
						color: #092c4c;
					}

					input {
						box-shadow: 0 0 0 0.7px #eaeef4;
						border: none;
						background-color: #f6fafd;
						border-radius: 8px;
						outline: none;
						padding: 10px;
					}

					&:first-child {
						grid-column: span 3;
					}
				}
			}

			.add-deal-modal__details-section {
				.details__row {
					display: flex;
					gap: 20px;
					margin-bottom: 16px;

					&:nth-child(2),
					&:nth-child(3) {
						flex-direction: column;
					}

					.details__field {
						flex: 1;
						position: relative;

						h4 {
							margin-bottom: 8px;
							font-size: 14px;
							color: #092c4c;
						}

						input {
							box-shadow: 0 0 0 0.7px #eaeef4;
							border: none;
							background-color: #f6fafd;
						}

						select {
							appearance: none;
							-webkit-appearance: none;
							-moz-appearance: none;
							padding: 10px 60px 10px 28px;
							box-shadow: 0 0 0 0.7px #eaeef4;
							background-color: #f6fafd;
							color: #7e92a2;
							border: none;
							font-size: 15px;
							font-weight: 500;
							outline: none;
							background-image: url("@/assets/icons/Arrow-down.svg");
							background-repeat: no-repeat;
							background-position: right 20px center;
							background-size: 10px;
							cursor: pointer;

							option {
								color: #092c4c;
							}
						}

						input[type="date"] {
							appearance: none;
							-webkit-appearance: none;
							-moz-appearance: none;
							color: #7e92a2;

							&::-webkit-calendar-picker-indicator {
								background-image: url(@/assets/icons/Calendar.svg);
								background-repeat: no-repeat;
							}

							&::placeholder {
								color: #7e92a2;
							}
						}
					}
				}

				.details__row:first-child,
				.details__row:last-child {
					flex-direction: row;
				}
			}

			.add-deal-modal__footer {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.add-deal-modal__status {
					display: flex;
					align-items: center;
					gap: 10px;
					position: relative;

					select {
						appearance: none;
						-webkit-appearance: none;
						-moz-appearance: none;
						padding: 10px 60px 10px 28px;
						box-shadow: 0 0 0 0.7px #eaeef4;
						background-color: #f6fafd;
						border: none;
						font-size: 15px;
						color: #7e92a2;
						font-weight: 500;
						outline: none;
						background-image: url("@/assets/icons/Arrow-down.svg");
						background-repeat: no-repeat;
						background-position: right 20px center;
						background-size: 10px;
						cursor: pointer;

						option {
							color: #092c4c;
							font-size: 15px;
						}
					}

					label {
						color: #092c4c;
						font-weight: 600;
					}
				}

				.add-deal-modal__buttons {
					display: flex;
					gap: 10px;

					button {
						padding: 10px 24px;
						border-radius: 8px;
						font-size: 14px;
						cursor: pointer;

						&.buttons__cancel {
							background-color: #ffffff;
							border: none;
							color: #092c4c;
							border-radius: 50px;
							-webkit-box-shadow: 0px 0px 4px 1px rgba(34, 60, 80, 0.23);
							-moz-box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);
							box-shadow: 0px 0px 4px -1px rgba(34, 60, 80, 0.23);

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
	}
}
</style>
