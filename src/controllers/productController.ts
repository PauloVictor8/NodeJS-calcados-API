import { Request, Response } from "express";

export class ProductController {
    getProducts(req: Request, res: Response) {
        return res.json({
            "teste": "teste"
        });
    }

    registerProduct() {

    }
}