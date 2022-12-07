import { Router } from "express";
import { getGame } from "../controllers/games.controller.js";

const router = Router();

// router.post("/games", postGame);
router.get("/games/:name", getGame);

export default router;