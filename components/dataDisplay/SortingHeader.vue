<template>
	<div class="table-header">
		<div class="table-header__info">
			<h2>Total: {{ total }} {{ title }}</h2>
		</div>
		<div class="table-header__sort">
			<select class="table-header__select"
				@change="onSortChange"
				v-model="selectedSortOption"
			>
				<option
					v-for="(option, index) in sortOptions"
					:key="index"
					class="table-header__option"
				>
					{{ option }}
				</option>
			</select>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
	const props = defineProps<{
		title: String;
		total: Number;
		sortOptions: string[];
	}>();

const emit = defineEmits(["sortChange"]);
const selectedSortOption = ref(props.sortOptions[0]);

const onSortChange = () => {
	emit("sortChange", selectedSortOption.value);
};
</script>

<style lang="scss">
	.table-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 34px;

		.table-header__info {
			h2 {
				color: #092c4c;
			}
		}

		.table-header__sort {
			position: relative;

			.table-header__select {
				appearance: none;
				-webkit-appearance: none;
				-moz-appearance: none;
				padding: 10px 60px 10px 28px;
				border: 1px solid #e6e9f0;
				border-radius: 50px;
				font-size: 16px;
				color: #092c4c;
				font-weight: 500;
				outline: none;
				background-image: url("@/assets/icons/Arrow-down.svg");
				background-repeat: no-repeat;
				background-position: right 20px center;
				cursor: pointer;

				.table-header__option {
					color: #092c4c;
					font-size: 30px;
				}
			}
		}
	}
</style>
