import express from "express";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes de prueba

app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente");
});

export default app;