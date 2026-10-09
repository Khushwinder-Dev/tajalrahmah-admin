/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Text } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import EditableInput from "@/components/common/EditableInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectedAccount {
  level: 1 | 2 | 3 | 4;
  accountId: string;
  level1Id: string;
  level2Id?: string;
  level3Id?: string;
}

interface AddLevel4AccountProps {
  selectedAccount: SelectedAccount | null;
  chartData: any;
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
  onCancel: () => void;
}

const AddLevel4Account: React.FC<AddLevel4AccountProps> = ({
  selectedAccount,
  chartData,
  onAddLevel4Account,
  onCancel,
}) => {
  // New Level 4 Account States
  const [newAccountData, setNewAccountData] = useState({
    name: "",
    accountNumber: "",
    accountType: "dr" as "dr" | "cr",
    accountGroup: "Assets" as
      | "Assets"
      | "Liability"
      | "Equity"
      | "Revenue"
      | "Expense",
    accountLevel: 4,
    status: "Active" as "Active" | "Inactive" | "Delete",
    balance: 0,
    description: "",
    name_ar: "",
    name_hi: "",
    name_ur: "",
    name_bn: "",
  });
  const [newAccountLanguageValues, setNewAccountLanguageValues] = useState<
    Record<string, string>
  >({});

  // Permission state (you can set this based on user permissions)
  const [hasPermission] = useState(true);

  // Popover states
  const [accountTypePopoverOpen, setAccountTypePopoverOpen] = useState(false);
  const [accountGroupPopoverOpen, setAccountGroupPopoverOpen] = useState(false);
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);

  // Refs for input navigation
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };

  const focusNextInput = (nextField: string) => {
    if (nextField === "submit") {
      submitButtonRef.current?.focus();
    } else {
      inputRefs.current[nextField]?.focus();
    }
  };

  // Get parent account group to set defaults
  const getParentAccountGroup = (): string => {
    if (!selectedAccount) return "Assets";

    const level1Account = chartData?.find(
      (l1: any) => l1.id === selectedAccount.level1Id
    );

    if (level1Account) {
      switch (level1Account.accountType) {
        case "asset":
          return "Assets";
        case "liability":
          return "Liability";
        case "equity":
          return "Equity";
        case "revenue":
          return "Revenue";
        case "expense":
          return "Expense";
        default:
          return "Assets";
      }
    }
    return "Assets";
  };

  // Set defaults based on parent account
  useEffect(() => {
    if (selectedAccount) {
      const parentGroup = getParentAccountGroup();
      const defaultAccountType =
        parentGroup === "Assets" || parentGroup === "Expense" ? "dr" : "cr";

      setNewAccountData((prev) => ({
        ...prev,
        accountGroup: parentGroup as any,
        accountType: defaultAccountType,
      }));
    }
  }, [selectedAccount]);

  // New Account Functions
  const handleNewAccountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetNewAccountForm = () => {
    const parentGroup = getParentAccountGroup();
    const defaultAccountType =
      parentGroup === "Assets" || parentGroup === "Expense" ? "dr" : "cr";

    setNewAccountData({
      name: "",
      accountNumber: "",
      accountType: defaultAccountType,
      accountGroup: parentGroup as any,
      accountLevel: 4,
      status: "Active",
      balance: 0,
      description: "",
      name_ar: "",
      name_hi: "",
      name_ur: "",
      name_bn: "",
    });
    setNewAccountLanguageValues({});
  };

  const handleAddNewAccount = () => {
    if (!selectedAccount || selectedAccount.level !== 3) return;
    if (!newAccountData.name.trim() || !newAccountData.accountNumber.trim()) {
      alert("Please fill in required fields (Account Name and Account Number)");
      return;
    }

    if (onAddLevel4Account) {
      onAddLevel4Account(
        selectedAccount.level1Id,
        selectedAccount.level2Id!,
        selectedAccount.accountId,
        {
          ...newAccountData,
          ...newAccountLanguageValues,
        }
      );

      resetNewAccountForm();
      onCancel();
    }
  };

  const handleCancelNewAccount = () => {
    resetNewAccountForm();
    onCancel();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Section 1: Sticky Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Text size="lg" fw={600} className="text-blue-800">
            Add New Level 4 Account
          </Text>
        </div>
      </div>

      {/* Section 2: Scrollable Middle Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 min-h-[60vh]">
        {/* First Row: Account Name, Account Number, Account Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Account Name */}
          <div className="col-span-1">
            <div className="relative">
              <EditableInput
                setRef={setRef("accountName")}
                id="accountName"
                name="name"
                value={newAccountData.name}
                onChange={handleNewAccountInputChange}
                onNext={() => focusNextInput("accountNumber")}
                onCancel={() =>
                  setNewAccountData((prev) => ({ ...prev, name: "" }))
                }
                labelText="Account Name"
                tooltipText="Enter the account name"
                required
                disabled={!hasPermission}
              />

              {hasPermission && (
                <LanguageInputDropdown
                  onSubmit={(values) => {
                    setNewAccountLanguageValues(values);
                    setNewAccountData((prev) => ({
                      ...prev,
                      name_ar: values.ar || "",
                      name_hi: values.hi || "",
                      name_ur: values.ur || "",
                      name_bn: values.bn || "",
                    }));
                    setTimeout(() => {
                      focusNextInput("accountNumber");
                    }, 100);
                  }}
                  title="Account Name"
                  initialValues={newAccountLanguageValues}
                />
              )}
            </div>
          </div>

          {/* Account Number */}
          <div className="col-span-1">
            <div className="flex gap-2 w-full">
              <div className="flex-1">
                <EditableInput
                  setRef={setRef("accountNumber")}
                  id="accountNumber"
                  name="accountNumber"
                  value={newAccountData.accountNumber}
                  onChange={handleNewAccountInputChange}
                  onNext={() => focusNextInput("accountGroup")}
                  onCancel={() =>
                    setNewAccountData((prev) => ({
                      ...prev,
                      accountNumber: "",
                    }))
                  }
                  labelText="Account Number"
                  tooltipText="Enter the unique account number"
                  required
                  disabled={!hasPermission}
                />
              </div>
            </div>
          </div>

          {/* Account Level (Read Only) */}
          <div className="col-span-1">
            <div className="flex gap-2 w-full">
              <div className="flex-1">
                <EditableInput
                  setRef={setRef("accountLevel")}
                  id="accountLevel"
                  name="accountLevel"
                  value="4"
                  onChange={() => {}} // Read only
                  onNext={() => {
                    // Open Account Type popover
                    setAccountTypePopoverOpen(true);
                    setTimeout(() => {
                      inputRefs.current["accountType"]?.focus();
                    }, 100);
                  }}
                  labelText="Account Level"
                  tooltipText="Account level is fixed at 4"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Account Group, Account Type, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Account Group Popover */}
          <div className="col-span-1">
            <div className="relative w-full z-0">
              <div className="relative">
                <Popover
                  open={accountGroupPopoverOpen}
                  onOpenChange={setAccountGroupPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <div
                      ref={(el) => setRef("accountGroup")(el)}
                      tabIndex={0}
                      className={cn(
                        "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#f8fafc] rounded-[12px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer h-[50px] focus:border-primary border-1 focus:border-2 cursor-pointer",
                        !hasPermission && "opacity-50 cursor-not-allowed"
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (hasPermission) {
                            if (accountGroupPopoverOpen) {
                              setAccountGroupPopoverOpen(false);
                              setAccountTypePopoverOpen(true);
                              setTimeout(() => {
                                inputRefs.current["accountType"]?.focus();
                              }, 100);
                            } else {
                              setAccountGroupPopoverOpen(true);
                            }
                          } else {
                            setAccountTypePopoverOpen(true);
                            setTimeout(() => {
                              inputRefs.current["accountType"]?.focus();
                            }, 100);
                          }
                        }
                        if (e.key === "Tab" && !e.shiftKey) {
                          e.preventDefault();
                          setAccountGroupPopoverOpen(false);
                          setAccountTypePopoverOpen(true);
                          setTimeout(() => {
                            inputRefs.current["accountType"]?.focus();
                          }, 100);
                        }
                      }}
                      onClick={() => {
                        if (hasPermission) {
                          setAccountGroupPopoverOpen(!accountGroupPopoverOpen);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between h-full pt-2">
                        <span className="truncate text-sm">
                          {newAccountData.accountGroup}
                        </span>
                        <TrendingUp className="ml-2 h-3 w-3 flex-shrink-0" />
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Select Account Group</h4>
                      {[
                        "Assets",
                        "Liability",
                        "Equity",
                        "Revenue",
                        "Expense",
                      ].map((group) => (
                        <div
                          key={group}
                          className="flex items-center justify-between"
                        >
                          <Label htmlFor={`group-${group}`}>{group}</Label>
                          <Switch
                            id={`group-${group}`}
                            checked={newAccountData.accountGroup === group}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewAccountData((prev) => ({
                                  ...prev,
                                  accountGroup: group as any,
                                }));
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <label
                  className={cn(
                    "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#f8fafc] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg"
                  )}
                >
                  Account Group
                </label>
              </div>
            </div>
          </div>

          {/* Account Type Popover */}
          <div className="col-span-1">
            <div className="relative w-full z-0">
              <div className="relative">
                <Popover
                  open={accountTypePopoverOpen}
                  onOpenChange={setAccountTypePopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <div
                      ref={(el) => setRef("accountType")(el)}
                      tabIndex={0}
                      className={cn(
                        "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#f8fafc] rounded-[12px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer h-[50px] focus:border-primary border-1 focus:border-2 cursor-pointer",
                        !hasPermission && "opacity-50 cursor-not-allowed"
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (hasPermission) {
                            if (accountTypePopoverOpen) {
                              setAccountTypePopoverOpen(false);
                              setStatusPopoverOpen(true);
                              setTimeout(() => {
                                inputRefs.current["status"]?.focus();
                              }, 100);
                            } else {
                              setAccountTypePopoverOpen(true);
                            }
                          } else {
                            setStatusPopoverOpen(true);
                            setTimeout(() => {
                              inputRefs.current["status"]?.focus();
                            }, 100);
                          }
                        }
                        if (e.key === "Tab" && !e.shiftKey) {
                          e.preventDefault();
                          setAccountTypePopoverOpen(false);
                          setStatusPopoverOpen(true);
                          setTimeout(() => {
                            inputRefs.current["status"]?.focus();
                          }, 100);
                        }
                      }}
                      onClick={() => {
                        if (hasPermission) {
                          setAccountTypePopoverOpen(!accountTypePopoverOpen);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between h-full pt-2">
                        <span className="truncate text-sm">
                          {newAccountData.accountType === "dr"
                            ? "Debit"
                            : "Credit"}
                        </span>
                        <TrendingUp className="ml-2 h-3 w-3 flex-shrink-0" />
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Select Account Type</h4>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="debit-switch">Debit</Label>
                        <Switch
                          id="debit-switch"
                          checked={newAccountData.accountType === "dr"}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewAccountData((prev) => ({
                                ...prev,
                                accountType: "dr",
                              }));
                            }
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="credit-switch">Credit</Label>
                        <Switch
                          id="credit-switch"
                          checked={newAccountData.accountType === "cr"}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewAccountData((prev) => ({
                                ...prev,
                                accountType: "cr",
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <label
                  className={cn(
                    "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#f8fafc] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg"
                  )}
                >
                  Account Type
                </label>
              </div>
            </div>
          </div>

          {/* Status Popover */}
          <div className="col-span-1">
            <div className="relative w-full z-0">
              <div className="relative">
                <Popover
                  open={statusPopoverOpen}
                  onOpenChange={setStatusPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <div
                      ref={(el) => setRef("status")(el)}
                      tabIndex={0}
                      className={cn(
                        "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#f8fafc] rounded-[12px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer h-[50px] focus:border-primary border-1 focus:border-2 cursor-pointer",
                        !hasPermission && "opacity-50 cursor-not-allowed"
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (hasPermission) {
                            setStatusPopoverOpen(!statusPopoverOpen);
                          } else {
                            focusNextInput("submit");
                          }
                        }
                        if (e.key === "Tab" && !e.shiftKey) {
                          e.preventDefault();
                          focusNextInput("submit");
                        }
                      }}
                      onClick={() => {
                        if (hasPermission) {
                          setStatusPopoverOpen(!statusPopoverOpen);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between h-full pt-2">
                        <span className="truncate text-sm">
                          {newAccountData.status}
                        </span>
                        <TrendingUp className="ml-2 h-3 w-3 flex-shrink-0" />
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Select Status</h4>
                      {["Active", "Inactive", "Delete"].map((status) => (
                        <div
                          key={status}
                          className="flex items-center justify-between"
                        >
                          <Label htmlFor={`status-${status}`}>{status}</Label>
                          <Switch
                            id={`status-${status}`}
                            checked={newAccountData.status === status}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewAccountData((prev) => ({
                                  ...prev,
                                  status: status as any,
                                }));
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <label
                  className={cn(
                    "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#f8fafc] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg"
                  )}
                >
                  Status
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Sticky Footer */}
      <div className="sticky h-[70px] bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-2 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 h-full">
          <div className="flex gap-6 items-center">
            {/* Left side - can add switches or other controls here if needed */}
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleCancelNewAccount}
              className="gap-2 rounded-full cursor-pointer border-gray-300 w-32 bg-gray-100 hover:bg-gray-200 font-semibold"
            >
              <span className="hidden sm:inline font-semibold">Cancel</span>
              <span className="sm:hidden font-semibold">Cancel</span>
            </Button>
            <Button
              ref={submitButtonRef}
              onClick={handleAddNewAccount}
              disabled={
                !hasPermission ||
                !newAccountData.name.trim() ||
                !newAccountData.accountNumber.trim()
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddNewAccount();
                }
              }}
              className="gap-2 rounded-full cursor-pointer border-primary w-32 bg-sky-200 hover:bg-primary font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline font-semibold">Submit</span>
              <span className="sm:hidden font-semibold">Submit</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLevel4Account;
