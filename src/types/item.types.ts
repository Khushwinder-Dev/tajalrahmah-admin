// import * as yup from "yup";
// import { divisionSchema } from "../pages/Division/Config/division.schemas";

// export type TItem = {
//   id?: number;
//   name: string;
//   code: string;
//   name_in_bangla: string | null;
//   name_in_arabic: string | null;
//   draft: number | boolean | null;
//   is_active: number | boolean | null;
//   is_deleted: number | boolean | null;
//   is_delete?: number | boolean | null;
//   is_default: number | boolean | null;
//   created_at?: string;
//   updated_at?: string;
//   drafted_at?: string | null;
//   deleted_at?: string | null;
// };

// export type TItemList = {
//   totalItems: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TItem[];
// };

// export type TItemResponse = {
//   data: TItem;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TItemsResponse = {
//   data?: TItemList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TItemFormValues = yup.InferType<typeof divisionSchema>;
