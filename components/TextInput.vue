<script setup>
import {computed} from "vue";

let props = defineProps({
    inputClass: {type: String, default: ""},
    labelAsPlaceholder: {type: Boolean, default: false},
    label: {type: String},
    modelValue: {required: true},
    errors: {
        type: [Array, String],
        default: () => []
    }
})

let parseErrors = () => {
    if (props.errors instanceof Array) {
        return props.errors;
    }
    return [props.errors];
}

let isError = computed(() => {
    return parseErrors().length > 0;
})
</script>
<template>
    <div class="form-control">
        <label class="label" v-if="!labelAsPlaceholder">
            <span class="label-text" :class="{'text-error' : isError}">{{ label }}</span>
        </label>
        <input :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
               type="text"
               :placeholder="labelAsPlaceholder ? label : ''"
               class="input input-bordered focus:outline-none"
               :class="[inputClass, { 'input-error' : isError }]"
        />
        <label class="label" v-if="isError">
          <span class="label-text text-error">
            {{ parseErrors()[0] }}
          </span>
        </label>
    </div>
</template>
