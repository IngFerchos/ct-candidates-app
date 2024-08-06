<template>
    <v-container class="login-container">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="login-card">
                    <v-card-title class="headline">Login</v-card-title>
                    <v-card-subtitle class="subheading"
                        >Enter your credentials to access your
                        account</v-card-subtitle
                    >

                    <v-card-text>
                        <v-form v-model="valid" ref="form">
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
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="
                                    showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                required
                                outlined
                                class="input-field"
                                @click:append="togglePasswordVisibility"
                            ></v-text-field>
                            <v-btn
                                @click="login"
                                :disabled="!valid"
                                color="primary"
                                class="login-btn"
                                >Login</v-btn
                            >
                            <v-alert
                                v-if="errorMessage"
                                type="error"
                                dismissible
                                class="error-alert"
                                >{{ errorMessage }}</v-alert
                            >
                        </v-form>
                        <v-divider class="my-4"></v-divider>
                        <v-row justify="center">
                            <v-col>
                                <v-btn
                                    @click="goToRegister"
                                    color="secondary"
                                    class="register-btn"
                                    >Create an Account</v-btn
                                >
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "../axios.js";

export default {
    data() {
        return {
            email: "",
            password: "",
            showPassword: false,
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
        async login() {
            try {
                const response = await axios.post("/login", {
                    email: this.email,
                    password: this.password,
                });
                const token = response.data.token;
                localStorage.setItem("token", token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                this.$router.push("/home"); // Redirige al usuario a la página de inicio
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.errorMessage = "Invalid credentials";
                } else {
                    this.errorMessage = "An error occurred";
                }
            }
        },
        goToRegister() {
            this.$router.push("/register"); // Redirect user to the registration page
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style scoped>
.login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-card {
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

.login-btn {
    width: 100%;
}

.error-alert {
    margin-top: 16px;
}

.register-btn {
    width: 100%;
}
</style>
