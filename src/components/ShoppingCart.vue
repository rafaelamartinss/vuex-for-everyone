<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products">
                {{ product.title }} - {{ product.price }} - {{ product.cartQuantity}}
            </li>
        </ul>
        <h3>Total: {{cartTotal}}</h3>
        <button @click="$store.dispatch('checkout')">Checkout</button>
        {{$store.state.checkoutStatus}}
    </div>
</template>
<script>
export default {
    computed: {
        products() {
            return this.$store.getters.cartProducts
        },
        cartTotal() {
            return this.$store.getters.cartTotal
        }
    }
}
</script>