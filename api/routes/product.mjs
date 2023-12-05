import express from "express";
import { getProducts, getDiscount, getProductById, addProduct, updateProduct, deleteProduct } from "../database.mjs";
import { calculateDiscount } from "../calculations.mjs";
import { writeToLogFile } from "../logger.mjs";


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
        writeToLogFile(`(GET) /product -> Error: ${err}`);
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
        writeToLogFile(`(GET) /product/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

productRouter.post('/', async (req, res) => {
    try {
        const request = req.body
        const product = await addProduct(request.category, request.name, request.price, request.discount_id, request.attribute, request.image)
        product['discountedPrice'] = calculateDiscount(product, await getDiscount(product.discount_id))
        res.status(201).send(product)
    } catch (err) {
        writeToLogFile(`(POST) /product -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

productRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { category, name, price, discount_id, image } = req.body
        const product = await getProductById(id).then((result) => {
            if (category) result[0].category = category;
            if (name) result[0].name = name;
            if (price) result[0].price = price;
            if (discount_id !== undefined) result[0].discount_id = discount_id;
            if (image) result[0].image = image;
            return result[0]
        }).then(async (result) => {
            const query = await updateProduct(id, result.category, result.name, result.price, result.discount_id, result.image)
            return result
        })
        res.send(product)
    } catch (err) {
        writeToLogFile(`(PUT) /product/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})


productRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await deleteProduct(id)
        res.send(response)
    } catch (err) {
        writeToLogFile(`(DELETE) /product/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }

})


export { productRouter }