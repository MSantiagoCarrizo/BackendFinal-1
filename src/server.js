import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectBD from "./config/database.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    await connectBD();

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
    });
};

startServer();