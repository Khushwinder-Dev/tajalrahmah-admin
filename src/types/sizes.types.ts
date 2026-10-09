// import * as yup from "yup";
// import { categorySchema } from "../pages/Categories/Config/schemas/categories.schemas";
// import { sizeSchema } from "../pages/Sizes/Config/schemas/sizes.schemas";

// export type TSize = {
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

// export type TSizesList = {
//     totalSizes: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TSize[];
// }

// export type TSizeResponse = {
//     data: TSize;
//     message: string;
//     success: boolean;
// };

// export type TSizesResponse = {
//     data: TSizesList;
//     message: string;
//     success: boolean;
// };

// export type TSizesFormValues = yup.InferType<typeof sizeSchema>;
