import { InputData, Voucher } from "../types";

export const scrapeLedgerEntries = (jsonData:InputData) => {
    //Sanitize the data
    const sanitizedData = {
      data: jsonData.data?.map((entry: Voucher) => ({
        branchName: entry.branchName,
        voucherType: entry.vouchertype,
        voucherno: entry.voucherno,
        voucherdate:entry.voucherdate,
        narration: entry.narration,
        ledgerAllocation: entry.ledgerAllocation?.map((ledger) => ({
          lineno: ledger.lineno,
          ledgername: ledger.ledgerName,
          amount: parseFloat(ledger.amount), // Assuming amount is a string
          drCr: ledger.drCr,
        })),
      })),
    };
    return sanitizedData;
};