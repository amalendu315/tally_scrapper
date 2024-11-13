import axios from "axios";
import { Request, Response } from "express";

//Local Imports
import { generateTallyXML } from "../services/tally.service";
import { extractErrorsFromXml, logErrorsToFile } from "../utils/errors";

export const scrapeAndSendToTallyHandler = async (req:Request, res:Response) => {
    try {
      const body = req.body;
      const results = [];
      //Generate Tall XML
      for (const voucherData of body.data) {
        const tallyXml = generateTallyXML(voucherData);

        const response = await axios.post("http://localhost:9000", tallyXml, {
          headers: {
            "Content-Type": "application/xml",
          },
        });

        if (response.status === 200) {
          const responseXml = response.data;
          const errors = extractErrorsFromXml(responseXml);

          if (errors.length > 0) {
            logErrorsToFile(errors);
            results.push({ voucher: voucherData, status: "failed", errors });
          } else {
            results.push({ voucher: voucherData, status: "success" });
          }
        } else {
          console.error("Tally HTTP error:", response.status, response.data);
          results.push({
            voucher: voucherData,
            status: "failed",
            errors: ["Tally HTTP error: " + response.status],
          });
        }
      }

      res.json(results);
      
    } catch (error:any) {
        console.error("Error in Scrape and Send to TALLY Handler",error?.message);
    }
};
