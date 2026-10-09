export type StateData = {
  id?: string;
  code: string;
  State: string;
  Country_name?: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null | string;
  draftedAt: Date | null | string;
  updatedAt: Date | null | string;
  deletedAt: Date | null | string;
  isDeleted: boolean;
  name?: string;
  name_in_bangla?: string;
  name_in_arabic?: string;
  country_name?: string;
  status?: string;
};

export type StatesList = {
  totalStates: number;
  totalDraft: number;
  totalInactive: number;
  totalActive: number;
  totalUpdated: number;
  totalDeleted: number;
  list: StateData[];
};

export type StateResponse = {
  data: StateData;
  message: string;
  success: boolean;
};

export type StatesResponse = {
  data: StatesList;
  message: string;
  success: boolean;
};
