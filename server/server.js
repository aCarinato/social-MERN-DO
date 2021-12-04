import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';

const morgan = require('morgan');
require('dotenv').config();

const app = express();

// connect to database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(`DB not connected with error ${err}`));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

// the following is done to use the endpoints defined in routes folder
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
