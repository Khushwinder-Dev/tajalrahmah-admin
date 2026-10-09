// import * as yup from "yup";
// import { serviceCategorySchema } from "../pages/ServiceCategory/Config/serviceCategory.schemas";

// export type TServiceCategory = {
//     id?: number;
//     code: string;
//     name: string;
//     rating: number;
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

// export type TServiceCategoryList = {
//     totalServiceCategory: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TServiceCategory[];
// }

// export type TServiceCategoryResponse = {
//     data: TServiceCategory;
//     message: string;
//     success: boolean;
// };

// export type TServiceCategoriesResponse = {
//     data: TServiceCategoryList;
//     message: string;
//     success: boolean;
// };

// export type TServiceCategoryFormValues = yup.InferType<typeof serviceCategorySchema>;
