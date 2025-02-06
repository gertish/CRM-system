<template>
	<div class="recent-deals">
		<div class="recent-deals__title">
			<h2>Recent Deals</h2>
			<p>View All</p>
		</div>
		<div v-for="deal in deals" :key="deal.id" class="recent-deals__item">
			<img :src="deal.avatar" alt="" />
			<div class="recent-deals__contact">
				<p>{{ deal.address }}</p>
				<h4>{{ deal.city }}, {{ deal.state }}</h4>	
			</div>

			<div class="recent-deals__meta">
				<p>$5750</p>
				<span>{{ formateDate(deal.appointmentDate) }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Deal } from '~/types/deals.d.ts';
import { formateDate } from '~/utils/formatDate';

const deals = ref<Deal[]>([]);

const fetchDeals = async () => {
	try {
		const res = await $fetch<Deal[]>('/api/deals');
		deals.value = res || [];
	} catch (e) {
		console.log("Ошибка при загрузке сделок:", e);
	}
};

onMounted(() => {
	fetchDeals();
});

</script>

<style lang="scss" scoped>
	.recent-deals {
		border: 1px #e6e9f0 solid;
		padding: 24px 24px 9px 24px;
		background-color: #fff;
		border-radius: 12px;
		max-height: 392px;
		width: 519px;
		overflow-y: auto;
		height: 100%;

		.recent-deals__title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24px;
			h2 {
				font-weight: 600;
				color: #092c4c;
			}

			p {
				color: #514ef3;
			}
		}

		.recent-deals__item {
			display: flex;
			align-items: center;
			gap: 10px;
			margin-bottom: 10px;

			.recent-deals__contact {
				line-height: 25px;

				h4 {
					font-weight: 300;
					color: #7e92a2;
				}

				p {
					font-weight: 500;
					color: #092c4c;
				}
			}

			.recent-deals__meta {
				margin-left: auto;
				text-align: end;
				line-height: 25px;
				p {
					color: #092c4c;
					font-weight: 500;
				}

				span {
					font-weight: 300;
					color: #7e92a2;
				}
			}
			img{
				height: 44px;
				width: 44px;
				border-radius: 50%;
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
