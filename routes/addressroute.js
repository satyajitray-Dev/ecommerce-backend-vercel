import {addaddress,getaddress,address} from "../controller/addresscontroller.js";
import express from "express";
const route =express.Router();
route.post("/add",addaddress);
route.get("/:id",getaddress);
route.get("/",address);
export default route;
