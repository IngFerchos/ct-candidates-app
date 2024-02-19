<template>
    <div class="item">
        <input 
            type="checkbox"
            @change="updateCheck()"
            v-model="item.completed"
            />
        <span :class="[item.completed ? 'completed': '', 'itemText']"> {{ item.name }} </span>
        <button @click="removeItem()" class="trashcan">
            <font-awesome-icon 
                icon="trash"/>
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    props: ['item'],
    methods: {
        updateCheck(){
            axios.put('api/item/' + this.item.id, {
                item: this.item
            })
            .then(response => {
                if(response.status == 200){
                    this.$emit('itemchanged');
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        removeItem(){
            axios.delete('api/item/' + this.item.id)
            .then(response=>{
                if(response.status == 200){
                    this.$emit('itemchanged');
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
        
    }
}

</script>

<style scoped>
.completed {
    text-decoration: line-through;
    color: #999999;
}

.itemText {
    width: 100%;
    margin-left:  20px;
}
.item{
    background-color: #f9f9f9;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.trashcan {
    background-color: transparent;
    border: none;
    color: #dc3545;
    font-size: 16px;
    cursor: pointer;
}

.trashcan:hover {
    color: #bd2130;
}
</style>