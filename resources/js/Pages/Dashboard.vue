<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            Lista de Tareas
        </template>

        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            
            <div class="todoListContainer">
                <div class="heading">
                    <div class="container">
                        <add-item-form v-on:reloadlist="getList()" />
                    </div>
                </div>
                <div class="list">
                    <list-view :items="items" v-on:reloadlist="getList()" />
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script>
import { Head } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import addItemForm from '@/Components/task/addItemForm.vue';
import listView from '@/Components/task/listView.vue';
import listItem from '@/Components/task/listItem.vue';

export default {
    components: {
        addItemForm,
        listView,
        listItem,
        Head,
        AuthenticatedLayout,


    },
    data() {
        return {
            items: [],
        }
    },
    methods: {
        getList() {
            axios
                .get('/api/items')
                .then(response => {
                    this.items = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    created() {
        this.getList();
    }

}


</script>

<style scoped>
.todoListContainer {
    width: 350px;
    margin: auto;
}

.heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list {
    margin-top: 20px;
}
</style>
