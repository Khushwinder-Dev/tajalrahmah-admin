export type UserMasterData = {
  id?: string;
  name: string;
  mobileNumber: string;
  countryCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  code: string;
  state: string;
  country: string;
  userType: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
  status: string;
};

export type UserMasterList = {
  totalUserMasters: number;
  totalDraft: number;
  totalInactive: number;
  totalActive: number;
  totalUpdated: number;
  totalDeleted: number;
  list: UserMasterData[];
};

export type UserMasterResponse = {
  data: UserMasterData;
  message: string;
  success: boolean;
};

export type UserMastersResponse = {
  data: UserMasterList;
  message: string;
  success: boolean;
};
