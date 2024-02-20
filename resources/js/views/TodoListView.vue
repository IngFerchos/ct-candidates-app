<script setup>

import { ref } from "vue";
import TaskListComponent from "../components/tasks/TaskListComponent.vue";


let feedbackAlert = ref({ msg: '', show:false });

const viewForm = ref('');

const showFeedBackAlert = (msg) => {
    feedbackAlert.value.msg = msg,
    feedbackAlert.value.show = true;
}

</script>

<template>
    <v-alert v-show="feedbackAlert.show" border="start" variant="tonal" closable close-label="Close Alert" 
        color="green" :title="feedbackAlert.msg"></v-alert>
    <div id="container">
        <div class="todo-container">
            <h1 class="mb-6">Your Pending Tasks</h1>
            <v-card class="mx-auto">
                <div class="header-tasks-list">
                    <h3>Tasks</h3>
                    <div>
                        <v-btn prepend-icon="mdi mdi-filter-menu"
                            class="me-2"
                            color="secondary"
                            v-on:click="viewForm = viewForm == 'filter' ? '' : 'filter'">Filter Tasks</v-btn>
                        <v-btn prepend-icon="mdi mdi-plus-box" 
                            color="success"
                            v-on:click="viewForm = viewForm == 'add' ? '' : 'add'">Add</v-btn>
                    </div>
                </div>
                <v-container>
                    <TaskListComponent v-model:showForm="viewForm" @message="showFeedBackAlert"></TaskListComponent>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<style scoped>

div#container {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: center;
    height: 100%;
}

div.todo-container {
    width: 75%;
}

div > h1 {
    text-align: center;
}

.header-tasks-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1.25rem;
    background-color: #f0fff1;
}

#drag-container {
    height: 20rem;
    overflow-y: auto; 
    overflow-x: hidden;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
