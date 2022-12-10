import { Router } from "express";
import { getRentals, postRentals} from "../controllers/rentals.controller.js";
import { rentalsValidation } from "../middleware/rentals.middleware.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalsValidation, postRentals);

export default router;