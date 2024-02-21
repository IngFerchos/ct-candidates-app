<script setup>
import { ref } from "vue";
import { updateTask, updateTaskStatus, deleteTask } from "../../services/tasks.js";

const props = defineProps({
    task: { type: Object, required: true },
    modifiable: { type: Boolean, default: false }
});

const emit = defineEmits(['update-task', 'delete-task']);

let taskData = ref(props.task);
let modifiable = ref(props.modifiable);

const updateTaskById = (id) => {
    updateTask(id, { title: taskData.value.title })
        .then(res => res.data)
        .then(data => {
            modifiable.value = false;
            taskData.value = data.task;
            emit('update-task');
        })
        .catch(console.error);
}

const updateTaskStatusById = (id) => {
    updateTaskStatus(id, { complete: taskData.value.complete })
        .then(res => res.data)
        .catch(console.error);
}

const deleteTaskById = (id) => {
    deleteTask(id).then(res => res.data)
        .then(data => { emit('delete-task') })
        .catch(console.error);
}

</script>

<template>
    <v-row class="pa-2 mt-0">
        <v-col cols="1">
            <v-checkbox v-model="taskData.complete" v-on:change="updateTaskStatusById(taskData.id)"/>
        </v-col>
        <v-col cols="11">
            <div class="task-content">
                <form @submit.prevent="updateTaskById(taskData.id)" style="width: 100%;" class="d-flex">
                    <v-text-field
                        :readonly="!modifiable"
                        :flat="!modifiable"
                        variant="solo"
                        density="compact"
                        v-model="taskData.title"
                        class="py-2"
                        wrap="true"
                        :class="{ 'complete-task-text': taskData.complete && !modifiable }"
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
                        <v-btn variant="plain" icon @click="deleteTaskById(taskData.id)">
                            <v-icon color="red">mdi mdi-delete-circle</v-icon>
                            <v-tooltip activator="parent" location="end">Delete Task</v-tooltip>
                        </v-btn>
                    </div>
                </form>
            </div>
        </v-col>
    </v-row>
</template>

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
