import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categories from "./routes/categories.routes.js";
import games from "./routes/games.routes.js";
import customers from "./routes/customers.routes.js";
import rentals from "./routes/rentals.routes.js";
dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());


server.use(categories);
server.use(games);
server.use(customers);
server.use(rentals);

const port = process.env.PORT

server.listen(port, () => { console.log(`Listening on port ${port}`) });