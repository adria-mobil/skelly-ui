<script setup>
import XSpinnerIcon from "./SpinnerIcon.vue"

defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})
</script>
<template>
    <transition
        enter-active-class="transition-opacity ease-linear duration-200"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-show="modelValue"
            v-bind="$attrs"
            class="w-full h-screen fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-70 z-20 text-primary"
        >
            <XSpinnerIcon/>
        </div>
    </transition>
</template>
