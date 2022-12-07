import express from "express";
import cors from "cors";
import categories from "./routes/categories.routes.js";
import games from "./routes/games.routes.js";

const server = express();
server.use(cors());
server.use(express.json());


server.use(categories);
server.use(games);

const port = 4000

server.listen(port , () => { console.log("Listening on port " + port ) });