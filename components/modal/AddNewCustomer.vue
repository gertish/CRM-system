<template>
	<div class="add-customer-overlay" @click="$emit('close')">
		<div class="add-customer-modal" @click.stop>
			<div class="add-customer-modal__header">
				<h4>Add New Customer</h4>
				<img src="@/assets/icons/Close.svg" alt="" @click="$emit('close')" />
			</div>

			<div class="add-customer-modal__content">
				<div class="add-customer-modal__upload-avatar">
					<h4>Avatar</h4>
					<div class="add-customer-modal__avatar-upload-flex">
						<label class="add-customer-modal__upload-file">
						ADD
						<input type="file" accept="image/*" @change="onAvatarChange" />
					</label>
					<div class="add-customer-modal__avatar-preview">
						<img :src="avatarPreview || DefaultImg" alt="" />
					</div>
					</div>
				</div>

				<div class="add-customer-modal__contact-fields">
					<div class="data-filed">
						<h4>First Name</h4>
						<input type="text" v-model="customer.firstName" />
					</div>

					<div class="data-filed">
						<h4>Last Name</h4>
						<input type="text" v-model="customer.lastName" />
					</div>

					<div class="data-filed">
						<h4>Email</h4>
						<input type="text" v-model="customer.email" />
					</div>

					<div class="data-filed">
						<h4>Phone</h4>
						<input type="text" v-model="customer.phone" />
					</div>
				</div>

				<div class="add-customer-model__address-section">
					<div class="address__field">
						<h4>Address</h4>
						<input
							type="text"
							placeholder="Street Address"
							v-model="customer.streetAddress"
						/>
					</div>
					<div class="address__field">
						<input type="text" placeholder="City" v-model="customer.city" />
					</div>
					<div class="address__field">
						<input
							type="text"
							placeholder="State / Province"
							v-model="customer.state"
						/>
					</div>
					<div class="address__field">
						<input type="text" placeholder="Zip Code" v-model="customer.zipCode" />
					</div>
				</div>

				<div class="add-customer-modal__buttons">
					<button class="buttons__cancel" @click="$emit('close')"> Cancel </button>
					<button class="buttons__save" @click="saveCustomer">
						Save Customer
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import { $fetch } from "ofetch";
	import DefaultImg from "@/assets/icons/DefaultImg.svg";

	const emit = defineEmits(["close", "customerAdded"]);


	const customer = ref({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		avatar: null as File | null,
		streetAddress: "",
		city: "",
		state: "",
		zipCode: "",
	});

	const avatarPreview = ref<string | null>(null);

	const onAvatarChange = (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			customer.value.avatar = file;
			avatarPreview.value = URL.createObjectURL(file);
		}
	};

	const saveCustomer = async () => {
	if (
		!customer.value.firstName ||
		!customer.value.lastName ||
		!customer.value.email ||
		!customer.value.phone
	) {
		alert(
			"Заполните эти поля: First Name, Last Name, Email, Phone"
		);
	}

		const formData = new FormData();

		for (const [key, value] of Object.entries(customer.value)) {
			if (value !== null && value !== undefined && value !== "") {
				formData.append(key, value instanceof File ? value : String(value));
			}
		}

		try {
			const res = await $fetch("/api/customers", {
				method: "POST",
				body: formData,
			});

			if (res) {
				emit("customerAdded", res);
				emit("close");
			}
		} catch (e) {
			console.error("Ошибка при загрузке заказчика:", e);
			alert("An error occurred while saving the deal/customer.");
		}
	};
</script>

<style lang="scss">
	.add-customer-overlay {
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

		.add-customer-modal {
			background-color: #fff;
			padding: 24px 32px 24px 32px;
			border-radius: 12px;

			.add-customer-modal__header {
				display: flex;
				justify-content: space-between;
				margin-bottom: 24px;
				color: #092c4c;
				font-weight: 600;
			}
			.add-customer-modal__content {
				.add-customer-modal__upload-avatar {
					h4 {
						margin-bottom: 24px;
						color: #092c4c;
						font-weight: 600;
					}
					.add-customer-modal__avatar-upload-flex{
						display: flex;
						align-items: center;
						gap: 10px;
						.add-customer-modal__upload-file {
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
			

					input {
						display: none;
					}
					.add-customer-modal__avatar-preview{
						img{
							width: 50px;
							height: 50px;
							border-radius: 50%;
						}
					}
					}

				}

				.add-customer-modal__contact-fields {
					margin-top: 30px;
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 15px;

					.data-filed {
						h4 {
							margin-bottom: 12px;
							color: #092c4c;
						}

						input {
							box-shadow: 0 0 0 0.7px #eaeef4;
							border: none;
							background-color: #f6fafd;
							padding: 10px 25px;
							border-radius: 8px;
							outline: none;
							width: 100%;
						}
					}
				}

				.add-customer-model__address-section {
					margin-top: 20px;
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
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

				.add-customer-modal__buttons {
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
	}
</style>
