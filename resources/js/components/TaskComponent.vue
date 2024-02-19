<template>
    <v-row class="pa-2 mt-0">
        <v-col cols="1">
            <v-checkbox v-model="taskData.complete" v-on:change="updateTaskStatus(taskData.id)"/>
        </v-col>
        <v-col cols="11">
            <div class="task-content">
                <form @submit.prevent="updateTask(taskData.id)" style="width: 100%;" class="d-flex">
                    <v-text-field
                        :readonly="!modifiable"
                        :flat="!modifiable"
                        variant="solo"
                        density="compact"
                        v-model="taskData.title"
                        class="py-2"
                        wrap="true"
                        :class="{ 'complete-task-text': taskData.complete }"
                    />
                    <div class="action-buttons" v-if="modifiable">
                        <v-btn type="submit" variant="plain" icon>
                            <v-icon color="green">mdi mdi-check-circle</v-icon>
                            <v-tooltip activator="parent" location="end">Save</v-tooltip>
                        </v-btn>
                        <v-btn variant="plain" icon @click="modifiable = false">
                            <v-icon color="red">mdi mdi-close-circle</v-icon>
                            <v-tooltip activator="parent" location="end">Cancel</v-tooltip>
                        </v-btn>
                    </div>
                    <div class="action-buttons" v-else>
                        <v-btn variant="plain" icon @click="modifiable = true">
                            <v-icon>mdi mdi-book-edit</v-icon>
                            <v-tooltip activator="parent" location="end">Edit Task</v-tooltip>
                        </v-btn>
                        <v-btn variant="plain" icon @click="deleteTask(taskData.id)">
                            <v-icon color="red">mdi mdi-delete-circle</v-icon>
                            <v-tooltip activator="parent" location="end">Delete Task</v-tooltip>
                        </v-btn>
                    </div>
                </form>
            </div>
        </v-col>
    </v-row>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
    modifiable: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update-task', 'delete-task']);

let taskData = ref(props.task);
let modifiable = ref(props.modifiable);

const updateTask = (id) => {
    axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, { title: taskData.value.title })
        .then(res => res.data)
        .then(data => {
            modifiable.value = false;
            taskData.value = data.task;
            emit('update-task');
        })
        .catch(console.error);
}

const updateTaskStatus = (id) => {
    axios.put(`http://127.0.0.1:8000/api/tasks/complete_status/${id}`, { complete: taskData.value.complete })
        .then(res => res.data)
        .then(data => {})
        .catch(console.error);
}

const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`)
        .then(res => res.data)
        .then(data => {
            emit('delete-task');
        })
        .catch(console.error);
}

</script>

<style scoped>

.task-content {
    display: flex;
}

.order {
    text-align: center;
    font-size: 1.25rem;
    width: 3rem;
    padding: 0.5rem;
}

.action-buttons {
    padding-bottom: 1rem;
    padding-top: 0.5rem;
}
.complete-task-text {
    text-decoration: line-through;
    text-decoration-color: green;
}

</style>
