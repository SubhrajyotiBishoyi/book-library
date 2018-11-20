import * as express from "express";
import { Auth } from "../controllers/auth";
import {Books} from "../controllers/books";
import {Authors} from "../controllers/authors";
import {Registry} from "../entity/Registry";
import Middleware from "../passport/localMiddlware";
import "../passport/local";
import jwtMiddleware from "../passport/jwtMiddleware";
import "../passport/jwt";

const auth = new Auth();
const book = new Books();
const author = new Authors();

export class API {
    static getRoutes() {
        let router: express.Router = express.Router();
        router.post("/auth/signup", auth.addUser);
        router.get("/auth/users", auth.getUsers);

        router.post("/auth/login", Middleware, auth.loginUser);

        router.post("/addBook", jwtMiddleware, book.addBook);
        router.get("/books", jwtMiddleware, book.getBooks);

        router.post("/addAuthor", author.addAuthor);
        router.get("/authors", author.getAuthors);

        return router;
    }
}