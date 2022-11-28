<script setup>
import XButtonDropdown from "./ButtonDropdown.vue"
import {computed, ref} from "vue";

let props = defineProps({
    modelValue: {required: true},
    // Booleans
    closeAfterMultipleSelect: {type: Boolean, default: false},
    showDeselectAll: {type: Boolean, default: true},
    labelAsPlaceholder: {type: Boolean, default: false},
    search: {type: [Boolean, Function], default: false},
    multiple: {type: Boolean},
    // Strings
    label: {type: String},
    noOptionsSelected: {type: String, default: 'No options selected'},
    searchPlaceholder: {type: String, default: 'Search...'},
    deselectAll: {type: String, default: 'Deselect all'},
    inputClass: {type: String, default: ""},
    maxHeight: {type: String, default: "max-h-60"},
    // Resolvers
    labelResolver: {default: null},
    valueResolver: {default: null},
    selectedResolver: {default: null},
    // Methods/objects
    errors: {
        type: [Array, String],
        default: () => []
    },
    options: {
        type: Array,
        default: () => [],
    },
    empty: {
        type: Object,
        default: () => {
            return {value: null, title: '&mdash;'}
        }
    },
})

let emit = defineEmits(['update:modelValue'])

let optionsList = props.options;
let searchQuery = ref("")
let button = ref(null);

let parseErrors = () => {
    if (props.errors instanceof Array) {
        return props.errors;
    }
    return [props.errors];
}

let isError = computed(() => {
    return parseErrors().length > 0;
})

let filteredOptions = () => {
    if (typeof props.search === 'boolean') {
        return [...optionsList].filter(
            option => resolveLabel(option).toLowerCase().search(searchQuery.value.toLowerCase()) > -1
        )
    }

    if (typeof props.search === 'function') {
        return [...optionsList].filter(option => props.search(option, searchQuery.value))
    }

    return optionsList;
}

let resolveLabel = (option) => {
    if (typeof props.labelResolver === 'function') {
        return this.labelResolver(option);
    }
    if (props.labelResolver) {
        return option[props.labelResolver];
    }
    return option;
}

let resolveValue = (item) => {
    if (typeof props.valueResolver === "function") {
        return props.valueResolver(item)
    }

    if (props.valueResolver) {
        return item[props.valueResolver]
    }

    return item;
}


let valueIndex = (option) => {
    if (props.modelValue instanceof Array) {
        return -1;
    }

    return props.modelValue.indexOf(resolveValue(option));
}

let selectEmpty = () => {
    emit('update:modelValue', null);
    button.value.close();
}

let select = (option) => {
    if (props.multiple) {
        let newValue = [...props.modelValue]

        if (isSelected(option)) {
            newValue.splice(valueIndex(option), 1);
        } else {
            newValue.push(resolveValue(option));
        }

        emit('update:modelValue', newValue);

        if (props.closeAfterMultipleSelect) {
            button.value.close();
        }

        return 0
    }

    emit('update:modelValue', resolveValue(option));
    button.value.close();
}

let isSelected = (option) => {
    if (props.multiple) {
        return props.modelValue.indexOf(resolveValue(option)) !== -1;
    }

    return resolveValue(option) === props.modelValue;
}
let selected = () => {
    let selected = optionsList.filter(option => isSelected(option));

    if (props.multiple) {
        return selected;
    }

    return selected.length > 0 ? selected[0] : props.empty;
}

let resolveSelected = () => {
    if (props.modelValue !== null && typeof props.selectedResolver === "function") {
        return props.selectedResolver(optionsList, props.modelValue);
    }

    if (props.multiple && props.modelValue.length === 0) {
        return props.noOptionsSelected;
    }

    if (props.multiple) {
        return selected().map(option => resolveLabel(option)).join(', ');
    }

    if (props.modelValue === props.empty.value) {
        return props.empty.title;
    }

    return resolveLabel(selected());
}
</script>
<template>
    <div class="form-control">
        <label class="label" v-if="!labelAsPlaceholder">
            <span class="label-text" :class="{'text-error' : isError}">{{ label }}</span>
        </label>
        <XButtonDropdown ref="button"
                         :menu-class="'w-full mt-2 border border-base-content border-opacity-20 overflow-y-auto ' + maxHeight">
            <template #button>
                <button class="select select-bordered w-full flex items-center" v-html="resolveSelected()"></button>
            </template>
            <template #menu="{ close }">
                <slot name="options" :options="options" :select="select" :isSelected="isSelected">
                    <!-- search -->
                    <li v-if="search" class="mb-2">
                        <input v-model="searchQuery"
                               type="text"
                               :placeholder="searchPlaceholder"
                               class="input input-bordered focus:outline-none" />
                    </li>
                    <!-- empty -->
                    <li v-if="!searchQuery && !multiple && empty && empty.title">
                        <a @click="selectEmpty">
                            <div class="truncate"
                                 :class="[isSelected(empty) ? 'font-semibold' : 'font-normal']"
                                 v-html="empty.title"></div>
                            <div v-if="isSelected(empty)">
                                <svg class="w-4 h-4" stroke="currentColor" fill="currentColor" stroke-width="0"
                                     viewBox="0 0 24 24" ariaHidden="true" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </a>
                    </li>
                    <!-- options -->
                    <li v-for="(option, index) in filteredOptions()">
                        <slot name="option" :option="option" :index="index" :select="select"
                              :resolveLabel="resolveLabel" :isSelected="isSelected">
                            <a @click="select(option); !multiple ? close() : null">
                                <slot name="label" :resolveLabel="resolveLabel" :isSelected="isSelected"
                                      :option="option" :index="index">
                                    <div class="truncate"
                                         :class="[isSelected(option) ? 'font-semibold' : 'font-normal']"
                                         v-html="resolveLabel(option)"></div>
                                </slot>
                                <div v-if="isSelected(option)">
                                    <svg class="w-4 h-4" stroke="currentColor" fill="currentColor" stroke-width="0"
                                         viewBox="0 0 24 24" ariaHidden="true" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </a>
                        </slot>
                    </li>
                </slot>
            </template>
        </XButtonDropdown>
        <label class="label">
          <span class="label-text text-error">
            {{ parseErrors()[0] }}
          </span>
            <button @click="$emit('update:modelValue', [])" class="label-text underline"
                    v-if="multiple && modelValue.length > 0 && showDeselectAll"
                    ref="deselect">
                {{ deselectAll }}
            </button>
        </label>
    </div>
</template>
