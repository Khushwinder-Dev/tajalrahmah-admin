export interface ChartAccount {
  accountNo: string;
  accountName: string;
  level: number;
  type: "Debit" | "Credit";
  group: "TA" | "BL" | "PS";
}

export const mockChartOfAccountsData: ChartAccount[] = [
  // Level 1 - Assets (TA)
  {
    accountNo: "1001",
    accountName: "Current Assets",
    level: 1,
    type: "Debit",
    group: "TA",
  },
  {
    accountNo: "1002",
    accountName: "Fixed Assets",
    level: 1,
    type: "Debit",
    group: "TA",
  },

  // Level 2 - Current Assets
  {
    accountNo: "1001001",
    accountName: "Cash and Bank",
    level: 2,
    type: "Debit",
    group: "TA",
  },
  {
    accountNo: "1001002",
    accountName: "Accounts Receivable",
    level: 2,
    type: "Debit",
    group: "TA",
  },
  {
    accountNo: "1001003",
    accountName: "Inventory",
    level: 2,
    type: "Debit",
    group: "TA",
  },

  // Level 3 - Cash and Bank
  {
    accountNo: "1001001001",
    accountName: "Cash in Hand",
    level: 3,
    type: "Debit",
    group: "TA",
  },
  {
    accountNo: "1001001002",
    accountName: "Bank - ABC Bank",
    level: 3,
    type: "Debit",
    group: "TA",
  },
  {
    accountNo: "1001001003",
    accountName: "Bank - XYZ Bank",
    level: 3,
    type: "Debit",
    group: "TA",
  },

  // Level 4 - Cash Details
  {
    accountNo: "1001001001001",
    accountName: "Petty Cash",
    level: 4,
    type: "Debit",
    group: "TA",
  },
  {
    accountNo: "1001001001002",
    accountName: "Cash Register",
    level: 4,
    type: "Debit",
    group: "TA",
  },

  // Level 2 - Fixed Assets
  {
    accountNo: "1002001",
    accountName: "Land and Building",
    level: 2,
    type: "Debit",
    group: "TA",
  },
  {
    accountNo: "1002002",
    accountName: "Machinery",
    level: 2,
    type: "Debit",
    group: "TA",
  },
  {
    accountNo: "1002003",
    accountName: "Furniture and Fixtures",
    level: 2,
    type: "Debit",
    group: "TA",
  },

  // Level 1 - Liabilities (BL)
  {
    accountNo: "2001",
    accountName: "Current Liabilities",
    level: 1,
    type: "Credit",
    group: "BL",
  },
  {
    accountNo: "2002",
    accountName: "Long-term Liabilities",
    level: 1,
    type: "Credit",
    group: "BL",
  },

  // Level 2 - Current Liabilities
  {
    accountNo: "2001001",
    accountName: "Accounts Payable",
    level: 2,
    type: "Credit",
    group: "BL",
  },
  {
    accountNo: "2001002",
    accountName: "Accrued Expenses",
    level: 2,
    type: "Credit",
    group: "BL",
  },
  {
    accountNo: "2001003",
    accountName: "Short-term Loans",
    level: 2,
    type: "Credit",
    group: "BL",
  },

  // Level 3 - Accounts Payable
  {
    accountNo: "2001001001",
    accountName: "Trade Creditors",
    level: 3,
    type: "Credit",
    group: "BL",
  },
  {
    accountNo: "2001001002",
    accountName: "Other Creditors",
    level: 3,
    type: "Credit",
    group: "BL",
  },

  // Level 1 - Equity (PS)
  {
    accountNo: "3001",
    accountName: "Share Capital",
    level: 1,
    type: "Credit",
    group: "PS",
  },
  {
    accountNo: "3002",
    accountName: "Retained Earnings",
    level: 1,
    type: "Credit",
    group: "PS",
  },

  // Level 2 - Share Capital
  {
    accountNo: "3001001",
    accountName: "Ordinary Shares",
    level: 2,
    type: "Credit",
    group: "PS",
  },
  {
    accountNo: "3001002",
    accountName: "Preference Shares",
    level: 2,
    type: "Credit",
    group: "PS",
  },

  // Level 1 - Revenue (PS)
  {
    accountNo: "4001",
    accountName: "Sales Revenue",
    level: 1,
    type: "Credit",
    group: "PS",
  },
  {
    accountNo: "4002",
    accountName: "Other Income",
    level: 1,
    type: "Credit",
    group: "PS",
  },

  // Level 2 - Sales Revenue
  {
    accountNo: "4001001",
    accountName: "Product Sales",
    level: 2,
    type: "Credit",
    group: "PS",
  },
  {
    accountNo: "4001002",
    accountName: "Service Revenue",
    level: 2,
    type: "Credit",
    group: "PS",
  },

  // Level 1 - Expenses (PS)
  {
    accountNo: "5001",
    accountName: "Cost of Goods Sold",
    level: 1,
    type: "Debit",
    group: "PS",
  },
  {
    accountNo: "5002",
    accountName: "Operating Expenses",
    level: 1,
    type: "Debit",
    group: "PS",
  },

  // Level 2 - Operating Expenses
  {
    accountNo: "5002001",
    accountName: "Salaries and Wages",
    level: 2,
    type: "Debit",
    group: "PS",
  },
  {
    accountNo: "5002002",
    accountName: "Rent Expense",
    level: 2,
    type: "Debit",
    group: "PS",
  },
  {
    accountNo: "5002003",
    accountName: "Utilities Expense",
    level: 2,
    type: "Debit",
    group: "PS",
  },

  // Level 3 - Salaries and Wages
  {
    accountNo: "5002001001",
    accountName: "Basic Salary",
    level: 3,
    type: "Debit",
    group: "PS",
  },
  {
    accountNo: "5002001002",
    accountName: "Overtime Pay",
    level: 3,
    type: "Debit",
    group: "PS",
  },
  {
    accountNo: "5002001003",
    accountName: "Bonus",
    level: 3,
    type: "Debit",
    group: "PS",
  },
];
