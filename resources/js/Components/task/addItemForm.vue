<template>
    <div class="addItem">
        <input type="text" v-model="item.title">
        <svg @click="addItem()" :class="[ item.title ? 'active' : 'incactive', 'plus']" class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            item: {
                user_id: 1,
                title: '',
                order: '',
                completd: '',
            }
        }

    },
    methods: {
        async addItem() {
            const ultimaTarea = await this.obtenerUltimaTarea();
            const nuevoOrden = ultimaTarea.order ? ultimaTarea.order + 1 : 1;

             if (this.item.title == '') {
                return;
            }

            axios.post('api/item/store', {
                item: {
                    title: this.item.title,
                    order: nuevoOrden,
                }
            })
                .then( (response)=> {
                    if (response.status == 201) {
                        this.item.title = '';
                        console.log(response);
                        this.$emit('reloadlist');
                    }
                })

                .catch(function (error) {
                    console.log(error);
                });

        },
        async obtenerUltimaTarea() {
            try {
                const response = await axios.get('api/items/ultima');
                return response.data;
            } catch (error) {
                console.error('Error al obtener la última tarea:', error);
                throw error;
            }
        }
    }
}
</script>

<style scoped>
.addItem {
    display: flex;
    justify-content: center;
    align-items: center;
}

.input {
    width: 100%;
    border: 0px;
    outline: none;
    padding: 5px 10px;
    marging-right: 10px;
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