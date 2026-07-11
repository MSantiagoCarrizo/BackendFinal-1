import Product from "../../models/product.model.js";

class ProductsMongo {

    async getProducts() {
        return await Product.find().lean();
    }

    async createProduct(productData) {
        return await Product.create(productData);
    }

    async getProductById(id) {
        return await Product.findById(id).lean();
    }

    async updateProduct(id, productData) {
        return await Product.findByIdAndUpdate( id, productData, { new: true, runValidators: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id).lean();
    }

}

export default new ProductsMongo();