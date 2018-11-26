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
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/photos");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + new Date().toISOString());
    }
   });

const fileFilter = (req, file, cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};   
const upload = multer({
        storage: storage,
        limits: {fileSize: 1024 * 1024},
        fileFilter: fileFilter
    });

export class API {
    static getRoutes() {
        let router: express.Router = express.Router();
        router.post("/auth/signup", upload.single('photo'), auth.addUser);
        router.get("/auth/users", auth.getUsers);
        router.post("/auth/login", auth.loginUser);
        router.put("/auth/me", upload.single('photo'), jwtMiddleware, auth.updateAuth);

        router.post("/addBook", jwtMiddleware, book.addBook);
        router.get("/books", jwtMiddleware, book.getBooks);
        router.put("/books/update/:id", jwtMiddleware, book.update);
        router.get("/books/:id", jwtMiddleware, book.getBookBtId);
        router.post("/books/:id/lend", jwtMiddleware, bookLend.bookLend);
        router.get("/books/owned/me", jwtMiddleware, bookLend.myBooks);

        router.post("/addAuthor", jwtMiddleware, author.addAuthor);
        router.get("/authors", jwtMiddleware, author.getAuthors);

        return router;
    }
}