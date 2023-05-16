import express, { json } from 'express'
import productRoutes from "./routes/productRoutes"
import cartRoutes from './routes/cartRoutes'
import userRoutes from './routes/userRoutes'

const app = express()
app.use(json())

app.use('/products',productRoutes)
app.use('/cart',cartRoutes)
app.use('/users', userRoutes);

app.listen(4000,()=>{
    console.log("Server is running")
})
