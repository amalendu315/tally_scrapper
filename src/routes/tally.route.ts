import express, {Request, Response} from 'express';
import { scrapeAndSendToTallyHandler } from '../controllers/tally.controller';



const router = express.Router();


router.get('/', (req:Request, res:Response)=>{
     res.json({message:"Hello You got in tally API Scrapper"})
});

router.post('/', scrapeAndSendToTallyHandler)

export default router;