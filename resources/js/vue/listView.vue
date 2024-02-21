<template>
    <div>
      <div class="filter-controls mb-3">
        <label>Filtrar por orden:</label>
            <select v-model="selectedOrder" @change="applyFilter">
                <option value="all">ALL</option>
                <option value="asc">ASCENDING</option>
                <option value="desc">DESCENDING</option>
            </select>
            <span></span>
            <label>Filtrar por completadas:</label>
            <select v-model="filter" @change="applyFilter">
                <option value="all">Todas</option>
                <option value="completed">Completadas</option>
                <option value="incompleted">Incompletas</option>
            </select>
      </div>
    <table class="table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <list-item
          v-for="(item, index) in filteredItems"
          :key="index"
          :item="item"
          class="item"
          @itemchanged="$emit('reloadList')"
        />
      </tbody>
    </table>
  </div>
</template>
  
<script>
import listItem from "./listItem.vue";

export default {
    props: ['items'],
    components: {
        listItem
    },
    data() {
        return {
            filter: 'all',
            selectedOrder: 'all'
        };
    },
    computed: {
        filteredItems() {
            let filtered = this.items;

            if (this.filter === 'completed') {
                filtered = filtered.filter(item => item.completed === 1);
            } else if (this.filter === 'incompleted') {
                filtered = filtered.filter(item => item.completed === 0);
            }

            if (this.selectedOrder === 'asc') {
                filtered.sort((a, b) => a.order - b.order);
            } else if (this.selectedOrder === 'desc') {
                filtered.sort((a, b) => b.order - a.order);
            }

            return filtered;
        }
    },
    methods: {
        applyFilter() {
            this.$emit('reloadList');
        }
    }
};
</script>
  
<style scoped>
.item {
    background: #e6e6e6;
    padding: 5px;
    margin-top: 5px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.filter-controls {
    margin-bottom: 10px;
}
</style>