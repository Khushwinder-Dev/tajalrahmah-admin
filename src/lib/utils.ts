import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import HijriDate from "hijri-date/lib/safe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string | null | Date) => {
  if (!date) return "--/--/----";
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Extracts the module name from the current route path
 * @param pathname - The current route path (e.g., "/users-location/create" or "/users/users-location/create")
 * @returns The module name (e.g., "userLocations")
 */
export function getModuleFromPath(pathname: string): string {
  // Remove leading slash and split by "/"
  const pathParts = pathname.replace(/^\//, "").split("/");

  // Get the first part which is the module name
  const modulePath = pathParts[0];
  const subModulePath = pathParts[1]; // Get submodule if exists

  if (!modulePath) return "";

  // Define all possible module mappings (both direct and submodule)
  const moduleMappings: Record<string, string> = {
    // Direct module routes
    "users-location": "userLocations",
    "user-master": "userMaster",
    "customer-group": "customerGroup",
    "suppliers-group": "suppliersGroup",
    "sales-invoice": "salesInvoice",
    "sales-quotation": "salesQuotation",
    "sales-return": "salesReturn",
    "stock-transfer": "stockTransfer",
    "opening-stock-inventory": "openingStockInventory",
    "damage-items": "damageItems",
    "expiry-items": "expiryItems",
    "delivery-note": "deliveryNote",
    "table-assigns": "tableAssigns",
    "order-type": "orderType",
    "purchase-returns": "purchaseReturns",
    "task-category": "taskCategory",
    "sample-category": "sampleCategory",
    "sample-receiving": "sampleReceiving",
    "task-assigns": "taskAssigns",
    "project-types": "projectTypes",
    "leaves-approval": "leavesApproval",
    "leaves-application": "leavesApplication",
    "financial-year": "financialYear",
    "tax-rates": "taxRates",
    "salary-advance": "salaryAdvance",
    "transfer-cash": "transferCash",
    "contact-type": "contactType",
    "candidate-sortlists": "candidateSortlists",
    "blood-groups": "bloodGroups",
    "job-locations": "jobLocations",
    "employee-contract": "employeeContract",
    "weekly-holidays": "weeklyHolidays",
    "lead-sources": "leadSources",
    "lead-status": "leadStatuses",
    "unavailable-dates": "unavailableDates",
    "candidate-list": "candidateList",
    "candidate-selections": "candidateSelections",
    "house-keepers": "houseKeeper",
    "assets-category": "assetsCategory",
    "assets-master": "assetsMaster",
    "room-size": "roomSize",
    "booking-type": "bookingType",
    "booking-list": "bookingList",
    "booking-source": "bookingSource",
    "job-categories": "jobCategories",
    "property-approval": "propertyApproval",
    "assign-house-keepers": "assignHouseKeepers",
    "benefit-penalty": "benefitPenalty",
    "log-books": "logBooks",
    "realestate-agent": "realestateAgent",
    "business-broker": "businessBroker",
    "repair-jobs": "repairJobs",
    "transport-master": "transportMaster",
    "supplier-master": "supplierMaster",
    "property-owner": "propertyOwner",
    "rental-requests": "rentalRequests",
    "shift-type": "shiftType",
    "journal-entry": "journalEntry",
    "user-log": "userLog",
    "port-master": "portMaster",
    "agent-master": "agentMaster",
    "pending-order": "pendingOrder",
    "asset-maintenances": "assetMaintenances",
    "loyalty-users": "loyaltyUsers",
    "loyalty-programs": "loyaltyPrograms",
    "manufacturing-orders": "manufacturingOrders",
    "membership-rules": "membershipRules",
    "consignee-master": "consigneeMaster",
    "logistic-warehouse": "logisticWareHouse",
    "transit-order": "transitOrder",
    "receive-warehouse-logistics": "receiveWarehouseLogistics",
    "purchase-order-logistic": "purchaseOrderLogistic",
    "arrival-port": "arrivalPort",
    "wake-up-calls": "wakeUpCalls",
    "receive-port-logistic": "receivePortLogistic",
    "award-lists": "awardLists",
    "notice-boards": "noticeBoards",
    "employee-performances": "employeePerformances",
    "training-programs": "trainingPrograms",
    "job-post": "jobPost",
    "pre-alerts": "preAlerts",
    "warranty-information": "warrantyInformation",
    "bills-of-materials": "billsOfMaterials",
    "work-centers": "workCenters",
    "expense-reports": "expenseReports",
    "supplier-items-report": "supplierItemsReport",
    "work-orders": "workOrders",
    "project-contract-type": "projectContractType",
    "bonus-type": "bonusType",
    "salary-sheet": "salarySheet",
    "ticket-status": "ticketStatus",
    "predefined-replies": "predefinedReplies",
    "bed-assign": "bedAssign",
    "bed-reports": "bedReports",
    "bed-transfer": "bedTransfer",
    "ticket-priorities": "ticketPriorities",
    "profit-loss": "profitLoss",
    "sales-item-reports": "salesItemReports",
    "current-stock-reports": "currentStockReports",
    "salesman-sales-reports": "salesmanSalesReports",
    "received-voucher": "receivedVoucher",
    "birth-report": "birthReport",
    "employee-statement": "employeeStatement",
    "customer-statement": "customerStatement",
    "supplier-statement": "supplierStatement",
    "medicine-category": "medicineCategory",
    "patient-appoinment": "patientAppoinment",
    "document-types": "documentTypes",
    "action-types": "actionTypes",
    "status-types": "statusTypes",
    "export-medias": "exportMedias",
    // Direct simple module routes
    garages: "garages",
    beds: "beds",
    plans: "plans",
    audits: "audits",
    bed: "bed",
    warranties: "warranties",
    documents: "documents",
    depreciations: "depreciations",
    tickets: "tickets",
    goods: "goods",
    courier: "courier",
    subscribe: "subscribe",
    shortcut: "shortcut",
    fuels: "fuels",
    campaigns: "campaigns",
    accessories: "accessories",
    parts: "parts",
    consumables: "consumables",
    shifts: "shifts",
    tenant: "tenant",
    vehicles: "vehicles",
    property: "property",
    expenses: "expenses",
    shipment: "shipment",
    pickup: "pickup",
    leads: "leads",
    commission: "commission",
    deductions: "deductions",
    allowances: "allowances",
    loans: "loans",
    terms: "terms",
    projects: "projects",
    countries: "countries",
    users: "users",
    states: "states",
    cities: "cities",
    insurances: "insurances",
    holiday: "holiday",
    rooms: "rooms",
    drivers: "drivers",
    increments: "increments",
    retirement: "retirement",
    certificates: "certificates",
    languages: "languages",
    permissions: "permissions",
    purchase: "purchase",
    promotion: "promotion",

    blog: "blog",
    sliders: "sliders",

    reservation: "reservation",
    invoice: "invoice",
    item: "item",
    payment: "payment",
    salesman: "salesman",
    department: "department",
    designation: "designation",
    divisions: "divisions",
    groups: "groups",
    rack: "rack",
    sections: "sections",
    shelf: "shelf",
    sizes: "sizes",
    tax: "tax",
    uoms: "uoms",
    waiters: "waiters",
    warehouse: "warehouse",
    companies: "companies",
    branches: "branches",
    currencies: "currencies",
    deliverymen: "deliverymen",
    employee: "employee",
    area: "area",
    bank: "bank",
    bin: "bin",
    brands: "brands",
    colors: "colors",
    store: "store",
    subBin: "subBin",
    Translation: "Translation",
    section: "section",
    leaves: "leaves",
    appointments: "appointments",
    bonus: "bonus",
    termination: "termination",
    transfer: "transfer",
    skills: "skills",
    maintenances: "maintenance",
    devices: "devices",
    tasks: "tasks",
    onboarding: "onboarding",
    inspections: "inspections",
    checks: "checks",
    transporter: "transporter",
    supplier: "supplier",
    shipping: "shipping",
    packing: "packing",
    checkin: "checkin",
    checkout: "checkout",
    licenses: "licenses",
    positions: "positions",
    complementaries: "complementaries",

    "company-loans": "companyLoans",
    company: "company",
    "advance-payment": "advancePayment",
    "expense-categories": "expenseCategories",
    "expense-sub-categories": "expenseSubCategories",
    notice: "notice",
    openingStock: "opening-stock",
    stockTransfer: "stock-transfer",
  };

  // Define submodule mappings (for routes like /users/users-location)
  const subModuleMappings: Record<string, Record<string, string>> = {
    users: {
      "users-location": "userLocations",
      "user-master": "userMaster",
    },
    customers: {
      "customer-group": "customerGroup",
    },
    suppliers: {
      "suppliers-group": "suppliersGroup",
    },
    sales: {
      "sales-invoice": "salesInvoice",
      "sales-quotation": "salesQuotation",
      "sales-return": "salesReturn",
    },
    inventory: {
      "stock-transfer": "stockTransfer",
      "opening-stock-inventory": "openingStockInventory",
      "damage-items": "damageItems",
      "expiry-items": "expiryItems",
    },
    delivery: {
      "delivery-note": "deliveryNote",
    },
    table: {
      "table-assigns": "tableAssigns",
    },
    order: {
      "order-type": "orderType",
    },
    task: {
      "task-category": "taskCategory",
    },
    sample: {
      "sample-category": "sampleCategory",
      "sample-receiving": "sampleReceiving",
    },
  };

  // First, check if the first path part is a direct module mapping
  if (moduleMappings[modulePath]) {
    return moduleMappings[modulePath];
  }

  // Then, check if it's a submodule route (e.g., /users/users-location)
  if (
    subModulePath &&
    subModuleMappings[modulePath] &&
    subModuleMappings[modulePath][subModulePath]
  ) {
    return subModuleMappings[modulePath][subModulePath];
  }

  // For simple cases, just convert kebab-case to camelCase
  return modulePath.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function convertArabicDateToEnglish(arabicDate: string): string {
  const arabicToEnglishDigits: Record<string, string> = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  return arabicDate.replace(/[٠-٩]/g, (digit) => arabicToEnglishDigits[digit]);
}

export function arabicToEnglishNumbers(input: string): string {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return input.replace(/[٠-٩]/g, (d) => arabicNumbers.indexOf(d).toString());
}

export function convertHijriToGregorian(arabicHijriDate: string): string {
  // Example: arabicHijriDate = "١٠/١٢/١٤٤٩"
  const enDate = arabicToEnglishNumbers(arabicHijriDate); // => "10/12/1449"
  const [day, month, year] = enDate.split("/").map(Number);

  const hijri = new HijriDate(year, month - 1, day); // month is 0-indexed
  const gregorian = hijri.toGregorian();

  // Format as YYYY-MM-DD
  return `${gregorian.getFullYear()}-${(gregorian.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${gregorian.getDate().toString().padStart(2, "0")}`;
}
