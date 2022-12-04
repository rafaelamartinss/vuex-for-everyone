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
        {{checkoutStatus}}
    </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            checkoutStatus: state => state.cart.checkoutStatus
        }),
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