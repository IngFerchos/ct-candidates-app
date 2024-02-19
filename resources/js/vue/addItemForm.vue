<template>
    <div class="addItem">
        <input type="text" v-model="item.name"/>
        <font-awesome-icon 
            icon="plus-square"
            @click="addItem()"
            :class="[item.name ? 'active':'inactive', 'plus']"
        />
            
    </div>
</template>

<script>
export default{
    data: function(){
        return {
            item: {
                name: ""
            }
        }
    },
    methods: {
        addItem(){
            if(this.item.name == ''){
                return;
            }
            axios.post('api/item/store', {
                item: this.item
            })
            .then(response =>{
                if(response.status == 201){
                    this.item.name == "";
                    this.$emit('reloadlist');
                }
            })
            .catch(error =>{
                console.log(error);
            })
        }
    }
}

</script>

<style scoped>
.addItem {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px; /* Espaciado inferior */
}

input {
    background: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px 10px;
    margin-right: 10px;
    flex: 1; /* Para que el campo de entrada ocupe el espacio restante */
}


.plus {
    font-size: 20px;
    color: #007bff;
    cursor: pointer;
}

/* Estilos para el botón de añadir */
.plus {
    background-color: #bcd0e7;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s;
}
.plus:hover {
    background-color: #0056b3;
}

.inactive {
    color: #999999;
}
</style>