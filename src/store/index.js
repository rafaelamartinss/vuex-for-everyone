import {createStore} from "vuex"
import shop from "../api/shop"

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
    actions: {
        fetchProducts({commit}) {
            return new Promise((resolve) => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        }, 
        addProductToCart({state, getters, commit}, product) {
            if(getters.productIsInStock(product)) {
                const cartItem = state.cart.find(item => item.id === product.id)
                if(!cartItem) {
                    commit('pushProductToCart', product.id) 
                } else {
                    commit('incrementItemQuantity', cartItem)
                }

                commit('decrementProductInventory', product)
            }
        },
        checkout({state, commit}) {
            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    }, 
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