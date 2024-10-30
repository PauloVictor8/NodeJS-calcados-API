import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
export class ProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const products = await prismaClient.product.findMany();
            return res.json(products);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch products" });
        }
    }

    async registerProduct(req: Request, res: Response) {
        try {
            const { name, category_id } = req.body;

            if (!name || !category_id) {
                return res.status(400).json({ error: "Name and category_id are required" });
            }

            const newProduct = await prismaClient.product.create({
                data: {
                    name,
                    category_id,
                },
            });

            return res.status(201).json({
                message: "Product registered successfully",
                product: newProduct
            });
        } catch (error) {
            return res.status(500).json({ error: "Failed to register product" });
        }
    }
}
