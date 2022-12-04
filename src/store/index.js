import {createStore} from "vuex"
import cart from "./modules/cart"
import products from "./modules/products"

const store = createStore({
    modules: {
        cart,
        products
    }
})

export default store