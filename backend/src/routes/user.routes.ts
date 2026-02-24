import express, { Router } from "express";
import { createUser } from "../controllers/user.controller.ts";

const router: Router = express.Router();

router.post("/", createUser);

export default router;
