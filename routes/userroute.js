import express from "express";
import { update,userdelete} from "../controller/usercontroller.js";
const route=express.Router();
route.delete("/delete/:id",userdelete);
route.put("/update/:id",update);
export default route;
