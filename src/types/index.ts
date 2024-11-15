interface LedgerAllocation {
    lineno:number;
    ledgerName:string;
    amount:string;
    drCr: 'dr' | 'cr';
};

interface Voucher {
    branchName:string;
    vouchertype:string;
    voucherno:string;
    voucherdate:string;
    narration:string;
    ledgerAllocation:LedgerAllocation[];
};

interface InputData {
    data:Voucher[];
};

interface StatusResponse {
    statusmessage:string;
    statuscode:number;
    voucherno:string;
}

export {
    LedgerAllocation,
    Voucher,
    InputData,
    StatusResponse
}