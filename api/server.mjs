import express from 'express';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import { productRouter } from './routes/product.mjs';

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use('/product', productRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hi"
    })
})







app.listen(9090)