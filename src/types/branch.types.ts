// import * as yup from "yup";
// import { binSchema } from "../pages/Bin/Config/bin.schemas";

// export type TBranch = {
//   id?: number;
//   name: string;
//   code: string;
//   name_in_bangla: string | null;
//   name_in_arabic: string | null;
//   draft: number | boolean | null;
//   is_active: number | boolean | null;
//   is_deleted: number | boolean | null;
//   is_delete?: number | boolean | null;
//   is_default: number | boolean | null;
//   created_at?: string;
//   updated_at?: string;
//   drafted_at?: string | null;
//   deleted_at?: string | null;
// };

// export type TBranchList = {
//   totalBranches: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TBranch[];
// };

// export type TBranchResponse = {
//   data: TBranch;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TBranchesResponse = {
//   data?: TBranchList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TBranchFormValues = yup.InferType<typeof binSchema>;

// Branch interface to ensure type consistency
export interface Branch {
  id: string;
  code: string;
  name: string;
  taxNumber: string;
  phone: string;
  fax: string;
  mobile: string;
  email: string;
  website: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postCode: string;
  bankDetails: string;
  logo: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}
