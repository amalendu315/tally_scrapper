const fs = require("fs");
const { parseString } = require("xml2js"); // Or use another XML parsing library

export function extractErrorsFromXml(xmlString: any) {
  try {
    let errors: any[] = [];

    parseString(
      xmlString,
      { explicitArray: false },
      (err: any, result: any) => {
        if (err) {
          console.error("Error parsing XML:", err);
          return; // Or handle the error appropriately
        }

        if (result.RESPONSE.LINEERROR) {
          if (Array.isArray(result.RESPONSE.LINEERROR)) {
            errors = result.RESPONSE.LINEERROR;
          } else {
            errors = [result.RESPONSE.LINEERROR];
          }
        }
      }
    );

    return errors;
  } catch (error) {
    console.error("Error extracting errors from XML:", error);
    return []; // Or handle the error appropriately
  }
}

export function logErrorsToFile(errors: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] Tally Import Errors:\n${errors.join(
    "\n"
  )}\n\n`;

  fs.appendFile("tally_errors.log", logMessage, (err: any) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}
