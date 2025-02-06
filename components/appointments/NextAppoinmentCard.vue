<template>
	<div class="appoinment-card">
		<div class="appoinment-card__title">
			<h2>Next Appoinment</h2>
			<div class="appoinment-card__circle"></div>
		</div>

		<div class="appoinment-card__address">
			<img src="@/assets/icons/DefaultImg.svg" alt="" />
			<div>
				<p style="font-weight: 500">319 Haul Road</p>
				<p style="font-weight: 300">Glenrock,<span> WY 12345</span></p>
			</div>
		</div>

		<div class="appoinment-card__date">
			<p style="font-weight: 300">Appointment Date</p>
			<p style="font-weight: 500; font-size: 18px"
				>Nov 18, 2021, <span>17:00</span></p
			>
		</div>

		<div class="appoinment-card__details">
			<div>
				<p style="font-weight: 300">Room Area</p>
				<p style="font-weight: 500">100 M²</p>
			</div>
			<div>
				<p style="font-weight: 300">People</p>
				<p style="font-weight: 500">10</p>
			</div>
		</div>

		<div class="appoinment-card__price">
			<div>
				<p style="font-weight: 300">Price</p>
				<p style="font-weight: 500">$5750</p>
			</div>
			<button>See Detail</button>
		</div>
		<div class="appoinment-card__background">
			<img src="@/assets/icons/Background.svg" alt="" />
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
	.appoinment-card {
		background-color: #514ef3;
		border-radius: 12px;
		padding: 24px;
		max-height: 392px;
		position: relative;
		color: #fff;
		font-family: "Poppins", sans-serif;
		overflow: hidden;

		.appoinment-card__address {
			display: flex;
			gap: 10px;
			line-height: 28px;
		}

		.appoinment-card__date {
			margin-top: 24px;
			line-height: 30px;
		}

		.appoinment-card__details {
			display: flex;
			margin-top: 24px;
			gap: 60px;
		}

		.appoinment-card__price {
			display: flex;
			margin-top: 26px;
			justify-content: space-between;

			button {
				padding: 10px 32px;
				border-radius: 70px;
				background-color: #fff;
				border: none;
				color: #092c4c;
				font-weight: 600;
				transition: all 0.3s ease-in-out;
				z-index: 10;

				&:hover {
					background-color: #e8ecef;
				}
			}
		}

		.appoinment-card__background {
			position: absolute;
			top: 225px;
			left: 100px;
		}

		.appoinment-card__title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24px;

			h2 {
				font-weight: 500;
			}

			.appoinment-card__circle {
				width: 10px;
				height: 10px;
				background-color: #fff;
				border-radius: 50%;
			}
		}
	}
</style>
