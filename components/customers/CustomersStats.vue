<template>
	<div class="customer-stats">
		<div class="customer-stats__item">
			<div class="customer-stats__info">
				<h3>Customers</h3>
				<p>{{ customerLength }}</p>
			</div>
			<div class="customer-stats__icon">
				<img src="@/assets/icons/CustomersStatus.svg" alt="" />
			</div>
		</div>

		<div class="customer-stats__item">
			<div class="customer-stats__info">
				<h3>Deals</h3>
				<p>{{ dealsLength }}</p>
			</div>
			<div class="customer-stats__icon customer-stats__icon--green">
				<img src="@/assets/icons/DealsStatus.svg" alt="" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useEntityLength } from "~/store/EntityLength";
	const isEntityLength = useEntityLength();

	const customerLength = isEntityLength.customerLength;
	const dealsLength = isEntityLength.dealsLength;
</script>

<style lang="scss">
	.customer-stats {
		.customer-stats__icon {
			margin-left: auto;
		}

		.customer-stats__item {
			display: flex;
			align-items: center;
			padding: 21px;
			border-radius: 12px;
			background-color: #fff;
			border: 1px #e6e9f0 solid;

			&:not(:first-child) {
				margin-top: 24px;
			}

			.customer-stats__info {
				h3 {
					font-size: 20px;
					font-weight: 400;
					color: #7e92a2;
					margin-bottom: 10px;
				}

				p {
					color: #092c4c;
					font-size: 60px;
					font-weight: 500;
				}
			}
		}
	}
</style>
