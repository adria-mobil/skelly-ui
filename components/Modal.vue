<script setup lang="ts">
import {ref} from "vue";

let props = defineProps({
    noTransition: {type: Boolean, default: false},
    noBackdrop: {type: Boolean, default: false},
    modalBoxClass: {type: String, default: null},
    closeButton: {type: Boolean, default: false},
    closeOnOverlay: {type: Boolean, default: false}
})
defineEmits(['closed'])
let modal = ref<HTMLElement | null>(null)
let close = () => {
    modal.value?.classList.remove("modal-open");
}
let open = () => {
    modal.value?.classList.add("modal-open");
}
let closeIfOverlay = (event) => {
    if (props.closeOnOverlay && event.target.classList.contains('modal')) {
        close();
    }
}

defineExpose({
    close,
    open
})
</script>
<template>
    <div ref="modal"
         @click="closeIfOverlay"
         class="modal"
         :class="{ 'no-backdrop': noBackdrop, 'no-transition': noTransition }">
        <div class="modal-box" :class="[modalBoxClass]">
            <label class="btn btn-sm btn-circle absolute right-2 top-2"
                   @click="close"
                   v-if="closeButton">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </label>
            <slot/>
            <div class="modal-action" v-if="$slots.footer">
                <slot name="footer" :close="close" />
            </div>
        </div>
    </div>
</template>
