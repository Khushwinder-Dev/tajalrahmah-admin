// import * as yup from "yup";
// import { categorySchema } from "../pages/Categories/Config/schemas/categories.schemas";
// import { warehouseSchema } from "../Schemas/warehouse.schemas";

// export type TWarehouse = {
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

// export type TWarehouseList = {
//     totalWarehouses: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TWarehouse[];
// }

// export type TWarehouseResponse = {
//     data: TWarehouse;
//     message: string;
//     success: boolean;
// };

// export type TWarehousesResponse = {
//     data: TWarehouseList;
//     message: string;
//     success: boolean;
// };

// export type TWarehousesFormValues = yup.InferType<typeof warehouseSchema>;
