// import { currenciesSchema } from "../pages/Currencies/Config/currencies.schemas";
// import * as yup from 'yup';

// export type TCurrency = {
//   data: any;
//   id?: number;
//   code: string;
//   name: string;
//   exchange: number;
//   symbol: string;
//   name_in_bangla: string;
//   name_in_arabic: string;
//   is_default: number;
//   draft: number;
//   drafted_at: string;
//   is_active: number;
//   is_deleted: number;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string | null;
// }

// export type TCurrencyList = {
//   data: any;
//   totalCurrencies: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TCurrency[];
// };

// export type TCurrencyResponse = {
//   data: TCurrency;
//   message: string;
//   success: boolean;
//   error?: string;
//   isLoading?: boolean;
//   isFetching?: boolean;
// };

// export type TCurrenciesResponse = {
//   data: TCurrencyList;
//   message: string;
//   success: boolean;
//   error?: string;
//   isLoading?: boolean;
//   isFetching?: boolean;
// };

// export type TCurrencyFormValues = yup.InferType<typeof currenciesSchema>;

export interface Currency {
  id: string;
  code: string;
  currency: string;
  exchange: number;
  symbol: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}
