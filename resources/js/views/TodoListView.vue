<template>
    <div id="container">
        <div class="todo-container">
            <h1 class="mb-6">ToDo App</h1>
            <v-card class="mx-auto">
                <div class="header-tasks-list">
                    <h3>Tasks</h3>
                    <div>
                        <v-btn prepend-icon="mdi mdi-filter-menu"
                            class="me-2"
                            color="secondary"
                            v-on:click="showFilterForm = !showFilterForm">Filter Tasks</v-btn>
                        <v-btn prepend-icon="mdi mdi-plus-box" 
                            color="success"
                            v-on:click="showCreateTaskForm = !showCreateTaskForm">Add</v-btn>
                    </div>
                </div>
                <v-expand-transition>
                    <div v-show="showCreateTaskForm">
                        <form @submit.prevent="addTask()" class="d-flex px-4 py-2">
                            <v-text-field variant="solo"
                                density="compact"
                                class="pa-0"
                                v-model="taskTitle"/>
                            <div class="pl-2 pb-4">
                                <v-btn type="submit" icon variant="plain">
                                    <v-icon color="green">mdi mdi-check-circle</v-icon>
                                    <v-tooltip activator="parent" location="end">Add Task</v-tooltip>
                                </v-btn>
                                <v-btn variant="plain" icon v-on:click="showCreateTaskForm = false">
                                    <v-icon color="red">mdi mdi-close-circle</v-icon>
                                    <v-tooltip activator="parent" location="end">Cancel</v-tooltip>
                                </v-btn>
                            </div>
                        </form>
                    </div>
                </v-expand-transition>
                <v-expand-transition>
                    <div v-show="showFilterForm">
                        <form v-on:submit.prevent class="d-flex px-4 py-2">
                            <v-text-field variant="solo"
                                density="compact"
                                label="Search task by title"
                                single-line
                                append-inner-icon="mdi-magnify"
                                class="pa-0"
                                v-model="taskfilter.title"
                                @keyup="filterTasks"
                                v-on:change="filterTasks"/>
                            <v-checkbox label="Completed" class="ml-2" v-model="taskfilter.completed"
                                v-on:change="filterTasks"></v-checkbox>
                        </form>
                    </div>
                </v-expand-transition>
                <v-container>
                    <draggable v-model="tasks"
                        item-key="id"
                        :disabled="disableDrag"
                        :scrollSensitivity="200"
                        id="drag-container"
                        @change="onChange" @end="onDrop">
                        <template #item="{ element: task }">
                            <TaskComponent :task="task" @delete-task="deleteHandler()"/>
                        </template>
                    </draggable>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import axios from "axios";

import TaskComponent from "../components/TaskComponent.vue";
import draggable from 'vuedraggable';

let tasks = ref([]);

let showCreateTaskForm = ref(false);
let taskTitle = ref('');

let showFilterForm = ref(false);
let taskfilter = ref({ title: '', completed: false });

const disableDrag = ref(false);
let draggedElementIndex = ref({});

const onChange = (e) => { 
    draggedElementIndex.value = e.moved;
};

const onDrop = (e) => {
    if(Object.keys(draggedElementIndex.value).length == 0)
        return;

    const old_idx = draggedElementIndex.value.oldIndex+1;
    const new_idx =  draggedElementIndex.value.newIndex+1;
    const task_id = draggedElementIndex.value.element.id;

    const data = { old_idx, new_idx, task_id };
    axios.put('http://127.0.0.1:8000/api/tasks/update_order', data)
        .then(res => res.data)
        .then(data => {})
        .catch(console.error)

};

const loadTasks = (params = null) => {
    const URL = `http://127.0.0.1:8000/api/tasks?${params}`;
    return axios.get(URL).then((res) => res.data)
        .then((data) => {
            tasks.value = data;
        });
};

const addTask = () => {
    axios.post('http://127.0.0.1:8000/api/tasks', { title: taskTitle.value })
        .then(res => res.data)
        .then(data => {
            tasks.value.push(data.task);
            taskTitle.value = '';
            showCreateTaskForm.value = false;
        })
        .catch(console.error)
}

const filterTasks = (e) => {
    if(Object.keys(taskfilter.value).length == 0){
        disableDrag.value = false;
        loadTasks();
        return;
    }
    if(taskfilter.value.title === '' && !taskfilter.value.completed){
        disableDrag.value = false;
        loadTasks();
        return;
    }

    let params = (new URLSearchParams(taskfilter.value)).toString();
    loadTasks(params).then(e => { disableDrag.value = true; });
};

const deleteHandler = (e) => {
    taskfilter.value = { title: '', completed: false };
    loadTasks();
}

onMounted(() => {
    loadTasks();
});

</script>

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
    height: 16rem;
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
</style>
