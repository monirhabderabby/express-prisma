import { Router } from "express";
import { createUser } from "./user.controller.js";

const router = Router();

// POST: /api/v1/users/register (ba /api/v1/users)
router.post("/register", createUser);

export const userRoutes = router;
