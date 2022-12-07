import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categories.controller.js";

const router = Router();

router.post("/categories", postCategories);
router.get("/categories", getCategories);

export default router;