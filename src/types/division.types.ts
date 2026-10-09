// import * as yup from "yup";
// import { divisionSchema } from "../pages/Division/Config/division.schemas";

// export type TDivision = {
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

// export type TDivisionList = {
//   totalDivisions: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TDivision[];
// };

// export type TDivisionResponse = {
//   data: TDivision;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TDivisionsResponse = {
//   data?: TDivisionList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TDivisionFormValues = yup.InferType<typeof divisionSchema>;
