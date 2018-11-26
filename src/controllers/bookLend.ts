import { Registry } from "../entity/Registry";
import { getManager } from "typeorm";
import {Books} from "../controllers/books";
const book = new Books();

export class BookLend {
    async bookLend(req, res, Payload) {
        try{
        const registryRepo = getManager().getRepository(Registry);
        var date = new Date();
        date.setDate(date.getDate() + 7);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();
        var RtnDate = mm + '/' + dd + '/' + y;

        const bookLendInfo = registryRepo.create({
            lendDt: new Date(),
            returnDt: RtnDate,
            userId: req.user.id,
            bookId: req.params.id
        })
    
        await registryRepo.save(bookLendInfo);

        book.updateOne(req, res);
        return res.json({
            status: true,
            response: bookLendInfo
        })
    }
    catch(e){
        return res.json({
            status: false,
            error: e
        })
    }
    }

    async myBooks(req, res) {
        const registryRepo = getManager().getRepository(Registry);
        const myBooks = await registryRepo.find({where: {
            userId: req.user.id
        }});
        if(!myBooks){
            return res.json({
                status: false,
                message: "No book found"
            })
        }
        return res.json({
            status: true,
            response: myBooks
        })
    }
}