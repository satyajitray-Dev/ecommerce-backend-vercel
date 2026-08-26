import {addaddress,getaddress} from "../controller/addresscontroller.js";
import express from "express";
const route =express.Router();
route.post("/add",addaddress);
route.get("/:id",getaddress);
export default route;
