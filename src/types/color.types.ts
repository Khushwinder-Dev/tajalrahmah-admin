// import * as yup from "yup";
// import { colorSchema } from "../pages/Color/Config/color.schemas";

// export type TColor = {
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

// export type TColorList = {
//   totalColors: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TColor[];
// };

// export type TColorResponse = {
//   data: TColor;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TColorsResponse = {
//   data?: TColorList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TColorFormValues = yup.InferType<typeof colorSchema>;
