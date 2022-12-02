import {createStore} from "vuex"
import actions from "./actions"

const store = createStore({
    state: {
        products: [],
        cart: [],
        checkoutStatus: ''
    },
    getters: {
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0)
        }, 
        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                product.cartQuantity = cartItem.quantity

                return product
            })
        },
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.cartQuantity, 0)
        },
        productIsInStock() {
            return (product) => {
                return product.inventory > 0
            }
        }
    },
    actions,
    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },
        decrementProductInventory(state, product) {
            product.inventory--
        },
        emptyCart(state) {
            state.cart = []
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        }
    }
})

export default store