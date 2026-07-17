import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";

class CartsMongo {
    async createCart() {
        return await Cart.create({ products: [] });
    }


    async getCartById(id) {
        return await Cart.findById(id).populate("products.product").lean();
    }


    async addProductToCart(cartId, productId) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return null;
        }

        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Producto no encontrado");
        }

        const productInCart = cart.products.find(
            item => item.product.toString() === productId
        );

        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();

        return cart.populate("products.product");
    }


    async removeProductFromCart(cartId, productId) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return null;
        }

        cart.products = cart.products.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        return await cart.populate("products.product");
    }


    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return null;
        }

        const product = cart.products.find(
            item => item.product.toString() === productId
        );

        if (!product) {
            throw new Error("Producto no encontrado en el carrito");
        }

        product.quantity = quantity;

        await cart.save();

        return await cart.populate("products.product");
    }


    async updateCart(cartId, products) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return null;
        }

        

        cart.products = products;

        await cart.save();

        return await cart.populate("products.product");
    }


    async clearCart(cartId) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return null;
        }

        cart.products = [];

        await cart.save();

        return cart;
    }
}

export default new CartsMongo();