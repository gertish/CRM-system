import { defineStore } from "pinia";
import { ref } from "vue";

export const useEntityLength = defineStore(
	"entityLengthStore",
	() => {
		const customerLength = ref(0);
		const dealsLength = ref(0);

		const setCustomerLength = (length: number) => {
			customerLength.value = length;
		};

		const setDealsLength = (length: number) => {
			dealsLength.value = length;
		};

		return {
			customerLength,
			dealsLength,
			setCustomerLength,
			setDealsLength,
		};
	},
	{
		persist: true,
	}
);
