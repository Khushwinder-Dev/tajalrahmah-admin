import * as Yup from "yup";

export const countrySchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Name is required"),
  name_in_bangla: Yup.string().nullable(),
  name_in_arabic: Yup.string().nullable(),
  is_default: Yup.boolean().nullable(),
  draft: Yup.boolean().nullable(),
  is_active: Yup.boolean().nullable(),
  flag: Yup.mixed().nullable(),
});
