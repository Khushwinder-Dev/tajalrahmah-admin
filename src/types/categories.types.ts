// import * as yup from "yup";
// import { categorySchema } from "../pages/Categories/Config/schemas/categories.schemas";

// export type TCategory = {
//     id?: number;
//     code: string;
//     name: string;
//     name_in_bangla?: string;
//     name_in_arabic?: string;
//     is_default: number;
//     draft: number;
//     drafted_at: string;
//     is_active: number;
//     is_deleted: number;
//     created_at: string;
//     updated_at: string;
//     deleted_at: string | null;
// }

// export type TCategoriesList = {
//     totalCustomer: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TCategory[];
// }

// export type TCategoryResponse = {
//     data: TCategory;
//     message: string;
//     success: boolean;
// };

// export type TCategoriesResponse = {
//     data: TCategoriesList;
//     message: string;
//     success: boolean;
// };

// export type TCategoriesFormValues = yup.InferType<typeof categorySchema>;
