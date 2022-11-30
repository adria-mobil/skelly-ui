<script setup>
import {computed} from "vue";

let props = defineProps({
    id: {required: true},
    modelValue: {default: false},
    value: {},
    inputClass: {type: String, default: 'checkbox'},
    trueValue: {default: true},
    falseValue: {default: false},
    label: {type: String, default: null}
})

let emit = defineEmits(['update:modelValue'])

let isChecked = computed(() => {
    if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value)
    }

    return props.modelValue === props.value;
})

let updateInput = (event) => {
    let isChecked = event.target.checked;

    if (props.modelValue instanceof Array) {
        let newValue = [...props.modelValue]

        if (isChecked) {
            newValue.push(props.value)
        } else {
            newValue.splice(newValue.indexOf(props.value), 1);
        }

        emit('update:modelValue', newValue);
        return 0;
    }

    emit('update:modelValue', isChecked ? props.trueValue : props.falseValue)
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
            <span class="label-text" v-if="label">{{ label }}</span>
        </label>
    </div>
</template>
