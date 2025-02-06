<template>
	<div>
		<button class="button-ui">
			<span class="button-ui__text">
				<slot>{{ btnText }}</slot>
			</span>
			<span class="button-ui__plus">
				<Icon name="material-symbols:add-rounded" />
			</span>
		</button>
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		btnText: {
			type: String,
		},
	});
</script>

<style lang="scss">
	.button-ui {
		display: flex;
		background-color: #514ef3;
		border: none;
		border-radius: 70px;
		padding: 10px 16px 8px 20px;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			background-color: #4b49e5;
		}

		&__text {
			font-size: 14px;
			color: #fff;
		}

		&__plus {
			margin-left: 8px;
			color: #fff;
			font-size: 16px;
		}
	}
</style>
