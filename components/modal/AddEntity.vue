<template>
	<div class="add-entity-overlay" @click="$emit('close')">
		<div class="add-entity-modal" @click.stop>
			<div class="add-entity-modal__header">
				<p>Add New</p>
				<img
					@click="$emit('close')"
					style="cursor: pointer"
					src="@/assets/icons/Close.svg"
					alt=""
				/>
			</div>
			<div class="add-entity-modal__items" @click="$emit('showAddNewDeal')">
				<div class="add-entity-modal__item">
					<Icon
						name="hugeicons:briefcase-03"
						style="color: #7e91a1; width: 20px; height: 20px"
					/>
					<p>Deal</p>
				</div>
				<img src="@/assets/icons/Arrow-right.svg" alt="" />
			</div>
			<div class="add-entity-modal__items" @click="$emit('showAddNewCustomer')">
				<div class="add-entity-modal__item">
					<Icon
						name="solar:users-group-rounded-linear"
						style="color: #7e91a1; width: 20px; height: 20px"
					/>
					<p>Customer</p>
				</div>
				<img src="@/assets/icons/Arrow-right.svg" alt="" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const emit = defineEmits(["close", "showAddNewCustomer", "showAddNewDeal"]);
</script>

<style lang="scss">
	.add-entity-overlay {
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

		.add-entity-modal {
			background-color: #fff;
			width: 240px;
			border-radius: 12px;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
			display: flex;
			flex-direction: column;
			overflow: hidden;

			&__header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px 15px;

				p {
					font-size: 15px;
					font-weight: 400;
					color: #7e92a2;
				}
			}

			&__items {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				border-top: 1px solid #e6e9f0;
				transition: 0.2s ease;
				padding: 15px;
				cursor: pointer;

				&:hover {
					background-color: #eef6fb;
				}

				img {
					transition: all 0.3s ease-in-out;

					&:hover {
						transform: scale(1.2);
					}
				}
			}

			&__item {
				display: flex;
				align-items: center;
				gap: 12px;

				p {
					color: #092c4c;
					font-weight: 400;
				}
			}
		}
	}
</style>
