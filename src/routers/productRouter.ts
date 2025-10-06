import { Router } from "express";
import * as products from "../controllers/product.ts";
import { validate } from "../middlewares/validate.ts";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.ts";

const router = Router();

router.get("/", products.listProducts); // supports ? categoryId= filter
router.post("/", validate(createProductSchema), products.createProduct);
router.get("/:id", products.getProduct);
router.put("/:id", validate(updateProductSchema), products.updateProduct);
router.delete("/:id", products.deleteProduct);

export default router;
