import { Router } from "express";
import {
    createCart,
    getCartById,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    updateCart,
    clearCart
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/", createCart);
router.get("/:cid", getCartById);
router.post("/:cid/products/:pid", addProductToCart);
router.delete("/:cid/products/:pid", removeProductFromCart);
router.put("/:cid/products/:pid", updateProductQuantity);
router.put("/:cid", updateCart);
router.delete("/:cid", clearCart);

export default router