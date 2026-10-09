// import * as yup from "yup";
// import { areaSchema } from "../pages/Areas/Config/areas.schemas";

// export type TArea = {
//   id?: number;
//   code: string;
//   name: string;
//   name_in_bangla: string | null;
//   name_in_arabic: string | null;
//   city_id: string;
//   country_id: string;
//   state_id: string;
//   drafted_at: string;
//   draft: number | boolean | null;
//   is_active: number | boolean | null;
//   is_deleted: number | boolean | null;
//   is_delete?: number | boolean | null;
//   is_default: number | boolean | null;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string | null;
//   country_name: string;
//   state_name: string;
//   city_name: string;
// };

// export type TAreaList = {
//   totalAreas: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TArea[];
// };

// export type TAreaResponse = {
//   data: TArea;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TAreasResponse = {
//   data?: TAreaList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TAreaFormValues = yup.InferType<typeof areaSchema>;

export type AreaData = {
  id?: string;
  code: string;
  Area: string;
  Country: string;
  State: string;
  City: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

export type AreasList = {
  totalAreas: number;
  totalDraft: number;
  totalInactive: number;
  totalActive: number;
  totalUpdated: number;
  totalDeleted: number;
  list: AreaData[];
};

export type AreaResponse = {
  data: AreaData;
  message: string;
  success: boolean;
};

export type AreasResponse = {
  data: AreasList;
  message: string;
  success: boolean;
};
