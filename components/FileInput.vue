<script setup>
import {computed, ref} from "vue";

let props = defineProps({
    inputClass: {type: String, default: ""},
    clear: {type: String, default: "Clear"},
    label: {type: String},
    modelValue: {required: true},
    showClearButton: {type: Boolean, default: true},
    errors: {
        type: [Array, String],
        default: () => []
    }
})

let fileInput = ref(null)
let parseErrors = () => {
    if (props.errors instanceof Array) {
        return props.errors;
    }
    return [props.errors];
}

let isError = computed(() => {
    return parseErrors().length > 0;
})

let click = (event) => {
    fileInput.value.click();
}

defineExpose({ click })
</script>
<template>
    <div class="form-control">
        <label class="label" v-if="label">
            <span class="label-text" :class="{'text-error' : isError}">{{ label }}</span>
        </label>
        <input type="file"
               class="file-input file-input-bordered"
               ref="fileInput"
               @change="$emit('update:modelValue', $event.target.files[0])"
               :class="[inputClass, { 'file-input-error': isError }]" />
        <label class="label">
          <span class="label-text text-error">
            {{ parseErrors()[0] }}
          </span>
            <button @click="$refs.fileInput.value = null; $emit('update:modelValue', null)"
                    v-if="showClearButton && modelValue !== null"
                    class="label-text underline">
                {{ clear }}
            </button>
        </label>
    </div>
</template>
