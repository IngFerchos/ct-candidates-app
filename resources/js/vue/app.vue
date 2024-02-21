<template>
    <div class="container mt-4">
      <div class="card">
        <div class="card-header bg-light">
          <h2 class="text-center" id="title">Todo List</h2>
        </div>
        <div class="card-body">
          <add-item-form @reloadList="getList" />
          <list-view :items="items" @reloadList="getList" />
        </div>
      </div>
    </div>
  </template>

<script>

import addItemForm from './addItemForm.vue';
import listView from './listView.vue';



export default{
    components:{
        addItemForm,
        listView
    },
    data: function () {
        return {
            items : []
        }
    },
    methods: {
        getList(){
            axios.get('api/items').then(
                response => {
                    this.items = response.data;
                }
            ).catch( error => {
                console.log(error);
            })
        }
    },

    created() {
        this.getList();
    }
}

</script>

<style scoped>
    .todoListContainer{
        width: 350px;  
        margin: auto;
    }
    .heading{
        background: #e6e6e6;
        padding: 10px;

    }
    #title{
        text-align: center;
    }


</style>