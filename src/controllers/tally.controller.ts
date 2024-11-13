import axios from "axios";
import { Request, Response } from "express";

//Local Imports
import { generateTallyXML } from "../services/tally.service";
import { extractErrorsFromXml, logErrorsToFile } from "../utils/errors";

export const scrapeAndSendToTallyHandler = async (req:Request, res:Response) => {
    try {
      const body = req.body;
      //Generate Tall XML
      const tallyXML = generateTallyXML(body);

       const response = await axios.post(
         "http://localhost:9000",
         tallyXML,
         {
           headers: {
             "Content-Type": "application/xml",
           },
         }
       );

        if (response.status === 200) {
          // Parse the XML response from Tally
          const responseXml = response.data;
          // Extract error information from the XML (example)
          const errors = extractErrorsFromXml(responseXml);

          if (errors.length > 0) {
            // Log the errors to a separate file
            logErrorsToFile(errors);

            // Optionally, return an error response to the API user
            res
              .status(400)
              .json({ error: "Tally import failed", details: errors });
          } else {
            res.json({ message: "Data imported to Tally!" });
          }
        } else {
          // Handle other HTTP errors from Tally
          console.error("Tally HTTP error:", response.status, response.data);
          res.status(500).json({ error: "Tally import failed" });
        }

      // Set the Content-Type header to 'application/xml'
      
    } catch (error:any) {
        console.error("Error in Scrape and Send to TALLY Handler",error?.message);
    }
};
