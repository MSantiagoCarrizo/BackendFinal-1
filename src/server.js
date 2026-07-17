import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";

import app from "./app.js";
import connectBD from "./config/database.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {

    await connectBD();

    const httpServer = app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });

    const io = new Server(httpServer);

    app.set("io", io);

    io.on("connection", (socket) => {

        console.log(`Cliente conectado: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });

};

startServer();