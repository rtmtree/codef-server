import cors from "cors";
import express from "express";
import path from "path";

const server = express();
const pathToTemplateData = path.join(__dirname, "../../public/TemplateData");
const pathToBuild = path.join(__dirname, "../../public/Build");
const pathToPublic = path.join(__dirname, "../../public");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/public/TemplateData", express.static(pathToTemplateData));
server.use("/public/Build", express.static(pathToBuild));
server.use(express.static(pathToPublic));

export default server;
