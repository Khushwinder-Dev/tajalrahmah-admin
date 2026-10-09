import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  List,
  Import,
  Download,
  Filter,
  Mic,
  Search,
  RefreshCw,
  CheckCircle2,
  Circle,
  Pencil,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "./GridFilterComponent";
import GridExportComponent from "./GridExportComponent";
import { Modal, Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

// Define Bank interface to ensure type consistency
interface Bank {
  id: string;
  bankName: string;
  accountNumber: string;
  branchName: string;
  ibanNumber: string;
  openingBalance: number;
  address: string;
  bankDetails: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data - replace with real data from your API
const banks: Bank[] = [
  {
    id: "1",
    bankName: "National Bank",
    accountNumber: "1234567890",
    branchName: "Main Branch",
    ibanNumber: "SA0380000000608010167519",
    openingBalance: 50000.0,
    address: "123 Main Street, City Center",
    bankDetails: "Primary business account for daily transactions",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    bankName: "Commercial Bank",
    accountNumber: "0987654321",
    branchName: "Downtown Branch",
    ibanNumber: "SA0380000000608010167520",
    openingBalance: 75000.0,
    address: "456 Business Ave, Downtown",
    bankDetails: "Secondary account for investments",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    bankName: "Investment Bank",
    accountNumber: "1122334455",
    branchName: "Financial District",
    ibanNumber: "SA0380000000608010167521",
    openingBalance: 100000.0,
    address: "789 Finance Blvd, Financial District",
    bankDetails: "Investment and trading account",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2024-01-17"),
    draftedAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    bankName: "Islamic Bank",
    accountNumber: "5566778899",
    branchName: "Islamic Center",
    ibanNumber: "SA0380000000608010167522",
    openingBalance: 30000.0,
    address: "321 Islamic Way, Islamic Center",
    bankDetails: "Sharia-compliant banking services",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-18"),
    draftedAt: null,
    updatedAt: new Date("2024-01-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    bankName: "Central Bank",
    accountNumber: "9988776655",
    branchName: "Government Plaza",
    ibanNumber: "SA0380000000608010167523",
    openingBalance: 200000.0,
    address: "654 Government St, Government Plaza",
    bankDetails: "Government and institutional banking",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    bankName: "Development Bank",
    accountNumber: "4433221100",
    branchName: "Development Zone",
    ibanNumber: "SA0380000000608010167524",
    openingBalance: 150000.0,
    address: "987 Development Rd, Development Zone",
    bankDetails: "Development and infrastructure financing",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-20"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    bankName: "Savings Bank",
    accountNumber: "1122334455",
    branchName: "Community Center",
    ibanNumber: "SA0380000000608010167525",
    openingBalance: 25000.0,
    address: "147 Community Ave, Community Center",
    bankDetails: "Personal savings and checking accounts",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-21"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    bankName: "Credit Bank",
    accountNumber: "6677889900",
    branchName: "Credit Union",
    ibanNumber: "SA0380000000608010167526",
    openingBalance: 40000.0,
    address: "258 Credit St, Credit Union",
    bankDetails: "Credit and loan services",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-22"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    bankName: "Merchant Bank",
    accountNumber: "8899001122",
    branchName: "Trade Center",
    ibanNumber: "SA0380000000608010167527",
    openingBalance: 80000.0,
    address: "369 Trade Blvd, Trade Center",
    bankDetails: "Merchant and trade financing",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-23"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    bankName: "Retail Bank",
    accountNumber: "3344556677",
    branchName: "Shopping Mall",
    ibanNumber: "SA0380000000608010167528",
    openingBalance: 35000.0,
    address: "741 Mall Rd, Shopping Mall",
    bankDetails: "Retail banking and personal services",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-24"),
    draftedAt: null,
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    bankName: "Digital Bank",
    accountNumber: "5566778899",
    branchName: "Tech Hub",
    ibanNumber: "SA0380000000608010167529",
    openingBalance: 60000.0,
    address: "852 Tech Ave, Tech Hub",
    bankDetails: "Digital banking and fintech services",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-25"),
    draftedAt: null,
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    bankName: "Private Bank",
    accountNumber: "7788990011",
    branchName: "Private Club",
    ibanNumber: "SA0380000000608010167530",
    openingBalance: 500000.0,
    address: "963 Private Way, Private Club",
    bankDetails: "Private banking and wealth management",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "13",
    bankName: "Cooperative Bank",
    accountNumber: "9900112233",
    branchName: "Cooperative Center",
    ibanNumber: "SA0380000000608010167531",
    openingBalance: 45000.0,
    address: "159 Cooperative St, Cooperative Center",
    bankDetails: "Cooperative and mutual banking",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-27"),
    draftedAt: null,
    updatedAt: new Date("2024-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "14",
    bankName: "Rural Bank",
    accountNumber: "2233445566",
    branchName: "Rural Area",
    ibanNumber: "SA0380000000608010167532",
    openingBalance: 20000.0,
    address: "357 Rural Rd, Rural Area",
    bankDetails: "Rural and agricultural financing",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-28"),
    draftedAt: null,
    updatedAt: new Date("2024-02-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "15",
    bankName: "International Bank",
    accountNumber: "4455667788",
    branchName: "International Plaza",
    ibanNumber: "SA0380000000608010167533",
    openingBalance: 300000.0,
    address: "753 International Blvd, International Plaza",
    bankDetails: "International banking and forex services",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-29"),
    draftedAt: null,
    updatedAt: new Date("2024-02-03"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "16",
    bankName: "Microfinance Bank",
    accountNumber: "6677889900",
    branchName: "Microfinance Center",
    ibanNumber: "SA0380000000608010167534",
    openingBalance: 15000.0,
    address: "951 Microfinance Ave, Microfinance Center",
    bankDetails: "Microfinance and small business loans",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-30"),
    draftedAt: null,
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function BanksGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Banks grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [banksData, setBanksData] = useState(banks);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Bank",
    message: <ImportStepperTemp />,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const BANKS_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const bankTypes = [
      "Commercial",
      "Investment",
      "Islamic",
      "Central",
      "Development",
      "Savings",
      "Credit",
      "Merchant",
      "Retail",
      "Digital",
      "Private",
      "Cooperative",
      "Rural",
      "International",
      "Microfinance",
    ];
    const branchTypes = [
      "Main Branch",
      "Downtown Branch",
      "Financial District",
      "Islamic Center",
      "Government Plaza",
      "Development Zone",
      "Community Center",
      "Credit Union",
      "Trade Center",
      "Shopping Mall",
      "Tech Hub",
      "Private Club",
      "Cooperative Center",
      "Rural Area",
      "International Plaza",
      "Microfinance Center",
    ];

    const newBanks = Array.from({ length: BANKS_PER_PAGE }, (_, index) => {
      const randomBankType =
        bankTypes[Math.floor(Math.random() * bankTypes.length)];
      const randomBranchType =
        branchTypes[Math.floor(Math.random() * branchTypes.length)];

      return {
        id: `${Date.now()}-${index}`,
        bankName: `${randomBankType} Bank ${banksData.length + index + 1}`,
        accountNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        branchName: randomBranchType,
        ibanNumber: `SA03800000006080101${(67535 + banksData.length + index)
          .toString()
          .padStart(4, "0")}`,
        openingBalance:
          Math.round((Math.random() * 500000 + 10000) * 100) / 100,
        address: `${Math.floor(Math.random() * 999) + 1} ${
          randomBranchType.split(" ")[0]
        } St, ${randomBranchType.split(" ").slice(1).join(" ")}`,
        bankDetails: `${randomBankType} banking services for account ${
          banksData.length + index + 1
        }`,
        isDefault: Math.random() > 0.8,
        isActive: Math.random() > 0.3,
        isDraft: Math.random() > 0.7,
        createdAt: new Date(),
        draftedAt: Math.random() > 0.7 ? new Date() : null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };
    });

    // Stop loading more after reaching 50 banks for demo
    if (banksData.length >= 46) {
      setHasMore(false);
    } else {
      setBanksData((prev) => [...prev, ...newBanks]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [banksData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100; // Load more when 100px from bottom

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (bankId: string) => {
    setBanksData((prevBanks) =>
      prevBanks.map((bank) =>
        bank.id === bankId
          ? {
              ...bank,
              isDeleted: !bank.isDeleted,
              deletedAt: !bank.isDeleted ? new Date() : null,
            }
          : bank
      )
    );
  };

  const handleRestoreClick = (bankId: string) => {
    setBanksData((prevBanks) =>
      prevBanks.map((bank) =>
        bank.id === bankId
          ? {
              ...bank,
              isDeleted: false,
              deletedAt: null,
            }
          : bank
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (bankId: string) => {
    setBanksData((prevBanks) =>
      prevBanks.map((bank) =>
        bank.id === bankId
          ? {
              ...bank,
              isActive: !bank.isActive,
              updatedAt: new Date(),
            }
          : bank
      )
    );
  };

  // Filter banks based on search query
  const filteredBanks = banksData.filter(
    (bank) =>
      bank.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.ibanNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.bankDetails.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
      {/* Fixed header controls - keep existing header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-  rounded-full min-w-[60px] sm:min-w-[80px]"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer rounded-full"
              onClick={() => {
                open();
                setModalData({
                  title: "Import Bank",
                  message: <ImportStepperTemp />,
                });
              }}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
                <Input
                  placeholder="Search banks..."
                  className="pl-9 pr-9 w-full rounded-full relative z-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Tooltip
                  arrowOffset={10}
                  arrowSize={7}
                  withArrow
                  position="top"
                  label="Search by voice"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0 z-10"
                  >
                    <Mic className="h-4 w-4 text-blue-700" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isExportOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsFilterOpen(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>

            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isFilterOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsExportOpen(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
            {filteredBanks.map((bank) => (
              <Card
                key={bank.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 3 Column Grid Layout */}
                <div className="grid grid-cols-3 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip label={bank.bankName} position="top" withArrow>
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/banks/${bank.id}`)}
                      >
                        {bank.bankName}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Center - Action Icons */}
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        bank.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          bank.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(bank.id);
                          toastSuccess(
                            bank.isActive
                              ? "Bank deactivated successfully"
                              : "Bank activated successfully"
                          );
                        }}
                      >
                        {bank.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={bank.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          bank.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (bank.isDeleted) {
                            handleRestoreClick(bank.id);
                          } else {
                            handleDeleteClick(bank.id);
                          }
                          toastSuccess(
                            bank.isDeleted
                              ? "Bank restored successfully"
                              : "Bank deleted successfully"
                          );
                        }}
                      >
                        {bank.isDeleted ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip label="Edit" position="top" withArrow>
                      <div
                        className="cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center"
                        onClick={() => navigate(`/banks/${bank.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Branch  */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Branch
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {bank.branchName}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: IBAN | Balance | Branch */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Balance - Center aligned */}
                  <div className="flex justify-start items-center gap-1">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Balance
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${bank.openingBalance.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Branch - Right aligned */}
                  <div className="flex justify-end">
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Account
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {bank.accountNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more banks...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredBanks.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more banks to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={banks}
                setFilteredData={setBanksData}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component - Right side only */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={banks}
                setFilteredData={setBanksData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="">
            <h3 className="text-lg font-semibold pl-4 ">Import Bank</h3>
          </div>
        }
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{ zIndex: 9999 }}
        className="z-[9999]"
        centered
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
