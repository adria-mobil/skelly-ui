<script setup>
import {computed} from "vue";

let props = defineProps({
    errors: {
        type: Object,
        default: () => {}
    }
})

let errorCount = computed(() => {
    return Object.keys(props.errors).length
})

let parseErrorGroup = (group) => {
    if (group instanceof Array) {
        return group;
    }

    return [group];
}
</script>
<template>
    <div class="alert alert-error" v-if="errorCount">
        <div class="flex space-x-2 items-center">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" ariaHidden="true"
                 class="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clip-rule="evenodd"></path>
            </svg>
            <ul :class="{ 'list-disc pl-5 space-y-1': errorCount > 1 }">
                <template v-for="group in errors">
                    <li v-for="(error, index) in parseErrorGroup(group)" :key="index">
                        {{ error }}
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
