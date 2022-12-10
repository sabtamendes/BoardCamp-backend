import { Router } from "express";
import { getCustomers, getCustomersById, patchCustomers, postCustomers } from "../controllers/customers.controller.js";
import { customerIdValidation, customersValidation } from "../middleware/middleware.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", customersValidation, postCustomers);
router.patch("/customers/:id", customersValidation, customerIdValidation, patchCustomers);

export default router;