import express from 'express';
import upload from '../middleware/uploads.js';
import {signupUser,login} from '../controller/authcontroller.js';
const router= express.Router();
router.post("/signup",upload.single("avatar"),signupUser);
router.post("/login",login);
export  default router;