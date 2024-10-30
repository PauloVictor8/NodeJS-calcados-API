import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
export class ProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const products = await prismaClient.product.findMany({
                select: {
                    name: true,
                    Category: {
                        select: {
                            name: true,
                            Product: true
                        }
                    },
                    ProductItem: {
                        select: {
                            Color: true,
                            Product: true,
                            sale_price: true,
                            SizeOption: true,
                        }
                    }
                }
            });
            return res.json(products);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch products" });
        }
    }

    async registerProduct(req: Request, res: Response) {
        try {
            const { name, category_id } = req.body;
            console.log('name', name);
            console.log('category_id', category_id);

            if (!name || !category_id) {
                return res.status(400).json({ error: "Name and category_id are required" });
            }

            // const name_category = String(category_id);
            // await prismaClient.category.create({
            //     data: {
            //         category_id: category_id,
            //         name: name_category
            //     }
            // })

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
