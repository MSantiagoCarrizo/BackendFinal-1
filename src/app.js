import express from "express";
import productsRouter from "./routes/products.router.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

// API
app.use("/api/products", productsRouter);

export default app;