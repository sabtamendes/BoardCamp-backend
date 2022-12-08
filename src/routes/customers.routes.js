import { Router } from "express";
import { getCustomers, getCustomersById, postCustomers, putCustomers } from "../controllers/customers.controller.js";
import { customerIdValidation, customersValidation } from "../middleware/middleware.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", customersValidation, postCustomers);
router.put("/customers/:id", customersValidation, customerIdValidation, putCustomers);

export default router;