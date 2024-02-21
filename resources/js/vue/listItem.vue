<template>
    <tr>
      <td :class="{ 'fw-bold': item.completed === 1, 'completed': item.completed === 1  }" class="col-2">{{ item.order }}</td>
      <td :class="{ 'fw-bold': item.completed === 1, 'completed': item.completed === 1  }"  class="col-6">{{ item.title }}</td>
      <td class="col-4">
        <div class="form-check form-check-inline">
          <input
            type="checkbox"
            class="form-check-input"
            @change="updateCheck"
            :checked="item.completed === 1"
          />
          <button @click="removeItem" class="btn btn-danger ms-2">
            <i class="fas fa-trash"></i>  <font-awesome-icon icon="trash"/>
          </button>
        </div>
      </td>
    </tr>
  </template>
  
  
<script>
export default {
    props: ['item'],
    methods: {
        updateCheck() {
            const newCompletedValue = this.item.completed === 1 ? 0 : 1;
            axios
                .put(`api/item/${this.item.id}`, {
                    item: { completed: newCompletedValue }

                })
                .then((response) => {
                    if (response.status == 200) {
                        console.log('Valor del campo completado antes: ', this.item.completed)
                        this.item.completed = newCompletedValue;
                        console.log('Valor del campo completado despues: ', this.item.completed)
                        this.$emit('itemchanged');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        removeItem() {
            axios
                .delete(`api/item/${this.item.id}`)
                .then((response) => {
                    if (response.status == 200) {
                        this.$emit('itemchanged');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>
  
<style scoped>
.completed {
    text-decoration: line-through;
    color: #999999;
}

.trashcan {
    background: #e6e6e6;
    border: none;
    color: #ff0000;
    outline: none;
    cursor: pointer;
}

div {
    display: flex;
    align-items: center;
}
</style>
