<template>
    <div>
        <h1>Product List</h1>
        <ul>
            <li v-for="product in products">
                {{ product.title }} - {{ product.price }} - {{ product.inventory}}
                <button 
                    :disabled="!productIsInStock(product)"
                    @click="addProductToCart(product)"
                >add to cart</button>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex';
export default {
    computed: {
        ...mapState([
            'products'
        ]),
        ...mapGetters([
            'productIsInStock'
        ])
    },
    created() {
        this.fetchProducts()
    },
    methods: {
        ...mapActions([
            'addProductToCart',
            'fetchProducts'
        ])
    },
}
</script>