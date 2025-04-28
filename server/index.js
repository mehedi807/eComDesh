import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoute from './routes/authRoute.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
//app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8081",
    credentials: true,
}
))

 app.use('/api/auth', authRoute);
// app.use('/api/account', accountsRoute);
// app.use('/api/record', recordsRoute);
// app.use('/api/budget', budgetRoute);

app.listen(PORT, () => {
    console.log('Server is running on PORT : ' + PORT);
    connectDB();
});
