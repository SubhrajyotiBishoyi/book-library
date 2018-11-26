import "reflect-metadata";
import "typescript";
import {createConnection} from "typeorm";
import {API} from "./routes/api";
import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import { Book } from "./entity/Books";


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/', API.getRoutes())

createConnection().then(async (connection) => {
    http.createServer(app).listen(8080);
    console.log("server is running on port 8080");

    // const categoriesWithQuestions = await connection
    // .getRepository(Book)
    // .createQueryBuilder("book")
    // .leftJoinAndSelect("book.authors", "author")
    // .getMany();

}).catch(error => console.log(error));