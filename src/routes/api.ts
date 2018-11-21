import * as express from "express";
import { Auth } from "../controllers/auth";
import {Books} from "../controllers/books";
import {Authors} from "../controllers/authors";
import Middleware from "../passport/localMiddlware";
import "../passport/local";
import jwtMiddleware from "../passport/jwtMiddleware";
import "../passport/jwt";
import { BookLend } from "../controllers/bookLend";
import * as multer from "multer";

const auth = new Auth();
const book = new Books();
const author = new Authors();
const bookLend = new BookLend();
const upload = multer({dest: 'uploads/photos'});

export class API {
    static getRoutes() {
        let router: express.Router = express.Router();
        router.post("/auth/signup", upload.single('photo'), auth.addUser);
        router.get("/auth/users", auth.getUsers);

        router.post("/auth/login", Middleware, auth.loginUser);

        router.post("/addBook", jwtMiddleware, book.addBook);
        router.get("/books", jwtMiddleware, book.getBooks);
        router.put("/books/update/:id", jwtMiddleware, book.update);
        router.get("/books/:id", jwtMiddleware, book.getBookBtId);
        router.post("/books/:id/lend", jwtMiddleware, bookLend.bookLend);
        router.get("/books/owned/me", jwtMiddleware, bookLend.myBooks);

        router.post("/addAuthor", author.addAuthor);
        router.get("/authors", author.getAuthors);

        return router;
    }
}