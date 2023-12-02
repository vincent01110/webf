import express from "express";
import { getProducts, getDiscount, getProductById } from "../database.mjs";
import { calculateDiscount } from "../calculations.mjs";
import {writeToLogFile} from "../logger.mjs";


const productRouter = express.Router()


productRouter.get('/', async (req, res) => {
    try {
        const products = await getProducts()
        let l = []
        for (let i = 0; i < products.length; i++) {
            products[i]['discountedPrice'] = calculateDiscount(products[i], await getDiscount(products[i].discount_id))
            l.push(products[i])
        }
        res.send(l)
    } catch (err) {
        writeToLogFile(`/product -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

productRouter.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const reqProduct = await getProductById(productId)
        reqProduct[0]['discountedPrice'] = calculateDiscount(reqProduct[0], await getDiscount(reqProduct[0].discount_id))
        res.send(reqProduct[0])
    } catch (err) {
        writeToLogFile(`/product/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})


export { productRouter }