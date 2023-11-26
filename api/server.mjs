import express from 'express';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import { getProducts, getDiscount } from './database.mjs';
import { calculateDiscount } from './calculations.mjs';

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hi"
    })
})

app.get('/products', async (req, res) => {
    try {
        const products = await getProducts()
        let l = []
        for (let i = 0; i < products.length; i++) {
            products[i]['discountedPrice'] = calculateDiscount(products[i], await getDiscount(products[i].discount_id))
            l.push(products[i])
        }
        res.send(l)
    } catch (err) {
        writeToLogFile(`/products -> Error: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})





app.listen(9090)