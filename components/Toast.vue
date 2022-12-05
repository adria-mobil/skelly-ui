<script setup>
import {onMounted} from "vue";

const emit = defineEmits(['hide'])

const props = defineProps({
    alertClass: {
        type: String,
        default: "alert-warning"
    },
    timeout: {
        type: Number,
        default: 0,
        required: false,
    }
})

onMounted(() => {
    if (props.timeout > 0) {
        setTimeout(function () {
            emit('hide');
        }, props.timeout);
    }
})

</script>
<template>
    <div class="toast">
        <div class="alert" :class="[alertClass]">
            <slot/>
        </div>
    </div>
</template>
