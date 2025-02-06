<template>
	<div class="deals">
		<SortingHeader :title="`deals`" :total="deals.length" :sortOptions="dealSortOptions" @sortChange="handleSortChange" />

		<CustomerDealFields :option="dealOption" :ImageUrl="ImageUrl" />

		<div v-if="deals.length > 0">
			<div v-for="deal in processedDeals" :key="deal.id">
				<DealItem :item="deal" />
			</div>
		</div>
		<div class="deals__not-found" v-else>
			<img src="@/assets/icons/DealNotFound.svg" alt="">
			<p>No deals found.</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, provide, computed } from 'vue';
import { $fetch } from "ofetch";
import IconUrl from "@/assets/icons/Icon.svg";
import type { Deal } from "~/types/deal";
import { useEntityLength } from "~/store/EntityLength";
const ImageUrl = IconUrl;

const dealsLength = useEntityLength();

const deals = ref<Deal[]>([]);
const selectedSortOption = ref<string>("Price: Low to high");

const dealSortOptions = [
	"Price: Low to high",
	"Price: High to low",
	"Date: Old to new",
	"Date: New to old",
	"Status: In Progress",
	"Status: Completed",
];

const dealOption = ["Name", "Area", "Appointment Date", "roomAccess", "Price", "Status", "Edit"];

const fetchDeals = async () => {
	try {
		const res = await $fetch<Deal[]>('/api/deals');
		deals.value = res || [];
		dealsLength.setDealsLength(deals.value.length);
	} catch (e) {
		console.log("Ошибка при загрузке сделок:", e);
	}
};

const handleSortChange = (option: string) => {
	selectedSortOption.value = option;
};

const processedDeals = computed(() => {
	const temp = [...deals.value];

	if (selectedSortOption.value.startsWith("Status:")) {
		const status = selectedSortOption.value.replace("Status:", "").trim().toLowerCase();
		return temp.filter((deal: Deal) => deal.status.toLowerCase() === status);
	}

	if(selectedSortOption.value === "Price: Low to high"){
		return temp.sort((a: Deal, b: Deal) => +a.price - +b.price);
	}

	if(selectedSortOption.value === "Price: High to low"){
		return temp.sort((a: Deal, b: Deal) => +b.price - +a.price);
	}

	if(selectedSortOption.value === "Date: Old to new"){
		return temp.sort((a: Deal, b: Deal) => +new Date(a.appointmentDate) - +new Date(b.appointmentDate));
	}

	if(selectedSortOption.value === "Date: New to old"){
		return temp.sort((a: Deal, b: Deal) => +new Date(b.appointmentDate) - +new Date(a.appointmentDate));
	}

	return temp;
});


provide("deals", deals);
onMounted(() => {
	fetchDeals();
});
</script>

<style lang="scss">
.deals{
	padding: 34px 24px 24px;
	display: flex;
	flex-direction: column;
	height: 750px;
	overflow-y: auto;

	.deals__not-found {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15px;
	height: 100%;

	img{
		height: 50px;
		width: 50px;
	}

	p{
		font-size: 50px;
		color: #7e92a2;
		font-weight: 400;
	}
	
}
&::-webkit-scrollbar{
width: 16px;
height: 16px;
}
&::-webkit-scrollbar-thumb {
	background-color: #d1cfcf;
	border-radius: 16px;
}
}


</style>
