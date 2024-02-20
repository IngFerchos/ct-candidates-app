<script setup>

</script>

<template>
    <div>
        <div class="mx-auto my-6">
            <h1 style="text-align: center;">Login</h1>
        </div>
  
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>
    
            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                ></v-text-field>
    
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password
            </div>
    
            <v-text-field
                append-inner-icon="mdi-eye-off"
                type="password"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                ></v-text-field>
    
            <v-btn block class="mb-8"
                color="blue"
                size="large"
                variant="tonal"
                > Log In </v-btn>
    
            <v-card-text class="text-center">
                <router-link to="/register">
                    <a class="text-blue text-decoration-none"
                        href="#"
                        rel="noopener noreferrer">
                        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </router-link>
            </v-card-text>
        </v-card>
    </div>
</template>
  