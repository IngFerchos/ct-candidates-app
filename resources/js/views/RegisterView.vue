<script setup>

</script>

<template>
    <div>
        <div class="mx-auto my-6">
            <h1 style="text-align: center;">Register</h1>
        </div>
  
        <v-card class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
            <div class="text-subtitle-1 text-medium-emphasis">Username</div>
            <v-text-field
                density="compact"
                placeholder="Username"
                type="text"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                ></v-text-field>
            
            <div class="text-subtitle-1 text-medium-emphasis">First name</div>
            <v-text-field
                density="compact"
                placeholder="First name"
                type="text"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Last name</div>
            <v-text-field
                density="compact"
                placeholder="Last name"
                type="text"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Email</div>
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
    
            <v-btn block class="mb-8" color="blue" size="large" variant="tonal">
                Register
            </v-btn>
            <router-link to="/login">
                <v-btn block class="mb-8" color="gray" size="large" variant="tonal">
                    Cancel
                </v-btn>
            </router-link>
        </v-card>
    </div>
</template>
  