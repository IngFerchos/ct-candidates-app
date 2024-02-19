<template>
    <div>
        <div v-for="(item, index) in items" :key= "index">
            <list-item
                :item="item"
                class="item"
                v-on:itemchanged="$emit('reloadlist')"
            />

        </div>
    </div>
</template>

<script>
import listItem from "./ListItem"
import ListItem from './ListItem.vue'


export default{
    props: ['items'],
    components: {
        listItem
    }
}
</script>

<style scoped>
.item{
    background-color: #f9f9f9;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>