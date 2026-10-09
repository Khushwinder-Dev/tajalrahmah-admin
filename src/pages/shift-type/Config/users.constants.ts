export const blank_country = {
  code: "",
  name: "",
  name_in_bangla: "",
  name_in_arabic: "",
  flag: null as unknown as string,
  draft: false,
  is_active: true,
  is_default: false,
};

export const statusConfig = {
  active: {
    is_active: "1",
    draft: "0",
    is_deleted: "0",
    message: "Currency Activated Successfully.",
  },
  inactive: {
    is_active: "0",
    draft: "1",
    is_deleted: "0",
    message: "Currency InActivated Successfully.",
  },
  draft: {
    is_active: "0",
    draft: "1",
    is_deleted: "0",
    message: "Currency Drafted Successfully.",
  },
  delete: {
    is_active: "0",
    draft: "0",
    is_deleted: "1",
    message: "Currency Deleted Successfully.",
  },
};

export const confirmMessages = {
  active: {
    title: "Are you sure?",
    text: "You are about to activate this country.",
    confirmButtonText: "Yes, activate it!",
  },
  inactive: {
    title: "Are you sure?",
    text: "You are about to inactivate this country.",
    confirmButtonText: "Yes, inactivate it!",
  },
  draft: {
    title: "Are you sure?",
    text: "You are about to draft this country.",
    confirmButtonText: "Yes, draft it!",
  },
  delete: {
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    confirmButtonText: "Yes, delete it!",
  },
};


// Constant data moved outside component for better performance
export const RATING_OPTIONS = [1, 2, 3, 4, 5].map((num) => ({
  value: String(num),
  label: "★".repeat(num),
}));

