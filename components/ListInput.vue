<script setup>
import {nanoid} from "nanoid"
import {ref, watch} from "vue";

let props = defineProps({
    modelValue: {required: true},
    default: {type: Object},
    collapsed: {type: Boolean, default: true},
    header: {type: Boolean, default: true},
    simple: {type: Boolean, default: false},
    disableNew: {type: Boolean, default: false},
    extraData: {
        type: Object, default: () => {
            return {};
        }
    },
    addNew: {type: String, default: "Add new"}
})

let emit = defineEmits(['update:modelValue'])

let items = ref(props.modelValue !== null ? props.modelValue.map(item => {
    if (props.simple) {
        item = { value: item };
    }

    if (!props.simple) {
        Object.keys(props.default).forEach((key, value) => {
            if (item[key] === undefined) {
                item[key] = props.default[key]
            }
        })
    }

    if (item.uid === undefined) {
        item.uid = nanoid();
    }

    item.open = !props.collapsed;

    return item;
}) : []);

watch(() => items.value, () => {
    if (props.simple) {
        emit('update:modelValue', items.value.map(item => item.value));
        return 0;
    }

    emit('update:modelValue', items.value.map(item => {
        let object = {...item};
        delete object['open'];
        return object;
    }));
}, {deep: true})

let toggle = (index) => {
    let i = [...items.value];
    i[index].open = !i[index].open
    items.value = i;
}

let add = () => {
    if (props.simple) {
        items.value.push({ value: null })
        return 0;
    }

    items.value.push({
        ...props.default,
        uid: nanoid(),
        open: !props.collapsed
    })
}

let moveUp = (index) => {
    if (index > 0) {
        items.value = arrayMove([...items.value], index, index - 1)
    }
}

let moveDown = (index) => {
    if (index < items.value.length - 1) {
        items.value = arrayMove([...items.value], index, index + 1)
    }
}

let remove = (index) => {
    items.value.splice(index, 1)
}

let arrayMove = (array, oldIndex, newIndex) => {
    if (newIndex >= array.length) {
        let k = newIndex - array.length + 1;
        while (k--) {
            array.push(undefined);
        }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
}
</script>
<template>
    <div class="space-y-4">
        <div class="space-y-4" v-if="items.length">
            <div v-for="(item, index) in items" :key="simple ? index : item.uid"
                 class="border list-border rounded-lg divide-y list-divide">
                <div v-if="header && !simple" class="flex justify-start items-center">
                    <button @click="toggle(index)" class="flex-0 p-2 border-r list-border">
                        <svg v-if="item.open" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </button>
                    <div class="flex-1 h-full px-2">
                        #{{ index + 1 }}
                    </div>
                </div>
                <div v-if="(!simple && item.open) || simple" class="flex">
                    <div class="border-r list-border flex flex-col">
                        <button v-if="index > 0" class="p-2" @click="moveUp(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"/>
                            </svg>
                        </button>
                        <button v-if="index < items.length - 1" class="p-2" @click="moveDown(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/>
                            </svg>
                        </button>
                        <button class="p-2" @click="remove(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                            </svg>
                        </button>
                    </div>
                    <div class="w-full p-4">
                        <slot :item="item" :index="index" :extra-data="extraData"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <button class="btn btn-sm gap-2" @click="add" v-if="!disableNew">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                {{ addNew }}
            </button>
            <slot name="buttons"/>
        </div>
    </div>
</template>
<style type="text/css">
.list-border {
    @apply border-base-content border-opacity-20;
}

.list-divide {
    @apply divide-base-content divide-opacity-20;
}
</style>
