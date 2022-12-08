import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentals.controller";

const router = Router();

router.get("/rentals", getRentals);
router.post("rentals", postRentals);

export default router;