// import * as yup from "yup";
// import { storeSchema } from "../pages/Store/Config/stores.schemas";

// export type TStore = {
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

// export type TStoreList = {
//     totalStores: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TStore[];
// }

// export type TStoreResponse = {
//     data: TStore;
//     message: string;
//     success: boolean;
// };

// export type TStoresResponse = {
//     data: TStoreList;
//     message: string;
//     success: boolean;
// };

// export type TStoreFormValues = yup.InferType<typeof storeSchema>;
