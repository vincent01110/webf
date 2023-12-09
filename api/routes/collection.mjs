import express from 'express';
import { getAllCollectionProducts, getDiscount, getCollectionProducts, getCollections, getCollection, createCollection, deleteCollection, deleteCollectionProducts, modifyCollName, addProductToCollection } from '../database.mjs';
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

collectionRouter.get('/:id/product', async (req, res) => {
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


collectionRouter.post('/', async (req, res) => {
    try {
        const {name} = req.body
        const coll = await createCollection(name)
        res.status(201).send(coll)
    } catch (err) {
        writeToLogFile(`(POST) /collection -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

collectionRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const coll = await deleteCollection(id)
        const prod = await deleteCollectionProducts(id)
        res.status(200).send({collection: coll, products: prod})
    } catch (err) {
        writeToLogFile(`(DELETE) /collection/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

collectionRouter.put('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const {name} = req.body
        const query = await modifyCollName(id, name)
        res.status(200).send(query)
    } catch (err){
        writeToLogFile(`(PUT) /collection/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

collectionRouter.delete('/:id/product', async (req, res) => {
    try {
        const id = req.params.id
        const coll = await deleteCollectionProducts(id)
        res.status(200).send(coll)
    } catch (err) {
        writeToLogFile(`(DELETE) /collection/:id -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

collectionRouter.post('/:collId/product/:prodId', async (req, res) => {
    try {
        const collId = req.params.collId
        const prodId = req.params.prodId
        const coll = await addProductToCollection(collId, prodId)
        res.status(201).send(coll)
    } catch (err) {
        writeToLogFile(`(POST) /collection -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})



export { collectionRouter }