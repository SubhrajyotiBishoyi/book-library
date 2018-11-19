import "reflect-metadata";
import "typescript";
import {createConnection} from "typeorm";
import {API} from "./routes/api";
import {Request, Response} from "express";
import * as express from "express";
import * as http from "http";
import { User } from "./entity/Users";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/', API.getRoutes())

createConnection().then(async (connection) => {
    http.createServer(app).listen(8080);
    console.log("server is running on port 8080");
}).catch(error => console.log(error));