<template>
<div class="tw-flex tw-my-4">
    <div>
    <input type="text" v-model="query" placeholder="Buscar tarea...">
    <button @click="buscarTareas">Buscar</button>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      item: [] // Aquí almacenaremos las tareas encontradas
    };
  },
  methods: {
    async buscarTareas() {
      try {
        const response = await axios.get(`/tasks/buscar?query=${this.query}`);
        this.tareas = response.data;
      } catch (error) {
        console.error('Error al buscar tareas:', error);
      }
    }
  }
};
</script>

<style scoped>  

</style>