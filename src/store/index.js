import {createStore} from "vuex"
import shop from "../api/shop"

const store = createStore({
    state: {

    },
    getters: {
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0)
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
        }
    }, 
    mutations: {
        setProducts(state, products) {
            state.products = products
        }
    }
})

export default store