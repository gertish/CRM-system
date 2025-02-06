<template>
    <div class="deal-item">
        <div class="deal-item__avatar">
            <img :src="item.avatar || DefaultImg" alt="">
        </div>
        <div v-for="(value, key) in filterItem" :key="key" class="deal-item__order-details">
            <div v-if="key !== 'status' && key !== 'appointmentDate' && key !== 'city' && key !== 'state' && key !== 'numberOfPeople'">{{ value }}
            </div>
                <div v-if="key === 'city'">{{ value }},</div>
                <div v-if="key === 'state' && value">{{ value }},</div>
            <div v-if="key === 'numberOfPeople' && value">{{ value }},</div>
            <div v-if="key === 'appointmentDate' && value">{{ formateDate(value) }},</div>


            <div class="" v-if="key === 'status'">
                <button>{{ value }}</button>
            </div>
        </div>
        <nuxt-link :to="IconRoute">
            <img src="@/assets/icons/Addition.svg" alt="">
        </nuxt-link>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import { formateDate } from '~/utils/formatDate';
import DefaultImg from '@/assets/icons/DefaultImg.svg'
import type { Deal } from '~/types/deal';


const props = defineProps<{
    item: Deal;
}>();

const IconRoute = computed(() => {
    const dealItem = props.item;
    return `/EditDeals/${dealItem.id}`
})


const filterItem = computed(() => {
    const deal = { ...props.item };
    const allowedFields = [
        'streetAddress',
        'city',
        'state',
        'zipCode',
        'roomArea',
        'numberOfPeople',
        'appointmentDate',
        'specialInstructions',
        'roomAccess',
        'price',
        'status']

    Object.keys(deal).forEach(key => {
        if (!allowedFields.includes(key)) {
            delete deal[key as keyof Deal]
        }
    })
    return deal;
})

</script>

<style lang="scss">
.deal-item {
    display: grid;
    align-items: center;
    padding: 20px 24px 20px 12px;
    grid-template-columns: 0.4fr 0.6fr 0.7fr 0.7fr 1fr 0.8fr 0.2fr 0.8fr 1fr 1.4fr 0.9fr 1.12fr 0fr;
    border-top: 1px solid #e9ebf0;
    color: #092c4c;


    .deal-item__avatar {
        img {
            height: 44px;
            width: 44px;
            border-radius: 100px;
        }
    }

    .deal-item__order-details {
        button {
            border: none;
            border-radius: 100px;
            padding: 10px 20px;
            background-color: #ececfe;
            color: #514ef3;
        }
    }
}
</style>