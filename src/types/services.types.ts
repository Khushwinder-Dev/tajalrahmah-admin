// import * as yup from "yup";
// import { servicesSchema } from "../pages/Services/Config/services.schemas";

// export type TService = {
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

// export type TServicesList = {
//     totalServices: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TService[];
// }

// export type TServiceResponse = {
//     data: TService;
//     message: string;
//     success: boolean;
// };

// export type TServicesResponse = {
//     data: TServicesList;
//     message: string;
//     success: boolean;
// };

// export type TServicesFormValues = yup.InferType<typeof servicesSchema>;
