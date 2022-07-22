"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongo_1 = __importDefault(require("./mongo"));
const fs = require("fs");
const path = require("path");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
const db = new mongo_1.default();
db.connect()
    .then(result => console.log(result))
    .catch(err => console.log(err));
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
app.get('/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokeId = Number(req.query.id);
    const result = yield db.findOne(pokeId);
    console.log(result);
    res.send('you send id=' + result);
}));
app.get('/pokemon/page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNumber = Number(req.query.page);
    const result = yield db.getPage(pageNumber);
    console.log(result);
    res.send('you send id=' + result);
}));
app.listen(3000);
