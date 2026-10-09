// import * as yup from "yup";
// import { subCategoriesSchema } from "../pages/SubCategories/Config/schemas/subCategories.schemas";

// export type TSubCategory = {
//     id: number;
//     code: string;
//     name: string,
//     description: string,
//     category_id: number,
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

// export type TSubCategoryList = {
//     totalSubCategories: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TSubCategory[];
// };

// export type TSubCategoryResponse = {
//     data: TSubCategory;
//     error?: { data: { message: string } };
//     message: string;
//     success: boolean;
// };

// export type TSubCategoriesResponse = {
//     data?: TSubCategoryList;
//     error?: { data: { message: string } };
//     message: string;
//     success: boolean;
// };

// export type TSubCategoriesFormValues = yup.InferType<typeof subCategoriesSchema>;
