<script setup>
import {ref} from "vue";

let props = defineProps({
    openOnInit: {type: Boolean, default: false},
    clear: {type: String, default: "Clear filters"},
    filters: {type: Array, default: () => []},
    query: {
        type: Object, default: () => {
            return {};
        }
    }
})

let toggle = () => open.value = !open.value;
let activeFilters = () => {
    return props.filters.filter(filter => {
        return props.query[filter] !== undefined;
    })
}


let omitFilters = () => {
    let query = {...props.query};
    activeFilters().forEach(filter => {
        delete query[filter];
    })

    return query;
}

defineExpose({ toggle })

let open = ref(props.openOnInit ? activeFilters().length > 0 : false)
</script>
<template>
    <div v-if="open">
        <slot/>
        <slot name="clear" v-if="activeFilters().length">
            <button class="btn btn-xs btn-outline" @click="$emit('clear', omitFilters())">
                {{ clear }}
            </button>
        </slot>
    </div>
</template>
