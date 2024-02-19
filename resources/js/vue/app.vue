<template>
    <div>
        <menu-home/>
    </div>
    <div class="todoListContainer">
        <div class="heading">
            <h2 id="title">To Do List</h2>
            <add-item-form
                v-on:reloadlist="getList()"
                />
        </div>
        <list-view 
            :items="items"
            v-on:reloadlist="getList()"
            />
    </div>
</template>

<script>
import addItemForm from "./addItemForm"
import listView from "./listView"
import menuHome from "./menuHome"
export default{
    components: {
        addItemForm,
        listView,
        menuHome
    },
    data: function(){
        return {
            items: []
        }
    },
    methods: {
        getList(){
            axios.get('api/items')
            .then(response => {
                this.items = response.data
            })
            .catch(error =>{
                console.log(error);
            })
        }
    },
    created(){
        this.getList();
    }

}

</script>

<style scoped>
.todoListContainer{
    width: 90vw; /* Usamos vw para que sea relativo al ancho de la ventana */
    max-width: 350px; /* Limitamos el ancho máximo */
    margin: auto;
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: serif;
    font-size: 1.5vw; /* Usamos vw para el tamaño de la fuente */
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.heading{
    text-align: center;
    
}
</style>