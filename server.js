import express from "express";
import cors from 'cors';
import { handleError } from "./src/common/helpers/error.helper.js";
import rootRouter from "./src/routes/root.router.js";


const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'google.com']
}))

app.use(express.static("."))

app.use(rootRouter);

app.use(handleError);


app.listen(3069, () => {
    console.log(`Server Online At Port 3069`);
});

