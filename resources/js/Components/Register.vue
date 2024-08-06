<template>
    <v-container class="register-container">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="register-card">
                    <v-card-title class="headline">Register</v-card-title>
                    <v-card-subtitle class="subheading">
                        Create a new account
                    </v-card-subtitle>

                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-text-field
                                v-model="fullName"
                                label="Full Name"
                                :rules="[rules.required, rules.fullName]"
                                required
                                outlined
                                class="input-field"
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                label="Email"
                                :rules="[rules.required, rules.email]"
                                required
                                outlined
                                class="input-field"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                :rules="[rules.required]"
                                :type="show1 ? 'text' : 'password'"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                required
                                outlined
                                class="input-field"
                                @click:append="togglePasswordVisibility"
                            ></v-text-field>
                            <v-text-field
                                v-model="confirmPassword"
                                label="Confirm Password"
                                :rules="[
                                    rules.required,
                                    (v) =>
                                        v === password ||
                                        'Passwords must match',
                                ]"
                                :type="show2 ? 'text' : 'password'"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                required
                                outlined
                                class="input-field"
                                @click:append="toggleConfirmPasswordVisibility"
                            ></v-text-field>
                            <v-btn
                                @click="register"
                                :disabled="!valid"
                                color="primary"
                                class="register-btn"
                            >
                                Register
                            </v-btn>
                            <v-alert
                                v-if="errorMessage"
                                type="error"
                                dismissible
                                class="error-alert"
                            >
                                {{ errorMessage }}
                            </v-alert>
                        </v-form>
                        <v-divider class="my-4"></v-divider>
                        <v-row justify="center">
                            <v-col>
                                <v-btn
                                    @click="goToLogin"
                                    color="secondary"
                                    class="login-btn"
                                >
                                    Back to Login
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            show1: false,
            show2: false,
            valid: false,
            errorMessage: "",
            rules: {
                required: (value) => !!value || "Required.",
                email: (value) =>
                    /.+@.+\..+/.test(value) || "E-mail must be valid.",
            },
        };
    },
    methods: {
        async register() {
            try {
                await axios.post("/register", {
                    name: this.fullName,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmPassword,
                });
                this.$router.push("/login"); // Redirect user to the login page
            } catch (error) {
                this.errorMessage = "An error occurred";
            }
        },
        goToLogin() {
            this.$router.push("/login"); // Redirect user to the login page
        },
        togglePasswordVisibility() {
            this.show1 = !this.show1;
        },
        toggleConfirmPasswordVisibility() {
            this.show2 = !this.show2;
        },
    },
};
</script>

<style scoped>
.register-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.register-card {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.headline {
    font-size: 1.5rem;
    font-weight: bold;
}

.subheading {
    margin-bottom: 16px;
    font-size: 1rem;
    color: #666;
}

.input-field {
    margin-bottom: 16px;
}

.register-btn {
    width: 100%;
}

.error-alert {
    margin-top: 16px;
}

.login-btn {
    width: 100%;
}
</style>
