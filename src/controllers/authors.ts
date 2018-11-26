import {Author} from "../entity/Authors";
import {Book} from "../entity/Books";
import {getManager} from "typeorm";

export class Authors {
    async addAuthor(req,res) {
        try{
        const authorRepo = getManager().getRepository(Author);
        const bookRepo = getManager().getRepository(Book);
        const author = authorRepo.create({
            name: req.body.name,
            bookName: req.body.bookName
        })
        await authorRepo.save(author);

        // const book = new Book();
        // author.books = [book];
        // await bookRepo.save(book);

        res.json({
            status: true,
            response: author
        });
    }
    catch(e){
        res.json({
            status: false,
            response: e
        });
    }
    }

    async getAuthors(req, res) {
        const authorRepo = getManager().getRepository(Author);
        const authors = await authorRepo.find({relations:["books"]});
        res.json({
            status: true,
            response: authors
        });
    }
}