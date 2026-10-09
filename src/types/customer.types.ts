// import * as yup from "yup";
// import { customerSchema } from "../pages/Customers/Config/schemas/customers.schemas";

// export type TCustomer = {
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

// export type TCustomersList = {
//     totalCustomer: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TCustomer[];
// }

// export type TCustomerResponse = {
//     data: TCustomer;
//     message: string;
//     success: boolean;
// };

// export type TCustomersResponse = {
//     data: TCustomersList;
//     message: string;
//     success: boolean;
// };

// export type TCustomerFormValues = yup.InferType<typeof customerSchema>;
