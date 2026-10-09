// import * as yup from "yup";
// import { supplierSchema } from "../pages/Suppliers/Config/schemas/suppliers.schemas";

// export type TSupplier = {
//     id?: number;
//     code?: string;
//     name: string;
//     company_name: string;
//     vat_number: string | null;
//     phone: string | null;
//     website: string | null;
//     currency: number;
//     country: number;
//     default_language: string;
//     name_in_bangla?: string;
//     name_in_arabic?: string;
//     street: string | null;
//     city: string | null;
//     state: string | null;
//     zip: string | null;
//     draft: number;
//     is_active: number;
//     is_deleted: number;
//     is_default: number;
//     created_at: string;
//     updated_at: string;
//     drafted_at: string;
//     deleted_at: string | null;
// }

// export type TSupplierList = {
//     totalSuppliers: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TSupplier[];
// }

// export type TSupplierResponse = {
//     data: TSupplier;
//     message: string;
//     success: boolean;
// };

// export type TSuppliersResponse = {
//     data: TSupplierList;
//     message: string;
//     success: boolean;
// };

// export type TSupplierFormValues = yup.InferType<typeof supplierSchema>;
