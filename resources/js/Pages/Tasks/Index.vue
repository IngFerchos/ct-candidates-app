<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import DialogModal from '@/Components/DialogModal.vue';
import TextInput from '@/Components/TextInput.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import Checkbox from '@/Components/Checkbox.vue';
import { showNotification } from '@/Services/NotificationService';
import { ref, reactive, onMounted } from 'vue';
import { useForm, usePage, router } from '@inertiajs/vue3';

const props = defineProps({
    tasks: {
        type: Array,
        required: true,
    },
});

const modal = reactive({
    title: '',
    event: () => {},
    type: '',
    span: '',
    is_open: false
});

// show notification to notice the user that the can drag and drop the tasks
onMounted(() => {
    showNotification('info', 'Puedes arrastrar y soltar las tareas para cambiar su orden', '');
});


const form = useForm({
    title: '',
    order: {
        type: Number,
        default: 0,
    },
    is_completed: false,
});

const dragTask = ref(null);

const add = () => {
    form.post(route('tasks.store'), {
        preserveScroll: true,
        onSuccess: () => {
            const flash = usePage().props.flash;
            showNotification(flash.type, flash.message, '');
            changeModalStatus();
        },
    });
};

const edit = (task_id) => {
    form.put(route('tasks.update', task_id), {
        preserveScroll: true,
        onSuccess: () => {
            const flash = usePage().props.flash;
            showNotification(flash.type, flash.message, '');
            changeModalStatus();
        },
    });
};

const destroy = (task_id) => {
    form.delete(route('tasks.destroy', task_id), {
        preserveScroll: true,
        onSuccess: () => {
            const flash = usePage().props.flash;
            showNotification(flash.type, flash.message, '');
            changeModalStatus();
        },
    });
};

const changeTaskStatus = (task_id) => {
    form.put(route('tasks.change_status', task_id), {
        preserveScroll: true,
        onSuccess: () => {
            const flash = usePage().props.flash;
            showNotification(flash.type, flash.message, '');
        },
    });
};

const sortTasks = () => {
    router.post(route('tasks.sort'), {tasks: props.tasks}, {
        preserveScroll: true,
        onSuccess: () => {
            const flash = usePage().props.flash;
            showNotification(flash.type, flash.message, '');
        },
    });
};

const changeModalStatus = (type, index = -1) => {
    modal.is_open = !modal.is_open;
    
    switch (type) {
        case 'create':
            modal.title = 'Agregar tarea';
            modal.event = () => add();
            modal.type = 'c';
            modal.span = 'Agregar tarea';

            form.title = '';
            form.order = getLastOrder() + 1;
            form.is_completed = false;
            break;
        case 'edit':
            modal.title = 'Editar tarea';
            modal.event = () => edit(props.tasks[index].id);
            modal.type = 'e';
            modal.span = 'Actualizar tarea';

            form.title = props.tasks[index].title;
            form.order = props.tasks[index].order;
            form.is_completed = props.tasks[index].is_completed;
            break;
        case 'delete':
            modal.title = 'Eliminar tarea';
            modal.event = () => destroy(props.tasks[index].id);
            modal.type = 'd';
            modal.span = 'Eliminar tarea';

            form.title = props.tasks[index].title;
            form.is_completed = props.tasks[index].is_completed;
            break;
    }
    
    if (!modal.is_open) {
        form.reset();
    }
};

const getLastOrder = () => {
    return props.tasks.length > 0 ? props.tasks[props.tasks.length - 1].order : 0;
};

const actionsMenuIndex = ref(-1);

const handleDragStart = (index) => {
    dragTask.value = index;
};

const handleDragOver = (e) => {
    e.preventDefault();
};

const handleDrop = (index) => {
    const droppedTask = props.tasks.splice(dragTask.value, 1)[0];
    if(index === props.tasks.length) {
        droppedTask.order = props.tasks[props.tasks.length - 1].order + 1;
        props.tasks.push(droppedTask);
    } else {
        droppedTask.order = droppedTask.order > props.tasks[index].order ? props.tasks[index].order + 1 : props.tasks[index].order - 1;
        props.tasks.splice(index, 0, droppedTask);
    }

    props.tasks.forEach((task, index) => {
        task.order = index + 1;
    });

    dragTask.value = null;
    sortTasks();
};

const handleDragEnd = () => {
    dragTask.value = null;
};
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Principal
            </h2>
        </template>

        <!-- Modal on the center -->
        <DialogModal :show="modal.is_open" @close="changeModalStatus">
            <template #title>
                {{ modal.title }}
            </template>
            <template #content>
                <div class="mt-2" v-if="modal.type !== 'd'">
                    <div class="mb-4">
                        <InputLabel for="title" value="Título" />
                        <TextInput
                            id="title"
                            v-model="form.title"
                            type="text"
                            name="title"
                            class="block mt-1 w-full"
                        />
                        <InputError :message="form.errors.title" class="mt-2" />
                    </div>
                </div>
                <div v-if="modal.type === 'd'">
                    <p class="text-lg font-semibold dark:text-white">¿Estás seguro de eliminar la tarea?</p>
                    <br>
                    <p class="text-lg dark:text-white text-center"> 
                        <b>Tarea:&nbsp;</b> {{ form.title }} 
                        &nbsp;&nbsp;&nbsp;&nbsp; <b>Completada: </b> 
                        <fa-icon :icon="['fas', form.is_completed?'check':'xmark']" :class="{'text-red-600':!form.is_completed, 'text-green-600': form.is_completed}"></fa-icon>
                    </p>
                </div>
            </template>
            <template #footer class="justify-between">
                <div class="flex w-full justify-around">
                    <button @click="modal.event" class="bg-blue-700 text-white px-4 py-2 rounded-md w-64 flex justify-center">
                        <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        <span v-if="!form.processing">{{ modal.span }}</span>
                    </button>
                    <button @click="changeModalStatus" class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md w-64">Cancelar</button>
                </div>
            </template>
        </DialogModal> 

        <div class="py-12">
            <div class="max-w-xl mx-auto sm:px-6 lg:px-8 border-gray-400 dark:border-gray-700">
                <div class="flex flex-col w-full h-screen bg-gray-100 dark:bg-gray-800 rounded-xl border-gray-400 dark:border-gray-700">
                    <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-400 dark:border-gray-700 rounded-xl">
                        <h1 class="text-xl font-bold dark:text-white">Lista de tareas</h1>
                        <button class="bg-blue-700 text-white px-4 py-2 rounded-md" @click="changeModalStatus('create')">
                            <fa-icon icon="plus" class="mr-2"/>
                            Agregar tarea
                        </button>
                    </div>
                    <div class="flex-1 overflow-auto rounded-xl border-gray-400 dark:border-gray-700">
                        <div v-for="(task, index) in props.tasks"
                            class="group/item flex items-center justify-between border-b border-gray-400 dark:border-gray-700 p-4 hover:cursor-grab"
                            :draggable="true"
                            :key="task.order"
                            @dragstart="handleDragStart(index)"
                            @dragover="handleDragOver"
                            @drop="handleDrop(index)"
                            @dragend="handleDragEnd"
                            @mouseenter="actionsMenuIndex = index"
                            @mouseleave="actionsMenuIndex = null"
                            :class="{ 'bg-slate-500 cursor-grabbing': index === dragTask }">
                        
                            <div class="flex items-center">
                                <div class="group/grab mr-1 invisible overflow-hidden group-hover/item:visible">
                                    <fa-icon icon="grip-vertical" class="text-gray-400 dark:text-gray-600"/>
                                </div>
                                <Checkbox id="is_task_completed" class="cursor-pointer mr-2" v-model="task.is_completed" @click="changeTaskStatus(task.id)"/>
                                <p  class="text-xl font-regular dark:text-white capitalize"
                                    :class=" { 'line-through dark:text-gray-600': task.is_completed }">
                                    &nbsp;{{ task.title }}&nbsp;
                                </p>
                            </div>
                            <div class="group/actions invisible flex items-center group-hover/item:visible">
                                <button class="mr-4 text-blue-500 opacity-70 hover:opacity-100" @click="changeModalStatus('edit', index)">
                                    <fa-icon icon="edit" class="text-lg"/>
                                </button>
                                <button class="text-red-500 opacity-70 hover:opacity-100" @click="changeModalStatus('delete', index)">
                                    <fa-icon icon="xmark" class="text-xl"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </AppLayout>
</template>
