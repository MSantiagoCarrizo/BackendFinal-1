import productsMongo from "../dao/mongo/products.mongo.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {

    try {
        const products = await productsMongo.getProducts();

        res.status(200).json({
            status: "success",
            payload: products,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
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
        const { id } = req.params;

        const product = await productsMongo.getProductById(id);

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
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "ID de producto inválido" });
        }

        const productData = { ...req.body };
        delete productData._id;

        const updatedProduct = await productsMongo.updateProduct(id, productData);

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
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "ID de producto inválido" });
        }

        const deletedProduct = await productsMongo.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        res.status(200).json({ status: "success", message: "Producto eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
    
};