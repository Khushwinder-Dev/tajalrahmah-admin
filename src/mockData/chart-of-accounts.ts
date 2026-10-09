interface Level1Account {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  accountType:
    | "asset"
    | "liability"
    | "equity"
    | "revenue"
    | "expense"
    | "custom";
  level2Accounts: Level2Account[];
  serialNumber: number;
}

interface Level4Account {
  id: string;
  name: string;
  accountNumber: string;
  accountType: "dr" | "cr";
  balance: number;
  description?: string;
  serialNumber: number;
}

interface Level3Account {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  level4Accounts: Level4Account[];
  serialNumber: number;
}

interface Level2Account {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  level3Accounts: Level3Account[];
  serialNumber: number;
}

export const mockChartOfAccounts: Level1Account[] = [
  {
    id: "assets",
    name: "Assets",
    accountNumber: "1000",
    isExpanded: false,
    accountType: "asset",
    serialNumber: 1,
    level2Accounts: [
      {
        id: "current-assets",
        name: "Current Assets",
        accountNumber: "1100",
        isExpanded: false,
        serialNumber: 1,
        level3Accounts: [
          {
            id: "cash-accounts",
            name: "Cash & Cash Equivalents",
            accountNumber: "1110",
            isExpanded: false,
            serialNumber: 1,
            level4Accounts: [
              {
                id: "petty-cash",
                name: "Petty Cash",
                accountNumber: "1111",
                accountType: "dr",
                balance: 5000,
                description: "Small cash fund for minor expenses",
                serialNumber: 1,
              },
              {
                id: "checking-account",
                name: "Checking Account",
                accountNumber: "1112",
                accountType: "dr",
                balance: 150000,
                description: "Primary operating bank account",
                serialNumber: 2,
              },
              {
                id: "savings-account",
                name: "Savings Account",
                accountNumber: "1113",
                accountType: "dr",
                balance: 75000,
                description: "High-yield savings account",
                serialNumber: 3,
              },
            ],
          },
          {
            id: "accounts-receivable",
            name: "Accounts Receivable",
            accountNumber: "1120",
            isExpanded: false,
            serialNumber: 2,
            level4Accounts: [
              {
                id: "trade-receivables",
                name: "Trade Receivables",
                accountNumber: "1121",
                accountType: "dr",
                balance: 85000,
                description: "Outstanding customer invoices",
                serialNumber: 1,
              },
              {
                id: "allowance-doubtful",
                name: "Allowance for Doubtful Accounts",
                accountNumber: "1122",
                accountType: "cr",
                balance: -3000,
                description: "Provision for uncollectible accounts",
                serialNumber: 2,
              },
            ],
          },
          {
            id: "inventory",
            name: "Inventory",
            accountNumber: "1130",
            isExpanded: false,
            serialNumber: 3,
            level4Accounts: [
              {
                id: "raw-materials",
                name: "Raw Materials",
                accountNumber: "1131",
                accountType: "dr",
                balance: 45000,
                description: "Materials used in production",
                serialNumber: 1,
              },
              {
                id: "work-in-progress",
                name: "Work in Progress",
                accountNumber: "1132",
                accountType: "dr",
                balance: 22000,
                description: "Partially completed products",
                serialNumber: 2,
              },
              {
                id: "finished-goods",
                name: "Finished Goods",
                accountNumber: "1133",
                accountType: "dr",
                balance: 68000,
                description: "Completed products ready for sale",
                serialNumber: 3,
              },
            ],
          },
        ],
      },
      {
        id: "fixed-assets",
        name: "Fixed Assets",
        accountNumber: "1200",
        isExpanded: false,
        serialNumber: 2,
        level3Accounts: [
          {
            id: "property-plant-equipment",
            name: "Property, Plant & Equipment",
            accountNumber: "1210",
            isExpanded: false,
            serialNumber: 1,
            level4Accounts: [
              {
                id: "land",
                name: "Land",
                accountNumber: "1211",
                accountType: "dr",
                balance: 250000,
                description: "Commercial property land",
                serialNumber: 1,
              },
              {
                id: "buildings",
                name: "Buildings",
                accountNumber: "1212",
                accountType: "dr",
                balance: 450000,
                description: "Office and warehouse buildings",
                serialNumber: 2,
              },
              {
                id: "machinery-equipment",
                name: "Machinery & Equipment",
                accountNumber: "1213",
                accountType: "dr",
                balance: 125000,
                description: "Manufacturing and office equipment",
                serialNumber: 3,
              },
              {
                id: "vehicles",
                name: "Vehicles",
                accountNumber: "1214",
                accountType: "dr",
                balance: 65000,
                description: "Company vehicles and delivery trucks",
                serialNumber: 4,
              },
            ],
          },
          {
            id: "accumulated-depreciation",
            name: "Accumulated Depreciation",
            accountNumber: "1220",
            isExpanded: false,
            serialNumber: 2,
            level4Accounts: [
              {
                id: "accum-depr-buildings",
                name: "Accumulated Depreciation - Buildings",
                accountNumber: "1221",
                accountType: "cr",
                balance: -85000,
                description: "Accumulated depreciation on buildings",
                serialNumber: 1,
              },
              {
                id: "accum-depr-equipment",
                name: "Accumulated Depreciation - Equipment",
                accountNumber: "1222",
                accountType: "cr",
                balance: -42000,
                description: "Accumulated depreciation on equipment",
                serialNumber: 2,
              },
            ],
          },
        ],
      },
    ],
  },
  // Add other level 1 accounts with serial numbers...
  {
    id: "liabilities",
    name: "Liabilities",
    accountNumber: "2000",
    isExpanded: false,
    accountType: "liability",
    serialNumber: 2,
    level2Accounts: [],
  },
  {
    id: "equity",
    name: "Equity",
    accountNumber: "3000",
    isExpanded: false,
    accountType: "equity",
    serialNumber: 3,
    level2Accounts: [],
  },
  {
    id: "revenue",
    name: "Revenue",
    accountNumber: "4000",
    isExpanded: false,
    accountType: "revenue",
    serialNumber: 4,
    level2Accounts: [],
  },
  {
    id: "expenses",
    name: "Expenses",
    accountNumber: "5000",
    isExpanded: false,
    accountType: "expense",
    serialNumber: 5,
    level2Accounts: [],
  },
];
