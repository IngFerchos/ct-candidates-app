<script setup>
import { ref, watch, onMounted } from 'vue';

const isDark = ref(false);

onMounted(() => {
    isDark.value =  localStorage.theme === "dark" ||
                    (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches);
});

watch(isDark, (newVal, oldVal) => {
    if (newVal) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
    }
});

const toggleTheme = () => isDark.value = !isDark.value;
</script>

<template>
    <button class="w-16 h-8 rounded-full shadow-md relative" :class="{
        'bg-sky-700 dark:bg-sky-800': isDark,
        'bg-gray-400 dark:bg-gray-600': !isDark
    }" @click="toggleTheme()" type="button">
        <div class="ml-1 w-6 h-6 bg-white rounded-full transition-transform transform items-center text-center z-10" :class="{
            'translate-x-8': isDark,
            'translate-x-0': !isDark
        }">
            <fa-icon :icon="['fas', isDark?'moon':'sun']" 
            :class="{
                'text-yellow-500 ease-out': !isDark,
                'text-gray-800 ease-in': isDark
            }"
            class="mt-1"/>
        </div>
    </button>
</template>