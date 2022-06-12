import express, { Request, Response } from "express";
import { URLController } from "./controllers/URLController";

const api = express();
api.use(express.json());
const urlController = new URLController();

api.post("/shorten", urlController.shorten);

api.listen("5000", () => {
  console.log("Server is running");
});
