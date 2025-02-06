<template>
	<div class="content">
		<NextAppoinmentCard />
		<RecentDeals />
		<CustomersList />
		<CustomersStats />
		<ActivityDetails />
		<TasksToDo />
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 25px;
	}
</style>
