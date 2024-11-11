import cors from "cors";
import morgan from 'morgan'
import express from "express";
import bodyParser from "body-parser";

//Local Imports
import { PORT } from "./config/constants";
import tallyRoute from './routes/tally.route';

const app = express();


// Custom token to format the timestamp
morgan.token('readable-date', (req, res) => {
  return new Date().toLocaleString(); // Format timestamp as readable date and time
});

//Middlewares
app.use(cors());
app.use(
  morgan(
    ":readable-date :method :url :status :res[content-length] - :response-time ms"
  )
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/tally',tallyRoute)

//app listenting
app.listen(PORT, () => {
  return console.log(`TALLY SCRAPPER IS LIVE ON PORT :- ${PORT}`);
});
