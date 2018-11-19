import {Author} from "../entity/Authors";
import {getManager} from "typeorm";

export class Authors {
    async addAuthor(req,res) {
        const authorRepo = getManager().getRepository(Author);
        const author = authorRepo.create({
            name: req.body.name,
            bookName: req.body.bookName
        })
        await authorRepo.save(author);
        res.json({
            status: true,
            response: author
        });
    }

    async getAuthors(req, res) {
        const authorRepo = getManager().getRepository(Author);
        const authors = await authorRepo.find();
        res.json({
            status: true,
            response: authors
        });
    }
}