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
    },
    labelResolver: {default: null},
    valueResolver: {default: null},
    bordered: {type: Boolean, default: true},
    empty: {
        type: [Object, {title: null, value: null}],
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array,
        default: () => [],
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

let resolveValue = (item) => {
    if (item === null) {
        return "";
    }

    if (typeof props.valueResolver === "function") {
        return props.valueResolver(item)
    }

    if (props.valueResolver) {
        return item[props.valueResolver]
    }

    return item;
}

let resolveLabel = (item) => {
    if (typeof props.labelResolver === "function") {
        return props.labelResolver(item)
    }

    if (props.labelResolver) {
        return item[props.labelResolver]
    }

    return item;
}
</script>
<template>
    <div class="form-control w-full max-w-xs">
        <label class="label" v-if="label && !labelAsPlaceholder">
            <span class="label-text" :class="{'text-error' : isError}">{{ label }}</span>
        </label>
        <select class="select focus:outline-none"
                :class="[inputClass, {'select-bordered': bordered, 'select-error' : isError}]"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                :disabled="disabled">
            <option v-if="label && labelAsPlaceholder" value="" selected disabled>{{ label }}</option>
            <option v-if="empty && empty.title" :value="resolveValue(empty.value)" v-html="empty.title"/>
            <option :value="resolveValue(item)" v-for="(item, index) in options" :key="index">
                {{ resolveLabel(item) }}
            </option>
        </select>
        <label class="label" v-if="parseErrors.length">
      <span class="label-text text-error">
        {{ parseErrors()[0] }}
      </span>
        </label>
    </div>
</template>
