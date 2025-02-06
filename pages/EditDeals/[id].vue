<template>
	<div class="edit-deal-overlay" @click="backRoute">
		<div class="edit-deal-modal" @click.stop >
			<div class="edit-deal-modal__header">
				<h4>Edit Deal</h4>
				<img src="@/assets/icons/Close.svg" alt="" @click="backRoute" />
			</div>

			<div class="edit-deal-modal__content">
				<div class="edit-deal-modal__room-img">
					<h4>Room images</h4>
					<label class="edit-deal-modal__upload-file">
						ADD
						<input type="file" accept="image/*" @change="onAvatarEditing" />
					</label>
				</div>

				<div class="edit-deal-modal__address-section">
					<div class="edit-deal-modal__address-field">
						<h4>Address</h4>
						<input type="text" placeholder="Street Address" v-model="deal.streetAddress" />
					</div>
					<div class="edit-deal-modal__address-field">
						<input type="text" placeholder="City" v-model="deal.city" />
					</div>
					<div class="edit-deal-modal__address-field">
						<input type="text" placeholder="State / Province" v-model="deal.state" />
					</div>
					<div class="edit-deal-modal__address-field">
						<input type="text" placeholder="Zip Code" v-model="deal.zipCode" />
					</div>
				</div>

				<div class="edit-deal-modal__details-section">
					<div class="edit-deal-modal__details-row">
						<div class="edit-deal-modal__details-field">
							<h4>Room Area (m2)</h4>
							<input type="text" v-model="deal.roomArea" />
						</div>

						<div class="edit-deal-modal__details-field">
							<h4># of People</h4>
							<input type="text" v-model="deal.numberOfPeople" />
						</div>
					</div>

					<div class="edit-deal-modal__details-row">
						<div class="edit-deal-modal__details-field">
							<h4>Appointment Date</h4>
							<input type="date" v-model="deal.appointmentDate" />
						</div>

						<div class="edit-deal-modal__details-field">
							<h4>Special Instructions</h4>
							<input type="text" v-model="deal.specialInstructions" />
						</div>
					</div>

					<div class="edit-deal-modal__details-row">
						<div class="edit-deal-modal__details-field">
							<h4>Room Access</h4>
							<select class="edit-deal-modal__select" v-model="deal.roomAccess">
								<option>Keys with doorman</option>
								<option>Direct access</option>
							</select>
						</div>
						<div class="edit-deal-modal__details-field">
							<h4>Price ($)</h4>
							<input type="text" v-model="deal.price" />
						</div>
					</div>
				</div>

				<div class="edit-deal-modal__footer">
					<div class="edit-deal-modal__status">
						<label for="status">Progress</label>
						<select id="status" v-model="deal.status">
							<option>In Progress</option>
							<option>Completed</option>
						</select>
					</div>
					<div class="edit-deal-modal__delete" @click="deleteDeals">
						<img src="@/assets/icons/trash.svg" alt="" />
					</div>
					<div class="edit-deal-modal__buttons">
						<button class="edit-deal-modal__cancel" @click="backRoute"> Cancel </button>
						<button class="edit-deal-modal__done" @click="saveDeal">Done</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { navigateTo } from '#app';
import { ref, onMounted } from 'vue';
import { $fetch } from 'ofetch';
import { useRoute } from 'vue-router';
import type { Deal } from '~/types/deal.d.ts';
import { StatusDeal } from '~/types/statusDeal.d.ts';

const backRoute = () => {
	return navigateTo('/deals/deals')
}

const route = useRoute();
const id = route.params.id

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
})

onMounted(async () => {
	try {
		const fetchDeal = await $fetch<Deal>(`/api/deals/${id}`)
		deal.value = fetchDeal
	} catch (e) {
		console.log('Ошибка при получении сделки:', e)
	}
})

const formData = new FormData();

const saveDeal = async () => {
    if (!deal.value) return;

    formData.delete('avatar'); 


    for (const [key, value] of Object.entries(deal.value)) {
        if (value !== undefined && value !== null) {
            if (key === 'avatar' && value instanceof File) {
                formData.append(key, value); 
            } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                formData.append(key, String(value)); 
            }
        }
    }

    try {
        const updated = await $fetch<Deal>(`/api/deals/${id}`, {
            method: 'PATCH',
            body: formData,
        });
        deal.value = updated;
        backRoute();
    } catch (e) {
        console.error('Ошибка при сохранении сделки:', e);
    }
};

const onAvatarEditing = (e: Event) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    if (file) {
        deal.value.avatar = file; 
    }
};

const deleteDeals = async () => {
	const conf = confirm("Вы действительно хотите удалить эту сделку?");
	if (!conf) return;

	try {
		await $fetch(`/api/deals/${id}`, {
			method: 'DELETE'
		});
		backRoute();
	} catch (e) {
		console.log('Ошиюка при удалении сделки:', e)
	}
}
</script>

<style lang="scss">
.edit-deal-overlay {
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

	.edit-deal-modal {
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		overflow: hidden;

		.edit-deal-modal__header {
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

		.edit-deal-modal__content {
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

			.edit-deal-modal__room-img {
				margin-bottom: 20px;

				.edit-deal-modal__upload-file {
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

			.edit-deal-modal__address-section {
				margin-top: 20px;
				margin-bottom: 20px;
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				gap: 15px;

				.edit-deal-modal__address-field {
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

			.edit-deal-modal__details-section {
				.edit-deal-modal__details-row {
					display: flex;
					gap: 20px;
					margin-bottom: 16px;

					&:nth-child(2),
					&:nth-child(3) {
						flex-direction: column;
					}

					.edit-deal-modal__details-field {
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

				.edit-deal-modal__details-row:first-child,
				.edit-deal-modal__details-row:last-child {
					flex-direction: row;
				}
			}

			.edit-deal-modal__footer {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.edit-deal-modal__status {
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

				.edit-deal-modal__buttons {
					display: flex;
					gap: 10px;

					button {
						padding: 10px 24px;
						border-radius: 8px;
						font-size: 14px;
						cursor: pointer;

						&.edit-deal-modal__cancel {
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

						&.edit-deal-modal__done {
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
