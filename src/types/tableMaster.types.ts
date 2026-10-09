// import * as yup from "yup";
// import { categorySchema } from "../pages/Categories/Config/schemas/categories.schemas";
// import { tableMasterSchema } from "../pages/TableMaster/Config/schemas/tableMaster.schemas";

// export type TTableMaster = {
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

// export type TTableMastersList = {
//     totalTableMaster: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TTableMaster[];
// }

// export type TTableMasterResponse = {
//     data: TTableMaster;
//     message: string;
//     success: boolean;
// };

// export type TTableMastersResponse = {
//     data: TTableMastersList;
//     message: string;
//     success: boolean;
// };

// export type TTableMastersFormValues = yup.InferType<typeof tableMasterSchema>;
