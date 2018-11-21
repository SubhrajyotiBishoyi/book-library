import { Registry } from "../entity/Registry";
import { User } from "../entity/Users";
import { Book } from "../entity/Books";
import { getManager } from "typeorm";
import {Books} from "../controllers/books";
const book = new Books();

export class BookLend {
    async bookLend(req, res, Payload) {
        const registryRepo = getManager().getRepository(Registry);
        var date = new Date();
        date.setDate(date.getDate() + 7);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();
        var RtnDate = mm + '/' + dd + '/' + y;

        const bookLendInfo = registryRepo.create({
            userId: req.user.id,
            bookId: req.params.id,
            lendDt: new Date(),
            returnDt: RtnDate
        })

        await registryRepo.save(bookLendInfo);
        book.updateOne(req, res);
        return res.json({
            status: true,
            response: bookLendInfo
        })
    }

    async myBooks(req, res) {
        const registryRepo = getManager().getRepository(Registry);
        const myBooks = await registryRepo.find({where: {
            userId: req.user.id
        }});
        if(!myBooks){
            return res.json({
                status: false,
                message: "No bok found"
            })
        }
        return res.json({
            status: true,
            response: myBooks
        })
    }
}