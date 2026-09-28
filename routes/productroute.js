import express from "express";
import upload from "../middleware/uploads.js";
import { protect } from "../controller/authorizationcontroller.js";
import { createproduct, updateproduct,deleteproduct, getproduct,getbyidproduct, deletemanyproduct } from "../controller/productcontroller.js";
 
const route=express.Router();

route.post("/add",protect,upload.single("image"),createproduct);
route.put("/update/:id",protect,upload.single("image"),updateproduct);
route.get("/",getproduct);
route.get("/:id",getbyidproduct);
route.delete("/delete/",protect,deletemanyproduct);
route.delete("/delete/:id",deleteproduct);
export default route;