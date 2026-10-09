// TFilter for query filter
export type TFilter = {
  key: string;
  value: string | number | boolean | null;
};

// TErrorResponse type for error
export type TErrorResponse = {
  error: { data: { message: string } };
};
