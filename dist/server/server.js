"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
const filePath = path.join(__dirname, "../../data/data.json");
const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
app.use(express_1.default.static(path.join(__dirname, "../client")));
app.use("*", (req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});
app.get("/test", (req, res) => {
    res.status(200).send(readFileData);
});
app.listen(3000);
