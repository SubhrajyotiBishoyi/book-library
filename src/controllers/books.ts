import { Book } from "../entity/Books";
import { getManager } from "typeorm";

export class Books {
    async addBook(req, res) {
        const bookRepository = getManager().getRepository(Book);
        const book = bookRepository.create({
            name: req.body.name,
            description: req.body.description,
            authorName: req.body.authorName,
            availability: req.body.availability
        })
        await bookRepository.save(book);
        return res.json({
            status: true,
            response: book
        });
    }

    async getBooks(req, res) {
        const bookRepository = getManager().getRepository(Book);
        const books = await bookRepository.find({where: {
            availability: true
        }});
        return res.json({
            status: true,
            response: books
        });
    }

    async getBookBtId(req, res) {
        const bookRepository = getManager().getRepository(Book);
        const book = await bookRepository.findOne(req.params.id);
        if (!book) {
            return res.json({
                status: false,
                response: "There is no book available with provide id"
            })
        }
        return res.json({
            status: true,
            response: book
        });
    }

    async update(req, res) {
        const bookRepository = getManager().getRepository(Book);
        await bookRepository.update(req.params.id, 
            {name: req.body.name,
            description: req.body.description,
            authorName: req.body.authorName,
            availability: req.body.availability});
        return res.json({
            status: true,
            response: " Book Updated Successfully"
        });
    }

    async updateOne(req, res) {
        const bookRepository = getManager().getRepository(Book);
        await bookRepository.update(req.params.id, {availability: false});
    }

}