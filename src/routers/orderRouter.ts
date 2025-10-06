import { Router } from "express";
import * as orders from "../controllers/order.ts";
import { validate } from "../middlewares/validate.ts";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../schemas/order.schema.ts";

const router = Router();

router.get("/", orders.listOrders);
router.post("/", validate(createOrderSchema), orders.createOrder);
router.get("/:id", orders.getOrder);
router.put("/:id", validate(updateOrderSchema), orders.updateOrder);
router.delete("/:id", orders.deleteOrder);

export default router;
