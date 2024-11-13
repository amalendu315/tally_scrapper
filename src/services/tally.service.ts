import { InputData, LedgerAllocation } from "../types";

export const generateTallyXML = (jsonData:InputData) => {
  const data = jsonData.data[0];
  // Create the XML string
  const xmlString = `
    <ENVELOPE>
      <HEADER>
        <TALLYREQUEST>Import Data</TALLYREQUEST>
      </HEADER>
      <BODY>
        <IMPORTDATA>
          <REQUESTDESC>
            <REPORTNAME>Vouchers</REPORTNAME>
            <STATICVARIABLES>
              <SVCURRENTCOMPANY>${data?.branchName}</SVCURRENTCOMPANY>
            </STATICVARIABLES>
          </REQUESTDESC>
          <REQUESTDATA>
            <TALLYMESSAGE xmlns:UDF="TallyUDF">
              <VOUCHER VCHTYPE="${data?.vouchertype}" ACTION="Create">
                <DATE>${data?.voucherdate}</DATE>
                <VOUCHERTYPENAME>${data?.vouchertype}</VOUCHERTYPENAME>
                <VOUCHERNUMBER>${data?.voucherno}</VOUCHERNUMBER>
                <NARRATION>${data?.narration}</NARRATION>
                ${data?.ledgerAllocation
                  .map(
                    (entry: LedgerAllocation) => `
                  <ALLLEDGERENTRIES.LIST>
                    <LEDGERNAME>${entry.ledgerName}</LEDGERNAME>
                    <AMOUNT>${entry.drCr === "cr" ? "" : "-"}${
                      entry.amount
                    }</AMOUNT>
                  </ALLLEDGERENTRIES.LIST>
                `
                  )
                  .join("")}
              </VOUCHER>
            </TALLYMESSAGE>
          </REQUESTDATA>
        </IMPORTDATA>
      </BODY>
    </ENVELOPE>
  `;

  // No need for async/await since there are no asynchronous operations
  return xmlString;
};
