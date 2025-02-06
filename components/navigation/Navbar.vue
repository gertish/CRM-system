<template>
	<nav class="navbar">
		<div class="navbar__menu">
			<nuxt-link to="/" class="navbar__link" active-class="navbar__item_active">
				<div class="navbar__item">
					<Icon
						class="navbar__icon"
						name="iconoir:view-grid"
						style="color: #7e91a1; width: 20px; height: 20px"
					/>
				</div>
			</nuxt-link>

			<nuxt-link
				to="/deals/deals"
				class="navbar__link"
				active-class="navbar__item_active"
			>
				<div class="navbar__item">
					<Icon
						class="navbar__icon"
						name="hugeicons:briefcase-03"
						style="color: #7e91a1; width: 20px; height: 20px"
					/>
				</div>
			</nuxt-link>
			<nuxt-link
				to="/customers/customers"
				class="navbar__link"
				active-class="navbar__item_active"
			>
				<div class="navbar__item">
					<Icon
						class="navbar__icon"
						name="solar:users-group-rounded-linear"
						style="color: #7e91a1; width: 20px; height: 20px"
					/>
				</div>
			</nuxt-link>

			<nuxt-link
				to="/tasks/tasks"
				class="navbar__link"
				active-class="navbar__item_active"
			>
				<div class="navbar__item">
					<Icon
						class="navbar__icon"
						name="iconoir:task-list"
						style="color: #7e91a1; width: 20px; height: 20px"
					/>
				</div>
			</nuxt-link>

			<div class="navbar__item">
				<Icon
					class="navbar__icon"
					name="mage:calendar-2"
					style="color: #7e91a1; width: 20px; height: 20px"
				/>
			</div>
			<div class="navbar__item">
				<Icon
					class="navbar__icon"
					name="material-symbols-light:notifications-outline-rounded"
					style="color: #7e91a1; width: 20px; height: 20px"
				/>
			</div>
			<div class="navbar__item">
				<Icon
					class="navbar__icon"
					name="mdi-light:settings"
					style="color: #7e91a1; width: 20px; height: 20px"
				/>
			</div>
		</div>
	</nav>
</template>

<script lang="ts" setup></script>

<style lang="scss">
	.navbar {
		min-height: 820px;
		padding: 20px 19px 0 20px;
		background-color: #f6fafd;
		

		&__menu {
			flex-direction: column;
			display: flex;
			gap: 17px;
		}

		&__item {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 50px;
			height: 50px;
			box-shadow: 0 0 0 0.7px #eaeef4;
			border: none;
			border-radius: 100%;
			transition: all 0.3s ease-in-out;

			&:hover {
				background-color: #e9ebf0;
			}
		}

		&__item_active {
			background-color: #514ef3;
			border-radius: 100px;
			border: none;
			pointer-events: none;

			.navbar__icon {
				color: white !important;
			}
		}
	}
</style>
