<template>
    <NavbarDayBook/>
    <div class="d-flex">
        <div class="col-4">
            <EntryList />
        </div>
        <div class="col">
            <router-view />
        </div>

    </div>
</template>


<script>

import {defineAsyncComponent} from "vue";

export default {
    components: {
        NavbarDayBook: defineAsyncComponent( () => import('../components/NavbarDayBook.vue')),
        EntryList: defineAsyncComponent( () => import('../components/EntryList.vue'))
    }
}
</script>