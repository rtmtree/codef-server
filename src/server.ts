import cors from "cors";
import express from "express";
import api from "./api/v1";
import { corsOptions } from "./config/cors";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors(corsOptions));

server.use(
  "/public/TemplateData",
  express.static(__dirname + "/public/TemplateData")
);
server.use("/public/Build", express.static(__dirname + "/public/Build"));
server.use(express.static(__dirname + "/public"));

server.use("/api", api);

export default server;
