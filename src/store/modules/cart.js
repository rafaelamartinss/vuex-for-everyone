import shop from "../../api/shop"

export default {
    state: {
        items: [],
        checkoutStatus: ''
    },
    getters: {
        cartProducts(state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id)
                product.cartQuantity = cartItem.quantity

                return product
            })
        },
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.cartQuantity, 0)
        },
    },
    actions: {
        addProductToCart({state, getters, commit}, product) {
            if(getters.productIsInStock(product)) {
                const cartItem = state.items.find(item => item.id === product.id)
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
                state.items,
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
        pushProductToCart(state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },
        emptyCart(state) {
            state.items = []
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        }
    }
}