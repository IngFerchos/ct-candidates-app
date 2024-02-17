<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';

import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
    tasks: {
        type: Array,
        required: true,
    },
});

const newTask = reactive({
    title: '',
    description: '',
    order: '',
    is_completed: false,
});



</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Task Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <template>
                        <div class="page-content page-container" id="page-content">
                          <div class="padding">
                            <div class="row container d-flex justify-content-center">
                              <div class="col-md-12">
                                <div class="card px-3">
                                  <div class="card-body">
                                    <h4 class="card-title">Awesome Todo list</h4>
                                    <div class="add-items d-flex">
                                      <input v-model="newTask" type="text" class="form-control todo-list-input"
                                        placeholder="What do you need to do today?">
                                      <h4 class="card-title"> Order: </h4>
                                      <select v-model="newOrder" type="number" class="form-control todo-list-input" id="order-task" required>
                                        <option value="" disabled selected>Select an order of importance from 1 to 5</option>
                                        <option value=1>1</option>
                                        <option value=2>2</option>
                                        <option value=3>3</option>
                                        <option value=4>4</option>
                                        <option value=5>5</option>
                                      </select>
                                      <button @click="addTask" class="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button>
                                      <button @click="orderTask" class="add btn btn-primary font-weight-bold todo-list-add-btn">Order</button>
                                      <button @click="toggleFilter" class="btn btn-primary font-weight-bold todo-list-add-btn">
                                        {{ filterCompleted ? 'Show All' : 'Show Completed' }}
                                      </button>
                      
                                    </div>
                                    <div class="list-wrapper">
                                      <ul class="d-flex flex-column-reverse todo-list">
                                        <li v-for="task in tasks" :key="task.id" :class="{ 'completed': task.completed }">
                                          <div class="form-check">
                                            <label class="form-check-label">
                                              <input class="checkbox" type="checkbox" :checked="task.completed"
                                                @change="updateTaskCompletion(task)">
                                              {{ task.title }}
                                              <i class="input-helper"></i>
                                            </label>
                                          </div>
                                          <i class="remove mdi mdi-close-circle-outline" @click="deleteTask(task)"></i>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
                                <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
