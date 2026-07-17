import { Router } from "express";
import productsMongo from "../dao/mongo/products.mongo.js";
import cartsMongo from "../dao/mongo/carts.mongo.js";

const router = Router();

router.get("/products", async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;

        const result = await productsMongo.getProducts({ limit, page, sort, query });

        res.render("products", {
            products: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        });
    } catch (error) {
        res.status(500).send("Error al cargar los productos");
    }
});


router.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await productsMongo.getProductById(pid);

        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

        res.render("product", { product });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get("/carts/:cid", async (req, res) => {
    try {
        const cart = await cartsMongo.getCartById(req.params.cid);

        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }

        res.render("cart", { cart });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


export default router;