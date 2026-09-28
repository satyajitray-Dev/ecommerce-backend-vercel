import {addcart,deletecart,deleteitems,getcart} from "../controller/cartcontroller.js";
import express from "express";
const route=express.Router();
route.post("/add",addcart);
route.delete("/remove/:id",deletecart);
route.delete("/removeitem",deleteitems);
route.get("/:id",getcart)
export default route;