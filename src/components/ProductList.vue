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

export default {
    computed: {
        products() {
            return this.$store.state.products
        },
        productIsInStock() {
            return this.$store.getters.productIsInStock
        }
    },
    created() {
        this.$store.dispatch('fetchProducts')
    },
    methods: {
        addProductToCart(product) {
            this.$store.dispatch('addProductToCart', product)
        }
    },
}
</script>