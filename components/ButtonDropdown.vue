<script setup>
import {ref} from "vue";

let props = defineProps({
    menuClass: {type: String, default: "w-52 max-h-60 overflow-y-auto"}
})

let dropdown = ref(null);
let open = () => {
    dropdown.value.classList.add('dropdown-open');
}
let close = () => {
    dropdown.value.classList.remove('dropdown-open');
    document.activeElement.blur()
}

defineExpose({
    open,
    close
})

let vUpDown = {
    mounted(el, binding, vnode, prevVnode) {
        el.addEventListener("click", () => {
            let space = window.innerHeight - el.getBoundingClientRect().bottom;
            let button = el.children[0];
            let menu = el.children[1];
            let height = Math.max(button.offsetHeight)

            if (!menu) {
                return;
            }

            height += menu.offsetHeight;

            if (space < height) {
                dropdown.value.classList.add("dropdown-top");
            } else {
                dropdown.value.classList.remove("dropdown-top");
            }

        })
    }
}
</script>
<template>
    <div class="dropdown" ref="dropdown" v-up-down>
        <label tabindex="0">
            <slot name="button" :open="open" :close="close"/>
        </label>
        <div tabindex="0" class="dropdown-content menu menu-compact block p-2 shadow bg-base-100 rounded-box z-10"
             :class="[menuClass]">
            <slot name="menu" :open="open" :close="close"/>
        </div>
    </div>
</template>
