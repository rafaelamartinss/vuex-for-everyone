<template>
    <div>
        <h1>Product List</h1>
        <h2>My cart: </h2>
        <p>{{cart}}</p>
        <ul>
            <li v-for="product in products">
                {{ product.title }} - {{ product.price }} - {{ product.inventory}}
                <button @click="addProductToCart(product)"> add to cart</button>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    computed: {
        products() {
            return this.$store.getters.availableProducts
        },
        cart() {
            return this.$store.getters.cart
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