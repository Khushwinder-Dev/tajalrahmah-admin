// import * as yup from "yup";
// import { designationSchema } from "../pages/Designation/Config/designation.schemas";
// export type TDesignation = {
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

// export type TDesignationList = {
//   totalDesignations: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TDesignation[];
// };

// export type TDesignationResponse = {
//   data: TDesignation;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TDesignationsResponse = {
//   data?: TDesignationList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TDesignationFormValues = yup.InferType<typeof designationSchema>;
