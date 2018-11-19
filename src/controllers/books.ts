import {Book} from "../entity/Books";
import { getManager } from "typeorm";

export class Books {
    async addBook(req,res) {
        const bookRepository = getManager().getRepository(Book);
        const book = bookRepository.create({
            name: req.body.name,
            description: req.body.description,
            authorName: req.body.authorName,
            availability: req.body.availability
        })
        await bookRepository.save(book);
        res.json({
            status: true,
            response: book
        });
    }

    async getBooks(req, res) {
        const bookRepository = getManager().getRepository(Book);
        const books = await bookRepository.find();
        res.json({
            status: true,
            response: books
        });
    }
}