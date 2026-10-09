// types.ts
export interface Level4Account {
  id: string;
  name: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  description: string;
}

export interface Level3Account {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  level4Accounts?: Level4Account[];
}

export interface Level2Account {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  level3Accounts: Level3Account[];
}

export interface AccountData {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  accountType: string;
  level2Accounts: Level2Account[];
}

// In your types file (@/types/chart-of-accounts)
export interface TreeNodeData {
  name: string;
  attributes?: {
    id: string;
    accountNumber: string;
    accountType?: string;
    balance?: number;
    description?: string;
    level?: number;
  };
  children?: TreeNodeData[];
}
