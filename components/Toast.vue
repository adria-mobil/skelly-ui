<script setup>
defineProps({
    alertClass: {
        type: String,
        default: "alert-warning"
    }
})
</script>
<template>
    <div class="toast">
        <div class="alert" :class="[alertClass]">
            <slot />
        </div>
    </div>
</template>
