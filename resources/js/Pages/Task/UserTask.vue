<script setup>
import { ref, watch } from 'vue';
import { router,usePage,useForm } from '@inertiajs/vue3'
import InputError from '@/Components/InputError.vue';
import Pagination from '@/Components/Pagination.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useDateFormat, useNow } from '@vueuse/core'

defineProps({
    tasks: Object
})

const user = usePage().props.auth.user;
const search = ref('');
const filter = ref('');

watch(search, (value) => {
    router.get('dashboard', { search: value, filter: filter.value }, {
        replace: true,
        preserveState: true,

    });
})

const getTimeAgo = (date) => {
    const formattedDate = useDateFormat(date, 'DD-MMMM-YYYY HH:mm'); // Formatear la fecha sin la hora
    return formattedDate;
}

const stateFilter = () => {
    router.get('dashboard', { filter: filter.value, search: search.value }, {
        replace: true,
        preserveState: true,

    });
}

const open = ref();

const show = (task) => {
    open.value = task.id;
    formEdit.title = task.title;
    formEdit.description = task.description;
}

const update = () => {
    formEdit.patch('dashboard/' + open.value, {
        onSuccess: (page) => {
            Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                icon: "success",
                title: page.props.flash.success,
                timer: 1500,
            });
        }
    })
}

const deleted = async (task) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(route('dashboard.destroy', task.id), {
                onSuccess: (page) => {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        icon: "success",
                        title: page.props.flash.success,
                        timer: 1500,
                    });
                }
            })
        }
    });
}

const state = async (task) => {
    try {
        await router.post(route('dashboard.state', task), {
            onSuccess: (page) => {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    icon: "success",
                    title: page.props.flash.success,
                    timer: 1500,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const close = () => {
    open.value = '';
}

const form = useForm({
    title: '',
    description: '',
});

const formEdit = useForm({
    title: '',
    description: '',
});

const create = () => {
    form.post(route('dashboard.store'), {
        onFinish: () => form.reset('title', 'description'),
        onSuccess: (page) => {
            Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                icon: "success",
                title: page.props.flash.success,
                timer: 1500,
            });
        }
    })
}

</script>
<template>
    <div class="px-8 py-6">
        <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 lg:gap-16 md:gap-8">
            <div>
                <h1 class="text-2xl font-bold text-gray-700 mt-4"><i class="fa-solid fa-list-check mr-2"></i>CREATE NEW TASK</h1>
                <hr>
                <form @submit.prevent="create()" class="py-8">
                    <div>
                        <InputLabel for="title" value="Title for task" />
                        <TextInput v-model="form.title" type="text" id="title" class="w-full"></TextInput>
                        <InputError class="mt-2" :message="form.errors.title" />
                    </div>
                    <div class="mt-4">
                        <InputLabel for="description" value="Description" />
                        <textarea v-model="form.description" id="message" rows="3"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Leave a comment..."></textarea>
                        <InputError class="mt-2" :message="form.errors.description" />
                    </div>
                    <div class="flex items-center justify-end mt-4">
                        <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <div class="lg:col-span-2 md:col-span-2">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <div class="flex items-center">
                            <label for="simple-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor"
                                        viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" v-model="search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                                    placeholder="Search" required="">
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <select id="countries" v-model="filter" @change="stateFilter()"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="">Filter tasks</option>
                            <option value="0">Pending</option>
                            <option value="1">Complete</option>
                        </select>
                    </div>
                </div>
                <div v-for="task in tasks.data" :key="task.id" class="py-2">
                    <div class="shadow-lg rounded" :class="task.state ? 'bg-green-100' : 'bg-gray-50'">
                        <div v-if="task.id == open">
                            <form class="px-4 py-4" @submit.prevent="update()">
                                <div>
                                    <InputLabel for="title" value="Title for task" />
                                    <TextInput v-model="formEdit.title" type="text" id="title" class="w-full"></TextInput>
                                    <InputError class="mt-2" :message="form.errors.title" />
                                </div>
                                <div class="mt-4">
                                    <InputLabel for="description" value="Description" />
                                    <textarea v-model="formEdit.description" id="message" rows="3"
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Leave a comment..."></textarea>
                                    <InputError class="mt-2" :message="formEdit.errors.description" />
                                </div>
                                <div class="flex items-center justify-end mt-4">
                                    <PrimaryButton :class="{ 'opacity-25': formEdit.processing }"
                                        :disabled="formEdit.processing">
                                        Save
                                    </PrimaryButton>
                                    <DangerButton @click="close()" class="ml-2">
                                        cancelar
                                    </DangerButton>
                                </div>
                            </form>
                        </div>
                        <div v-else>
                            <div class="px-4 py-4">
                                <div class="flex items-center justify-between">
                                    <div class="flex"><i class="fa-regular fa-comment-dots mr-2 text-gray-400"></i>
                                        <h1 class="text-sm font-semibold text-gray-500"> {{ task.user.name }}</h1>
                                    </div>
                                    <div class="" v-if="user.id == task.user_id">
                                        <a @click="state(task)" class="mr-2 text-green-500 cursor-pointer"
                                            title="completed">
                                            <i class="fa-regular fa-circle-check"></i>
                                        </a>
                                        <a @click="show(task)" class="mr-2 text-indigo-500 cursor-pointer" title="Edited">
                                            <i class="fa-regular fa-pen-to-square"></i>
                                        </a>
                                        <a @click="deleted(task)" class="text-red-500 cursor-pointer" title="deleted">
                                            <i class="fa-regular fa-trash-can"></i>
                                        </a>
                                    </div>
                                </div>
                                <h1 class="text-lg font-semibold text-gray-700"> {{ task.title }}</h1>
                                <h1 class="text-sm font-semibold text-gray-500 justify-center"> {{ task.description }}</h1>
                                <p class="text-sm text-gray-500">{{ getTimeAgo(task.created_at) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination :data="tasks" />
            </div>
        </div>
    </div>
</template>