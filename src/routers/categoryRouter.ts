import { Router } from "express";
import * as categories from "../controllers/category.ts";
import { validate } from "../middlewares/validate.ts";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema.ts";

const router = Router();

router.get("/", categories.listCategories);
router.post("/", validate(createCategorySchema), categories.createCategory);
router.get("/:id", categories.getCategory);
router.put("/:id", validate(updateCategorySchema), categories.updateCategory);
router.delete("/:id", categories.deleteCategory);

export default router;
