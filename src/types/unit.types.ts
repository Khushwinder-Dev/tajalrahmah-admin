// import * as yup from "yup";
// import { unitSchema } from "../pages/Unit/Config/schemas/unit.schemas";

// export type TUnit = {
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

// export type TUnitList = {
//     totalUnit: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TUnit[];
// }

// export type TUnitResponse = {
//     data: TUnit;
//     message: string;
//     success: boolean;
// };

// export type TUnitsResponse = {
//     data: TUnitList;
//     message: string;
//     success: boolean;
// };

// export type TUnitFormValues = yup.InferType<typeof unitSchema>;
