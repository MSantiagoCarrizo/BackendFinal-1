import Product from "../../models/product.model.js";

class ProductsMongo {
    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        const filter = {};

        if (query) {
            if (query === "true" || query === "false") {
                filter.status = query === "true";
            } else {
                filter.category = query;
            }
        }

        const options = { page, limit, lean: true };

        if (sort) {
            options.sort = {
                price: sort === "asc" ? 1 : -1
            };
        }

        return await Product.paginate(filter, options);
    }

    async createProduct(productData) {
        return await Product.create(productData);
    }

    async getProductById(id) {
        return await Product.findById(id).lean();
    }

    async updateProduct(id, productData) {
        return await Product.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id).lean();
    }
}

export default new ProductsMongo();