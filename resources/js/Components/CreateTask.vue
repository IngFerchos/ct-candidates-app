<template>
    <v-container>
        <v-form @submit.prevent="submitForm">
            <v-text-field
                v-model="task.title"
                label="Task Title"
                required
            ></v-text-field>
            <v-select
                v-model="task.order"
                :items="[1, 2, 3, 4, 5]"
                label="Task Order"
                required
            ></v-select>
            <v-checkbox
                v-model="task.is_completed"
                label="Completed"
            ></v-checkbox>
            <v-btn type="submit" color="primary">{{
                isEditMode ? "Update Task" : "Create Task"
            }}</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            task: {
                title: "",
                order: 1,
                is_completed: false,
            },
            isEditMode: false,
        };
    },
    async created() {
        const taskId = this.$route.params.id;
        if (taskId) {
            this.isEditMode = true;
            try {
                const response = await axios.get(`/tasks/${taskId}`);
                this.task = response.data;
                console.log("this.task", this.task);
                if (this.task.is_completed === 1) {
                    this.task.is_completed = true;
                } else {
                    this.task.is_completed = false;
                }
            } catch (error) {
                console.error("Error loading task:", error);
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                if (this.isEditMode) {
                    await axios.put(
                        `/tasks/${this.$route.params.id}`,
                        this.task
                    );
                } else {
                    await axios.post("/tasks", this.task);
                }
                this.$router.push("/home/view-tasks"); 
            } catch (error) {
                console.error("Error saving task:", error);
            }
        },
    },
};
</script>
