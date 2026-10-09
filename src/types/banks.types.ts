// import * as yup from "yup";
// import { bankSchema } from "../pages/Banks/Config/banks.schemas";

// export type TBank = {
//     id: number;
//     bank_name: string;
//     account_number: string | undefined;
//     branch_name: string;
//     iban_number: string;
//     bank_details: string;
//     name_in_bangla: string;
//     name_in_arabic: string;
//     opening_balance: string;
//     is_default: number;
//     draft: number;
//     drafted_at: string;
//     is_active: number;
//     is_deleted: number;
//     created_at: string;
//     updated_at: string;
//     deleted_at: string | null;
// };

// export type TBankList = {
//     totalBanks: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TBank[];
// };

// export type TBankResponse = {
//     data: TBank;
//     error?: { data: { message: string } };
//     message: string;
//     success: boolean;
// };

// export type TBanksResponse = {
//     data?: TBankList;
//     error?: { data: { message: string } };
//     message: string;
//     success: boolean;
// };

// export type TBankFormValues = yup.InferType<typeof bankSchema>;
