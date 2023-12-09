import express from 'express';
import { getAllCollectionProducts, getDiscount, getCollectionProducts, getCollections, getCollection } from '../database.mjs';
import { writeToLogFile } from '../logger.mjs';
import { calculateDiscount } from '../calculations.mjs';


const collectionRouter = express.Router()


collectionRouter.get('/', async (req, res) => {
    try {
        const collections = await getCollections()
        res.send(collections);
    } catch (err) {
        writeToLogFile(`(GET) /collection -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

collectionRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const collections = await getCollection(id)
        res.send(collections);
    } catch (err) {
        writeToLogFile(`(GET) /collection/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})


collectionRouter.get('/product', async (req, res) => {
    try {
        const collections = await getAllCollectionProducts()
        res.send(collections);
    } catch (err) {
        writeToLogFile(`(GET) /collection/product -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

collectionRouter.get('/product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const products = await getCollectionProducts(id)
        let l = []
        for (let i = 0; i < products.length; i++) {
            products[i]['discountedPrice'] = calculateDiscount(products[i], await getDiscount(products[i].discount_id))
            l.push(products[i])
        }
        res.send(l)
    } catch (err) {
        writeToLogFile(`(GET) /collection/product/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})



export { collectionRouter }