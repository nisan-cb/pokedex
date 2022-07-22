import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
import MongoManager from "./mongo";
const fs = require("fs");
const path = require("path");

const app = express();
app.use(json());

interface User {
  name: string;
  about: string;
  avatar: string;
  id: string;
}
const db = new MongoManager();
db.connect()
  .then(result => console.log(result))
  .catch(err => console.log(err));

const filePath: string = path.join(__dirname, "../../data/data.json");
const readFileData: User[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

app.use(express.static(path.join(__dirname, "../client")))

app.use("*", (req: Request, res: Response, next) => {
  console.log(req.method, req.originalUrl);
  next()
})


app.get("/test", (req: Request, res: Response) => {
  res.status(200).send(readFileData);
});

app.get('/pokemon', async (req: Request, res: Response) => {
  const pokeId = Number(req.query.id);
  const result = await db.findOne(pokeId)
  console.log(result)
  res.send('you send id=' + result);
})
app.get('/pokemon/page', async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.page);
  const result = await db.getPage(pageNumber)
  console.log(result)
  res.send('you send id=' + result);
})



app.listen(3000);
