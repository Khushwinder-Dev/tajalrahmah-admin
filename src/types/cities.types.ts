// import * as yup from "yup";
// import { citySchema } from "../Schemas/cities.schemas";

// export type TCity = {
//   id: number;
//   code: string;
//   name: string;
//   name_in_bangla: string;
//   name_in_arabic: string;
//   country_id: number | string | null;
//   state_id: number | string | null;
//   is_default: number | boolean;
//   draft: number | boolean;
//   is_active: number | boolean;
//   is_deleted: number | boolean;
//   is_delete?: number | boolean;
//   created_at: string;
//   updated_at: string;
//   drafted_at: string;
//   deleted_at: string | null;
//   country_name: string;
//   state_name: string;
// };

// export type TCitiesList = {
//   totalCities: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TCity[];
// };

// export type TCityResponse = {
//   data: TCity;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TCitiesResponse = {
//   data?: TCitiesList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TCityFormValues = yup.InferType<typeof citySchema>;

export type TCity = {
  code: string;
  City: string;
  Country: string[];
  State: string[];
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};
