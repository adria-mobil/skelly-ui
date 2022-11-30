<script setup>
let props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {}
        }
    },
    previous: {type: String, default: "Previous"},
    next: {type: String, default: "Next"},
    prevPageUrl: {type: String, default: null},
    nextPageUrl: {type: String, default: null},
})
</script>
<template>
    <nav v-if="data.total" class="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div>
            <p class="text-sm text-base-content">
                <slot name="text" :data="data">
                    Showing
                    <span class="font-medium">{{ data.from }}</span>
                    to
                    <span class="font-medium">{{ data.to }}</span>
                    of
                    <span class="font-medium">{{ data.total }}</span>
                    results
                </slot>
            </p>
        </div>

        <slot name="buttons" :data="data">
            <div
                class="flex-1 flex justify-between md:justify-end space-x-2"
                v-if="data.prev_page_url || data.next_page_url || nextPageUrl || prevPageUrl"
            >
                <button class="btn btn-sm"
                        v-if="prevPageUrl || data.prev_page_url"
                        @click="$emit('change', {
                            url: prevPageUrl ? prevPageUrl : data.prev_page_url,
                            page: data.current_page - 1
                        })">
                    {{previous}}
                </button>
                <button class="btn btn-sm"
                        v-if="nextPageUrl || data.next_page_url"
                        @click="$emit('change', {
                            url: nextPageUrl ? nextPageUrl : data.next_page_url,
                            page: data.current_page + 1
                        })">
                    {{next}}
                </button>
            </div>
        </slot>
    </nav>
</template>
