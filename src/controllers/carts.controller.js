import cartsMongo from "../dao/mongo/carts.mongo.js";
import mongoose from "mongoose";

export const createCart = async (req, res) => {
    try {
        const cart = await cartsMongo.createCart();
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}


export const getCartById = async (req, res) => {

    try {

        const { cid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return res.status(400).json({
                status: "error",
                message: "ID de carrito inválido"
            });
        }

        const cart = await cartsMongo.getCartById(cid);

        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Carrito no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            payload: cart
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};


export const addProductToCart = async (req, res) => {

    try {

        const { cid, pid } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(cid) ||
            !mongoose.Types.ObjectId.isValid(pid)
        ) {
            return res.status(400).json({
                status: "error",
                message: "ID inválido"
            });
        }

        const cart = await cartsMongo.addProductToCart(cid, pid);

        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Carrito no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            payload: cart
        });

    } catch (error) {

        if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                status: "error",
                message: error.message
            });
        }

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }

};


export const removeProductFromCart = async (req, res) => {

    try {
        const { cid, pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        const cart = await cartsMongo.removeProductFromCart(cid, pid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.status(200).json({ status: "success", payload: cart });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }

};


export const updateProductQuantity = async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        const cart = await cartsMongo.updateProductQuantity(cid, pid, quantity);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        if (error.message === "Producto no encontrado en el carrito") {
            return res.status(404).json({ status: "error", message: error.message });
        }

        res.status(500).json({ status: "error", message: error.message });
    }
};


export const updateCart = async (req, res) => {

    try {
        const { cid } = req.params;
        const { products } = req.body;

        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        if (!Array.isArray(products)) {
            return res.status(400).json({ status: "error", message: "Formato inválido. Debe enviar una lista de productos" });
        }

        const cart = await cartsMongo.updateCart(cid, products);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export const clearCart = async (req, res) => {

    try {
        const { cid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        const cart = await cartsMongo.clearCart(cid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }

};
