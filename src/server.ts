import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './routes/routes';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(cors()) 
app.use(Routes)


app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
