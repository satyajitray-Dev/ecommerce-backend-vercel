import {placeorder} from "../controller/ordercontroller.js";
import express from "express";
const router = express.Router();
router.post("/place",placeorder);
export default router;