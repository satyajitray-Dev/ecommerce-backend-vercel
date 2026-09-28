import {placeorder} from "../controller/ordercontroller.js";
import express from "express";
const router = express.Router();
router.get("/place/:id",placeorder);
export default router;