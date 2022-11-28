<script setup>
import XCheckboxInput from "./CheckboxInput.vue"

let props = defineProps({
    id: {required: true},
    modelValue: {default: false},
    value: {},
    inputClass: {type: String, default: "toggle"},
    trueValue: {default: true},
    falseValue: {default: false},
    label: {type: String, default: null}
})
</script>
<template>
    <XCheckboxInput :id="id"
               :value="value"
               :model-value="modelValue"
               @update:modelValue="$emit('update:modelValue', $event)"
               :input-class="inputClass"
               :true-value="trueValue"
               :false-value="falseValue"
               :label="label"/>
</template>
