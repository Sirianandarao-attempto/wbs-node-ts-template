import { Router } from "express";
import * as users from "../controllers/user.ts";
import { validate } from "../middlewares/validate.ts";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.ts";

const router = Router();

router.get("/", users.listUsers);
router.post("/", validate(createUserSchema), users.createUser);
router.get("/:id", users.getUser);
router.put("/:id", validate(updateUserSchema), users.updateUser);
router.delete("/:id", users.deleteUser);

export default router;
