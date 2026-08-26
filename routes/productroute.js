import express from "express";
import upload from "../middleware/uploads.js";
import { createproduct, updateproduct,deleteproduct, getproduct,getbyidproduct, deletemanyproduct } from "../controller/productcontroller.js";
 
const route=express.Router();

route.post("/add",upload.single("image"),createproduct);
route.put("/update/:id",updateproduct);
route.get("/",getproduct);
route.get("/:id",getbyidproduct);
route.delete("/delete/",deletemanyproduct);
route.delete("/delete/:id",deleteproduct);
export default route;