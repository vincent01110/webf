import express from 'express';
import cors from 'cors';
import { productRouter } from './routes/product.mjs';
import { userRouter } from './routes/user.mjs';
import { getDiscounts } from './database.mjs';
import { collectionRouter } from './routes/collection.mjs';

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/collection', collectionRouter)

app.get('/discounts', async (req, res) => {
    try {
        const discount = await getDiscounts()
        res.send(discount)
    } catch (err) {
        writeToLogFile(`/discounts -> Error fetching: ${err}`);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hi"
    })
})







app.listen(9090)