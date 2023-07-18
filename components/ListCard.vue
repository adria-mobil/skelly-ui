<script setup>
import XCard from "./Card.vue"

let props = defineProps({
    data: {type: [Array, Object]},
    empty: {type: [Boolean, String], default: "No items yet."}
})

let items = props.data instanceof Object ? Object.values(props.data) : props.data;
</script>
<template>
    <XCard
        gap-class="gap-0"
        body-class="p-0 divide-y divide-base-content divide-opacity-20 !space-y-0 gap-0">
        <template #header v-if="$slots.header">
            <slot name="header"/>
        </template>
        <slot name="body" :data="items">
            <div v-if="items.length">
                <ul class="divide-y divide-base-content divide-opacity-20">
                    <li v-for="(item, index) in items" :key="index">
                        <slot name="item" :item="item"/>
                    </li>
                </ul>
            </div>
            <div v-else-if="empty" class="flex items-center justify-center py-4">
                <slot name="empty">
                    <span>{{ empty }}</span>
                </slot>
            </div>
        </slot>
        <template #footer v-if="$slots.footer && items.length">
            <slot name="footer"/>
        </template>
    </XCard>
</template>
