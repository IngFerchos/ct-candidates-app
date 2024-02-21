<template>
    <div class="addItem my-3">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="item.title"
          placeholder="Enter title"
        />
        <label class="input-group-text order" for="order">Order:</label>
        <input
          type="number"
          id="order"
          min="1"
          class="form-control"
          v-model="item.order"
          placeholder="Enter order"
        />
        <button
          class="btn btn-success"
          @click="addItem"
          :class="{ 'disabled': !isButtonActive }"
        >
          <i class="fas fa-plus"></i> Add Item
        </button>
      </div>
    </div>
  </template>

<script>
export default {
    data: function () {
        return {
            item: {
                title: "",
                order: null
            }
        }
    },
    computed: {
        isButtonActive() {
            return this.item.title !== "" && this.item.order !== null;
        }

    },
    methods: {
        addItem() {

            if (!this.isButtonActive) {
                return;
            }


            if (this.item.title == '' || this.item.order == null) {
                return;
            }

            axios.post('api/item/store', {
                item: this.item
            }).then(response => {
                if (response.status == 201) {
                    this.item.title = "";
                    this.item.order = null;
                    this.$emit('reloadList');
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

}
</script>

<style scoped>
.order{
    margin-right: 5px;
}
.addItem {
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    background: #f7f7f7;
    border: 0px;
    outline: none;
    padding: 5px;
    margin-right: 10px;
    width: 100%;

}

.plus {
    font-size: 20px;
}

.active {
    color: #00ce25;
}

.inactive {
    color: #999999;
}
</style>
