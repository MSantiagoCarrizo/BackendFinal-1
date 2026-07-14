import productsMongo from "../dao/mongo/products.mongo.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {

    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const sort = req.query.sort;
        const query = req.query.query;

        const result = await productsMongo.getProducts({ limit, page, sort, query });

        res.status(200).json({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage
                ? `/api/products?page=${result.prevPage}`
                : null,
            nextLink: result.hasNextPage
                ? `/api/products?page=${result.nextPage}`
                : null
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const createProduct = async (req, res) => {

    try {
        const newProduct = await productsMongo.createProduct(req.body);

        res.status(201).json({
            status: "success",
            payload: newProduct
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });
    }

};

export const getProductById = async (req, res) => {

    try {
        const { pid } = req.params;

        const product = await productsMongo.getProductById(pid);

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            payload: product
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};

export const updateProduct = async (req, res) => {

    try {
        const { pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", message: "ID de producto inválido" });
        }

        const productData = { ...req.body };
        delete productData._id;

        const updatedProduct = await productsMongo.updateProduct(pid, productData);

        if (!updatedProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        res.status(200).json({ status: "success", payload: updatedProduct });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }

};

export const deleteProduct = async (req, res) => {

    try {
        const { pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", message: "ID de producto inválido" });
        }

        const deletedProduct = await productsMongo.deleteProduct(pid);

        if (!deletedProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        res.status(200).json({ status: "success", message: "Producto eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
    
};