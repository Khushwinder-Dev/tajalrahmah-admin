/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ChartOfAccountsDetails.tsx
import { useState, useEffect, useRef } from "react";
import { Card, Text, TextInput, Textarea, Badge } from "@mantine/core";
// import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import EditableInput from "@/components/common/EditableInput";
import { Autocomplete } from "@/components/common/Autocomplete";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import HierarchicalChart from "./Chart";
import MainChart from "./MainChart";
import { mockChartOfAccounts } from "@/mockData/chart-of-account-main";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddLevel4Account from "./AddLevel4Account"; // Import the new component

interface AccountDetails {
  id: string;
  name: string;
  accountNumber: string;
  accountType: "dr" | "cr";
  balance: number;
  description?: string;
  name_ar?: string;
  name_hi?: string;
  name_ur?: string;
  name_bn?: string;
  isDeleted?: boolean;
}

interface SelectedAccount {
  level: 1 | 2 | 3 | 4;
  accountId: string;
  level1Id: string;
  level2Id?: string;
  level3Id?: string;
}

interface ChartOfAccountsDetailsProps {
  isAddNewLevel4Account: boolean;
  setIsAddNewLevel4Account: (value: boolean) => void;
  selectedAccount: SelectedAccount | null;
  chartData: any;
  setSelectedAccount: (account: SelectedAccount | null) => void;
  selectedLevel1: string;
  accountDetails: any;
  onUpdateAccount: (
    accountId: string,
    updates: Partial<AccountDetails>
  ) => void;
  onAddLevel4Account?: (
    level1Id: string,
    level2Id: string,
    level3Id: string,
    accountData: {
      name: string;
      accountNumber: string;
      accountType: "dr" | "cr";
      balance: number;
      description?: string;
      name_ar?: string;
      name_hi?: string;
      name_ur?: string;
      name_bn?: string;
    }
  ) => void;
}

const ChartOfAccountsDetails: React.FC<ChartOfAccountsDetailsProps> = ({
  isAddNewLevel4Account,
  setIsAddNewLevel4Account,
  selectedAccount,
  chartData,
  setSelectedAccount,
  selectedLevel1,
  accountDetails,
  onAddLevel4Account,
}) => {
  console.log("selectedLevel1 in details ", selectedLevel1);
  const [formData, setFormData] = useState<Partial<AccountDetails>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [, setHasChanges] = useState(false);
  const [accountLanguageValues, setAccountLanguageValues] = useState<
    Record<string, string>
  >({});
  const [isDeletedState, setIsDeletedState] = useState<"Delete" | "Restore">(
    "Restore"
  );

  // Refs for input navigation
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  useEffect(() => {
    if (accountDetails) {
      setFormData({
        name: accountDetails.name,
        accountNumber: accountDetails.accountNumber,
        accountType: accountDetails.accountType,
        balance: accountDetails.balance,
        description: accountDetails.description || "",
        name_ar: accountDetails.name_ar || "",
        name_hi: accountDetails.name_hi || "",
        name_ur: accountDetails.name_ur || "",
        name_bn: accountDetails.name_bn || "",
        isDeleted: accountDetails.isDeleted || false,
      });

      setAccountLanguageValues({
        ar: accountDetails.name_ar || "",
        hi: accountDetails.name_hi || "",
        ur: accountDetails.name_ur || "",
        bn: accountDetails.name_bn || "",
      });

      setIsDeletedState(accountDetails.isDeleted ? "Delete" : "Restore");
      setIsEditing(false);
      setHasChanges(false);
    } else {
      setFormData({});
      setAccountLanguageValues({});
      setIsDeletedState("Restore");
      setIsEditing(false);
      setHasChanges(false);
    }
  }, [accountDetails]);

  const handleInputChange = (field: keyof AccountDetails, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
  };

  if (!selectedAccount) {
    return (
      <div className="h-full flex items-center justify-center dark:bg-gray-800">
        <MainChart data={mockChartOfAccounts} />
      </div>
    );
  }

  if (selectedAccount.level !== 4 && selectedAccount.level !== 3) {
    return (
      <HierarchicalChart
        data={chartData}
        selectedLevel1={selectedLevel1}
        setSelectedAccount={setSelectedAccount}
      />
    );
  }

  // Level 3 account view with option to add Level 4 accounts
  if (isAddNewLevel4Account) {
    return (
      <AddLevel4Account
        selectedAccount={selectedAccount}
        chartData={chartData}
        onAddLevel4Account={onAddLevel4Account}
        onCancel={() => setIsAddNewLevel4Account(false)}
      />
    );
  }

  if (!accountDetails) {
    return (
      <div className="h-full flex items-center justify-center dark:bg-gray-800">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <Text size="lg" className="text-gray-600 mb-2">
            Account Not Found
          </Text>
          <Text size="sm" className="text-gray-500">
            The selected account could not be loaded
          </Text>
        </div>
      </div>
    );
  }

  // Level 4 account view (existing code)
  return (
    <div className="h-full flex flex-col min-w-[600px] rounded-full dark:bg-gray-800">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0 smooth-scroll">
        <div className="min-w-[800px] pb-4">
          {/* First Row: Four Editable Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 p-4 bg-white rounded-3xl border">
            <Text
              size="lg"
              fw={600}
              className="md:col-span-12 mb-4 text-blue-800"
            >
              Edit Level 4 Account Fields
            </Text>

            {/* Account Number */}
            <div className="md:col-span-3 space-y-2">
              <EditableInput
                setRef={setRef("accountNumber")}
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber || ""}
                onChange={handleChange}
                onNext={() => focusNextInput("accountName")}
                onCancel={() =>
                  setFormData({
                    ...formData,
                    accountNumber: accountDetails.accountNumber,
                  })
                }
                labelText="Account Number"
                tooltipText="Enter the unique account number"
                required
              />
            </div>

            {/* Account Name */}
            <div className="md:col-span-3 space-y-2">
              <div className="relative">
                <EditableInput
                  setRef={setRef("accountName")}
                  id="accountName"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("accountType")}
                  onCancel={() =>
                    setFormData({ ...formData, name: accountDetails.name })
                  }
                  labelText="Account Name"
                  tooltipText="Enter the account name"
                  required
                />

                {/* Language Input Dropdown */}
                <LanguageInputDropdown
                  onSubmit={(values) => {
                    setAccountLanguageValues(values);
                    console.log("Account translations:", values);
                    setFormData((prev) => ({
                      ...prev,
                      name_ar: values.ar || "",
                      name_hi: values.hi || "",
                      name_ur: values.ur || "",
                      name_bn: values.bn || "",
                    }));
                    setHasChanges(true);
                    setTimeout(() => {
                      focusNextInput("accountType");
                    }, 100);
                  }}
                  title="Account Name"
                  initialValues={accountLanguageValues}
                />
              </div>
            </div>

            {/* Account Type */}
            <div className="md:col-span-3 space-y-2">
              <Autocomplete
                ref={(el: any) => setRef("accountType")(el)}
                id="accountType"
                name="accountType"
                options={["Debit (DR)", "Credit (CR)"]}
                value={
                  formData.accountType === "dr" ? "Debit (DR)" : "Credit (CR)"
                }
                labelClassName="rounded-lg"
                isSelectableOnly={true}
                onValueChange={(value: string) => {
                  const accountType = value === "Debit (DR)" ? "dr" : "cr";
                  setFormData((prev) => ({
                    ...prev,
                    accountType: accountType as "dr" | "cr",
                  }));
                  setHasChanges(true);
                  focusNextInput("isDeleted");
                }}
                onEnterPress={() => {
                  focusNextInput("isDeleted");
                }}
                placeholder=" "
                labelText="Account Type"
                className="relative"
                styles={{
                  input: {
                    borderColor: "var(--primary)",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />
            </div>

            {/* Status (Delete/Restore) */}
            <div className="md:col-span-3 space-y-2">
              <Autocomplete
                ref={(el: any) => setRef("isDeleted")(el)}
                id="isDeleted"
                name="isDeleted"
                labelText="Status"
                isSelectableOnly={true}
                options={["Delete", "Restore"]}
                value={isDeletedState}
                onValueChange={(value: "Delete" | "Restore") => {
                  if (value === "Delete" || value === "Restore") {
                    setIsDeletedState(value);
                    const newValue = value === "Delete";
                    setFormData((prev) => ({
                      ...prev,
                      isDeleted: newValue,
                    }));
                    setHasChanges(true);
                  }
                }}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    focusNextInput("balance");
                  }
                }}
                placeholder=" "
                styles={{
                  input: {
                    borderColor: "var(--primary)",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="p-4 rounded-3xl!" withBorder>
              <Text size="lg" fw={600} mb={4}>
                Basic Information
              </Text>

              <div className="space-y-4">
                <div>
                  <Text size="sm" fw={500} mb={1}>
                    Account Number
                  </Text>
                  {isEditing ? (
                    <TextInput
                      value={formData.accountNumber || ""}
                      onChange={(e) =>
                        handleInputChange("accountNumber", e.target.value)
                      }
                      placeholder="Enter account number"
                    />
                  ) : (
                    <Text size="sm" className="p-2 bg-gray-50 rounded">
                      {accountDetails.accountNumber}
                    </Text>
                  )}
                </div>

                <div>
                  <Text size="sm" fw={500} mb={1}>
                    Account Name
                  </Text>
                  {isEditing ? (
                    <TextInput
                      value={formData.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter account name"
                    />
                  ) : (
                    <Text size="sm" className="p-2 bg-gray-50 rounded">
                      {accountDetails.name}
                    </Text>
                  )}
                </div>

                <div>
                  <Text size="sm" fw={500} mb={1}>
                    Account Type
                  </Text>
                  {isEditing ? (
                    <Select
                      value={formData.accountType || ""}
                      onValueChange={(value: string) =>
                        handleInputChange("accountType", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr">Debit (DR)</SelectItem>
                        <SelectItem value="cr">Credit (CR)</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2">
                      {accountDetails.accountType === "dr" ? (
                        <TrendingUp size={16} className="text-blue-600" />
                      ) : (
                        <TrendingDown size={16} className="text-red-600" />
                      )}
                      <Badge
                        color={
                          accountDetails.accountType === "dr" ? "blue" : "red"
                        }
                        variant="light"
                      >
                        {accountDetails.accountType === "dr"
                          ? "Debit (DR)"
                          : "Credit (CR)"}
                      </Badge>
                    </div>
                  )}
                </div>

                <div>
                  <Text size="sm" fw={500} mb={1}>
                    Current Balance
                  </Text>
                  <div className="flex items-center gap-2">
                    <Text
                      size="lg"
                      fw={600}
                      className={
                        accountDetails.balance >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      ${accountDetails.balance.toLocaleString()}
                    </Text>
                  </div>
                </div>

                <div>
                  <Text size="sm" fw={500} mb={1}>
                    Status
                  </Text>
                  <div className="flex items-center gap-2">
                    <Badge
                      color={formData.isDeleted ? "red" : "green"}
                      variant="light"
                    >
                      {formData.isDeleted ? "Deleted" : "Active"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-4 md:col-span-1 rounded-3xl!" withBorder>
              <Text size="lg" fw={600} mb={4}>
                Description
              </Text>

              {isEditing ? (
                <Textarea
                  ref={(el) => setRef("description")(el as HTMLElement)}
                  value={formData.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Enter account description"
                  minRows={3}
                  maxRows={6}
                />
              ) : (
                <Text size="sm" className="p-3 bg-gray-50 rounded min-h-[80px]">
                  {accountDetails.description || "No description provided"}
                </Text>
              )}
            </Card>

            {/* Multilingual Names - Only show in edit mode */}
            {isEditing && (
              <Card className="p-4 md:col-span-2 rounded-3xl!" withBorder>
                <Text size="lg" fw={600} mb={4}>
                  Multilingual Names
                </Text>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Text size="sm" fw={500} mb={1}>
                      Arabic Name
                    </Text>
                    <TextInput
                      value={formData.name_ar || ""}
                      onChange={(e) =>
                        handleInputChange("name_ar", e.target.value)
                      }
                      placeholder="Enter Arabic name"
                    />
                  </div>
                  <div>
                    <Text size="sm" fw={500} mb={1}>
                      Hindi Name
                    </Text>
                    <TextInput
                      value={formData.name_hi || ""}
                      onChange={(e) =>
                        handleInputChange("name_hi", e.target.value)
                      }
                      placeholder="Enter Hindi name"
                    />
                  </div>
                  <div>
                    <Text size="sm" fw={500} mb={1}>
                      Urdu Name
                    </Text>
                    <TextInput
                      value={formData.name_ur || ""}
                      onChange={(e) =>
                        handleInputChange("name_ur", e.target.value)
                      }
                      placeholder="Enter Urdu name"
                    />
                  </div>
                  <div>
                    <Text size="sm" fw={500} mb={1}>
                      Bengali Name
                    </Text>
                    <TextInput
                      value={formData.name_bn || ""}
                      onChange={(e) =>
                        handleInputChange("name_bn", e.target.value)
                      }
                      placeholder="Enter Bengali name"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Account Hierarchy */}
            <Card className="p-4 md:col-span-2 rounded-3xl!" withBorder>
              <Text size="lg" fw={600} mb={4}>
                Account Hierarchy
              </Text>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Text fw={500}>Level 1</Text>
                <Text>→</Text>
                <Text fw={500}>Level 2</Text>
                <Text>→</Text>
                <Text fw={500}>Level 3</Text>
                <Text>→</Text>
                <Badge color="blue" variant="light">
                  {accountDetails.name} (Level 4)
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOfAccountsDetails;
