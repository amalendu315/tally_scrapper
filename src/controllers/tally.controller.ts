import { Request, Response } from "express";

//Local Imports
import { scrapeLedgerEntries } from "../utils/scrapper";
import { sendLedgerEntriesToTally } from "../services/tally.service";

export const scrapeAndSendToTallyHandler = async (req:Request, res:Response) => {
    try {
        const ledgerData = await scrapeLedgerEntries();
        //@ts-ignore
        await sendLedgerEntriesToTally(ledgerData);
        res.status(200).json({
            statusMessage:"Success",
            statusCode:101,
            voucherNumber:'',
        })
    } catch (error:any) {
        console.error("Error in Scrape and Send to TALLY Handler",error?.message);
    }
};
