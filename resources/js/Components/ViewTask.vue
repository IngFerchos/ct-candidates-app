<template>
    <v-container>
        <v-card class="pa-4" elevation="2">
            <v-toolbar flat color="primary">
                <v-toolbar-title class="white--text">Tasks</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Tasks"
                    single-line
                    hide-details
                    class="mx-4 search-field"
                    dense
                ></v-text-field>
            </v-toolbar>

            <v-divider></v-divider>

            <v-data-table
                :headers="headers"
                :items="paginatedTasks"
                :items-per-page="itemsPerPage"
                item-value="id"
                class="elevation-1"
                item-class="pa-2"
                hide-default-footer
            >
                <template v-slot:top>
                    <v-btn
                        color="primary"
                        @click="navigateToCreateTask"
                        class="mb-4"
                    >
                        <v-icon left>mdi-plus</v-icon>
                        Add Task
                    </v-btn>
                </template>
                <template v-slot:item.is_completed="{ item }">
                    <span
                        :class="
                            item.is_completed
                                ? 'status-completed'
                                : 'status-in-progress'
                        "
                    >
                        {{ item.is_completed ? "Terminada" : "En curso" }}
                    </span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon @click="editTask(item)" class="mx-2" color="primary"
                        >mdi-pencil</v-icon
                    >
                    <v-icon @click="deleteTask(item.id)" color="red"
                        >mdi-delete</v-icon
                    >
                </template>
            </v-data-table>

            <v-pagination
                v-model="page"
                :length="totalPages"
                class="mt-4"
                @input="updatePage"
            ></v-pagination>
        </v-card>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            search: "",
            headers: [
                { title: "Title", key: "title" },
                { title: "Order", key: "order" },
                { title: "Status", key: "is_completed" }, // Changed header title
                { title: "Actions", key: "actions", sortable: false },
            ],

            tasks: [],
            page: 1,
            itemsPerPage: 10,
        };
    },
    computed: {
        paginatedTasks() {
            const start = (this.page - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.tasks
                .slice(start, end)
                .filter((task) =>
                    task.title.toLowerCase().includes(this.search.toLowerCase())
                );
        },
        totalPages() {
            return Math.ceil(this.tasks.length / this.itemsPerPage);
        },
    },
    mounted() {
        this.loadTasks();
    },
    methods: {
        async loadTasks() {
            try {
                const response = await axios.get("/tasks");
                this.tasks = response.data;
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        },
        async deleteTask(taskId) {
            try {
                await axios.delete(`/tasks/${taskId}`);
                this.loadTasks();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        },
        editTask(task) {
            this.$router.push({ name: "EditTask", params: { id: task.id } });
        },
        navigateToCreateTask() {
            this.$router.push("/home/create-task");
        },
        updatePage(page) {
            this.page = page;
        },
    },
};
</script>

<style scoped>
.v-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.v-toolbar {
    background-color: #2196f3; /* Primary color */
}

.v-toolbar-title {
    font-weight: bold;
    font-size: 1.2rem;
}

.search-field .v-input__control {
    background-color: #ffffff;
    border-radius: 4px;
}

.search-field .v-input__slot {
    color: #000000; /* Color for text inside the input */
}

.v-data-table {
    border-radius: 8px;
    overflow: hidden;
}

.v-data-table .v-data-table-header th {
    background-color: #e3f2fd; /* Light blue for header background */
    color: #000000; /* Text color for header */
    font-weight: bold;
}

.v-data-table .v-data-table-body {
    background-color: #ffffff;
}

.v-icon {
    cursor: pointer;
}

.v-icon.red {
    color: #e53935;
}

.v-btn {
    font-weight: 500;
}

.status-completed {
    color: #4caf50; /* Green for completed */
}

.status-in-progress {
    color: #ff9800; /* Orange for in progress */
}
</style>
