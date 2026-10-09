import * as yup from "yup";
import { countrySchema } from "@/pages/Country/Config/countries.schemas";

export type TCountry = {
  id?: number;
  code: string;
  name: string;
  name_in_bangla: string;
  name_in_arabic: string;
  is_default: number | boolean;
  draft: number | boolean;
  is_active: number | boolean;
  is_deleted: number | boolean;
  is_delete?: number | boolean;
  created_at: string;
  updated_at: string;
  drafted_at: string;
  deleted_at: string | null;
  flag: string | null;
};

export type TCountriesList = {
  totalCountries: number;
  totalDraft: number;
  totalInactive: number;
  totalActive: number;
  totalUpdated: number;
  totalDeleted: number;
  list: TCountry[];
};

export type TCountryResponse = {
  data: TCountry;
  error?: { data: { message: string } };
  message: string;
  success: boolean;
};

export type TCountriesResponse = {
  data?: TCountriesList;
  error?: { data: { message: string } };
  message: string;
  success: boolean;
};

export type TCountryFormValues = yup.InferType<typeof countrySchema>;
