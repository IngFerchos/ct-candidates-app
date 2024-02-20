<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import TaskComponent from "../TaskComponent.vue";

import { getTasks, addTasks, updatePositions } from "../../services/tasks.js";

const showForm = defineModel('showForm', { default: '' });
const tasks = ref([]);
const filter = reactive({ title: '', completed: false });

const messageEvent = defineEmits(['message'])

const newTask = ref('');
const add = () => {
    addTasks({title: newTask.value})
        .then(res => res.data)
        .then(data => {
            tasks.value.push(data.task);
            newTask.value = '';
            showForm.value = '';
            
        })
        .catch(console.error)
}

const onDrop = (e) => {
    let data = { old_idx: e.oldIndex+1, new_idx: e.newIndex+1, task_id: Number(e.item.getAttribute('data-task')) };
    updatePositions(data).then(res => res.data).then(console.log).catch(console.error);
};

onMounted( async () => {
    tasks.value = await getTasks().then(res => res.data);
});

watch(filter, async (filter) => {
    tasks.value = await getTasks(filter).then(res => res.data);
});

</script>
<template>
    <v-expand-transition>
        <div v-show="showForm == 'add'">
            <form @submit.prevent class="d-flex px-4 py-2">
                <v-text-field variant="solo"
                    density="compact"
                    class="pa-0"
                    v-model="newTask"/>
                <div class="pl-2 pb-4">
                    <v-btn type="submit" icon variant="plain" @click="add()">
                        <v-icon color="green">mdi mdi-check-circle</v-icon>
                        <v-tooltip activator="parent" location="end">Add Task</v-tooltip>
                    </v-btn>
                    <v-btn variant="plain" icon @click="showForm = ''">
                        <v-icon color="red">mdi mdi-close-circle</v-icon>
                        <v-tooltip activator="parent" location="end">Cancel</v-tooltip>
                    </v-btn>
                </div>
            </form>
        </div>
    </v-expand-transition>
    <v-expand-transition>
        <div v-show="showForm == 'filter'">
            <form v-on:submit.prevent class="d-flex px-4 py-2">
                <v-text-field variant="solo"
                    density="compact"
                    label="Search task by title"
                    single-line
                    append-inner-icon="mdi-magnify"
                    class="pa-0"
                    v-model="filter.title"/>
                <v-checkbox label="Completed" class="ml-2" v-model="filter.completed"></v-checkbox>
            </form>
        </div>
    </v-expand-transition>
    <VueDraggable v-model="tasks" @end="onDrop">
        <TransitionGroup name="fade" type="transition">
            <TaskComponent v-for="(task, index) in tasks" :data-task="task.id" 
                :key="task.id" :task="task" :modifiable="false"
                @update-task="$emit('message', `Task: ${task.id}. Has been saved`)"
                @delete-task="$emit('message', `Task: ${task.id}. Has been deleted`)"></TaskComponent>
        </TransitionGroup>
    </VueDraggable>
</template>
<style scoped>

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

</style>