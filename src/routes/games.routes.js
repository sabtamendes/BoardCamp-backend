import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controller.js";

const router = Router();

router.post("/games", postGames);
router.get("/games", getGames);

export default router;