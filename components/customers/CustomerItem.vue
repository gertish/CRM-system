<template>
    <div class="customer-item">
        <div class="customer-item__avatar">
    <img :src="item.avatar || DefaultImg" alt="">
        </div>
    <div v-for="(value,key) in item" :key="key" class="customer-item__order-details">
        <div v-if="key !== 'id' && key !== 'avatar' && key !== 'streetAddress' && key !== 'city' && key !== 'state'">{{ value }}</div>
        <div v-if="key === 'streetAddress' && value">{{ value }},</div>
        <div v-if="key === 'city' && value">{{ value }},</div>
        <div v-if="key === 'state' && value">{{ value }},</div>
    </div>
    <nuxt-link :to="IconRoute">
        <img src="@/assets/icons/Addition.svg" alt="">
    </nuxt-link>
    </div>
    
    </template>
    
    
    <script lang="ts" setup>
    import {computed} from 'vue';
    import type { Customer } from '~/types/customer';
    import DefaultImg from "@/assets/icons/DefaultImg.svg";

    const props = defineProps<{
        item:Customer
    }>();

    const IconRoute = computed(()=> {
    return `/customerDetails/${props.item.id}`
})
    </script>
    
    <style lang="scss">
    .customer-item {
        display: grid;
        align-items: center;
        grid-template-columns: 0fr 0.11fr 0.6fr 2fr 2.5fr 0fr 0.8fr 0.5fr 0.6fr 0.7fr 1.2fr 0fr;
        border-top: 1px solid #e9ebf0;
        color: #092c4c;
        padding: 14px 24px 14px 10px;
    
        .customer-item__avatar {
            img {
            height: 44px;
            width: 44px;
            border-radius: 100px;
        }
        }

    }
    </style>