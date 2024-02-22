<template>
    <div >
        <div v-for="(item, index) in items" :key="index">
            <list-item 
                :item="item" 
                class="item"
                v-on:itemchanged="$emit('reloadlist')"
                />


        </div>
    </div>
</template>

<script>
import listItem from './listItem.vue';

export default {
    props: ['items'],
    components: {
        listItem
    }
}
</script>

<style scoped>
.item {
    background-color: #f4f4f4;
    padding: 5px;
    margin-top: 5px;
}
</style>