<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products">
                {{ product.title }} - {{ product.price }} - {{ product.cartQuantity}}
            </li>
        </ul>
        <h3>Total: {{cartTotal}}</h3>
        <button @click="checkout">Checkout</button>
        {{$store.state.checkoutStatus}}
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            products: 'cartProducts',
            cartTotal: 'cartTotal'
        })
    },
    methods: {
        ...mapActions([
            'checkout'
        ])
    }
}
</script>