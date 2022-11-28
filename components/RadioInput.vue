<script setup>
import {computed} from "vue";

let props = defineProps({
    id: {required: true},
    modelValue: {default: false},
    value: {},
    inputClass: {type: String, default: 'radio'},
    label: {type: String, default: null}
})

let emit = defineEmits(['update:modelValue'])

let isChecked = computed(() => {
    return props.modelValue === props.value;
})

let updateInput = () => {
    emit('update:modelValue', props.value)
}
</script>
<template>
    <div class="form-control">
        <label class="label cursor-pointer justify-start gap-4">
            <input
                :id="id"
                type="checkbox"
                :checked="isChecked"
                :value="value"
                @change="updateInput"
                :class="inputClass"
            />
            <span class="label-text">{{ label }}</span>
        </label>
    </div>
</template>
