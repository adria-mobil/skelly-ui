<script setup>
import XTextInput from "./TextInput.vue"

let props = defineProps({
    label: {type: String, default: "Search..."},
    inputClass: {type: String, default: "input-sm"},
    modelValue: {required: true},
})

let search = props.modelValue;
</script>
<template>
    <div class="flex items-center justify-between">
        <slot name="prefix" />
        <form @submit.prevent="$emit('search', search)" ref="form">
            <XTextInput :input-class="inputClass" v-model="search" :label="label" :label-as-placeholder="true" />
        </form>
        <slot name="suffix" />
    </div>
</template>
