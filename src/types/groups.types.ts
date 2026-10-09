// import * as yup from "yup";
// import { groupSchema } from "../pages/Group/Config/group.schemas";

// type TCountryPivot = {
//   admin_group_id: number;
//   country_id: number;
//   created_at: string;
//   updated_at: string;
// };

// type TGroupCountry = {
//   id: number;
//   name: string;
//   pivot: TCountryPivot;
// };

// export type TGroup = {
//   id?: number;
//   code: string;
//   english: string;
//   arabic: string | null;
//   bengali: string | null;
//   group_name: string;
//   is_default: number | boolean;
//   is_draft: number | boolean | string;
//   is_active: number | boolean;
//   is_deleted: number | boolean;
//   drafted_at: string;
//   flag: string | null;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string;
//   country_id?: string[];
//   countries: TGroupCountry[];
// };

// export type TGroupList = {
//   totalGroups: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TGroup[];
// };

// export type TGroupResponse = {
//   data: TGroup;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TGroupsResponse = {
//   data?: TGroupList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TGroupFormValues = yup.InferType<typeof groupSchema>;
