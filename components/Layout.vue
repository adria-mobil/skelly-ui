<script setup>
import {computed, ref} from "vue";
import XButtonDropdown from "./ButtonDropdown.vue";

let props = defineProps({
    mobileBreakpoint: {type: String, default: "lg:hidden"},
    desktopBreakpoint: {type: String, default: "lg:flex"},
    userMenu: {type: Boolean, default: true},
    username: {type: String, default: "John Doe"}
})

let sidebarToggle = ref(null)
let openSidebar = () => {
    sidebarToggle.value.checked = true;
}
let closeSidebar = () => {
    sidebarToggle.value.checked = false;
}

let drawerBreakpoint = computed(() => {
    if (props.mobileBreakpoint === 'md:hidden') {
        return "drawer-md"
    }

    if (props.mobileBreakpoint === 'sm:hidden') {
        return "drawer-sm"
    }

    return null;
})

defineExpose({
    openSidebar,
    closeSidebar
})
</script>
<template>
    <div class="drawer drawer-mobile" :class="[drawerBreakpoint]">
        <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" ref="sidebarToggle"/>
        <div class="drawer-content bg-base-200">
            <div
                class="sticky top-0 z-30 flex h-16 w-full justify-center backdrop-blur transition-all duration-100 bg-accent shadow-sm">
                <div class="navbar w-full">
                    <div class="flex flex-1 md:gap-1 lg:gap-2">
                        <label @click="openSidebar" class="btn btn-square btn-ghost drawer-button text-accent-content"
                               :class="[mobileBreakpoint]">
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                        <div class="flex items-center gap-2" :class="[mobileBreakpoint]">
                            <slot name="logo"/>
                        </div>
                    </div>
                    <div class="flex-0">
                        <div class="flex text-accent-content">
                            <slot name="headerButtons"/>
                        </div>
                        <XButtonDropdown v-if="userMenu" class="dropdown-end">
                            <template #button="{ close }">
                                <slot name="userMenuButton">
                                    <button class="btn gap-1 btn-ghost text-accent-content">
                                        <svg width="24px" height="24px" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>{{ username }}</span>
                                        <svg width="12px" height="12px"
                                             class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                                            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                                        </svg>
                                    </button>
                                </slot>
                            </template>
                            <template #menu="{ close }">
                                <ul>
                                    <li>
                                        <a href="#" @click="close()">Sign out</a>
                                    </li>
                                </ul>
                            </template>
                        </XButtonDropdown>
                    </div>
                </div>
            </div>
            <slot />
        </div>
        <div class="drawer-side overflow-x-hidden">
            <label for="sidebar-drawer" class="drawer-overlay"></label>
            <aside class="bg-base-300 w-80">
                <div
                    class="z-20 bg-accent backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden shadow-sm"
                    :class="[desktopBreakpoint]">
                    <slot name="logo"/>
                </div>
                <div class="h-4"></div>
                <ul class="menu menu-compact flex flex-col p-0 px-4">
                    <slot name="navigation"/>
                </ul>
            </aside>
        </div>
    </div>
    <slot name="loading" />
</template>
<style lang="css">
@media (min-width: 768px) {
    .drawer-mobile.drawer-md {
        grid-auto-columns: max-content auto;
    }

    .drawer-mobile.drawer-md > .drawer-toggle ~ .drawer-side {
        overflow-y: auto;
    }

    .drawer-mobile.drawer-md > .drawer-toggle ~ .drawer-side > .drawer-overlay {
        visibility: visible;
    }

    .drawer-mobile.drawer-md > .drawer-toggle ~ .drawer-content {
        grid-column-start: 2;
        height: auto;
    }

    .drawer-mobile.drawer-md > .drawer-toggle ~ .drawer-side > .drawer-overlay + * {
        --tw-translate-x: 0px;
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
}

@media (min-width: 640px) {
    .drawer-mobile.drawer-sm {
        grid-auto-columns: max-content auto;
    }

    .drawer-mobile.drawer-sm > .drawer-toggle ~ .drawer-side {
        overflow-y: auto;
    }

    .drawer-mobile.drawer-sm > .drawer-toggle ~ .drawer-side > .drawer-overlay {
        visibility: visible;
    }

    .drawer-mobile.drawer-sm > .drawer-toggle ~ .drawer-content {
        grid-column-start: 2;
        height: auto;
    }

    .drawer-mobile.drawer-sm > .drawer-toggle ~ .drawer-side > .drawer-overlay + * {
        --tw-translate-x: 0px;
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
}
</style>
