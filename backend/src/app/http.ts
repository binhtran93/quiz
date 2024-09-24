import express from "express";
import cors from "cors";
import http from "http";
import configRoutes from "./router";
import container from "./container";

const app = express();
const port = process.env.PORT || 5000;
const origin = 'http://localhost:3000';

const corsOptions = {
    origin,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

const server = http.createServer(app);

configRoutes(app, container);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default server;