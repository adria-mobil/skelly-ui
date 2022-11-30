<script setup>
defineProps({
    headerClass: {
        type: String,
        default: null
    },
    bodyClass: {
        type: String,
        default: null
    },
    footerClass: {
        type: String,
        default: "justify-end"
    },
    overflows: {
        type: Boolean,
        default: true,
        required: false
    }
})
</script>
<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body space-y-4" :class="[bodyClass]">
            <h2 class="card-title" :class="[headerClass]" v-if="$slots.header">
                <slot name="header" />
            </h2>
            <slot />
            <div class="card-actions" :class="[footerClass]" v-if="$slots.footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>
