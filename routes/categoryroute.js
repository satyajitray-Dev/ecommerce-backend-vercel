import {addcategory,deletecategory,updatecategory,getcategory} from "../controller/categoryconstroller.js";
import express from "express";
import upload from "../middleware/uploads.js";

const caterouter= express.Router();
caterouter.post("/add",upload.single("image"),addcategory);
caterouter.delete("/delete/:id",deletecategory);
caterouter.put("/update/:id",updatecategory);
caterouter.get("/",getcategory);
export default caterouter;