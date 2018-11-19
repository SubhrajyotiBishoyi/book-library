import * as express from "express";
import { Auth } from "../controllers/auth";
import {Books} from "../controllers/books";
import {Authors} from "../controllers/authors";
import {Registry} from "../entity/Registry";

const auth = new Auth();
const book = new Books();
const author = new Authors();

export class API {
    static getRoutes() {
        let router: express.Router = express.Router();
        router.post("/auth/signup", auth.addUser);
        router.get("/auth/users", auth.getUsers);

        router.post("/auth/login", auth.loginUser);

        router.post("/addBook", book.addBook);
        router.get("/books", book.getBooks);

        router.post("/addAuthor", author.addAuthor);
        router.get("/authors", author.getAuthors);

        return router;
    }
}