import express from "express";
import { allusers, update,userdelete, getuser} from "../controller/usercontroller.js";
import { protect } from "../controller/authorizationcontroller.js";
const route=express.Router();
route.delete("/delete/:id",userdelete);
route.put("/update/:id",update);
route.get("/",allusers);
route.get("/:id",getuser)
export default route;
