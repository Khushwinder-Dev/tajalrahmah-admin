/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useColorsPermissions } from "@/hooks/usePermissions";

// Dealer interface to match the grid component
interface DealerItem {
  id: string;
  customerNo: string;
  customerName: string;
  shortName: string;
  vatNumber: string;
  vendorCode: string;
  currency: string;
  phone: string;
  fax: string;
  mobile: string;
  whatsapp: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  address: string;
  email: string;
  website: string;
  language: string;
  locationUrl: string;
  paymentMode: string;
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockDealers: DealerItem[] = [
  {
    id: "1",
    customerNo: "CUST001",
    customerName: "Tech Solutions Ltd",
    shortName: "TechSol",
    vatNumber: "VAT123456789",
    vendorCode: "VEND001",
    currency: "USD",
    phone: "+1-555-0123",
    fax: "+1-555-0124",
    mobile: "+1-555-0125",
    whatsapp: "+1-555-0125",
    country: "United States",
    state: "California",
    city: "San Francisco",
    postCode: "94105",
    address: "123 Market Street, Suite 100",
    email: "info@techsolutions.com",
    website: "www.techsolutions.com",
    language: "English",
    locationUrl: "https://maps.google.com/techsolutions",
    paymentMode: "Credit Card",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    customerNo: "CUST002",
    customerName: "Global Electronics Inc",
    shortName: "GlobalElec",
    vatNumber: "VAT987654321",
    vendorCode: "VEND002",
    currency: "EUR",
    phone: "+44-20-7946-0958",
    fax: "+44-20-7946-0959",
    mobile: "+44-7700-900123",
    whatsapp: "+44-7700-900123",
    country: "United Kingdom",
    state: "England",
    city: "London",
    postCode: "SW1A 1AA",
    address: "10 Downing Street",
    email: "contact@globalelectronics.co.uk",
    website: "www.globalelectronics.co.uk",
    language: "English",
    locationUrl: "https://maps.google.com/globalelectronics",
    paymentMode: "Bank Transfer",
    status: "active",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    customerNo: "CUST003",
    customerName: "Digital Innovations GmbH",
    shortName: "DigitalInno",
    vatNumber: "VAT456789123",
    vendorCode: "VEND003",
    currency: "EUR",
    phone: "+49-30-12345678",
    fax: "+49-30-12345679",
    mobile: "+49-170-1234567",
    whatsapp: "+49-170-1234567",
    country: "Germany",
    state: "Berlin",
    city: "Berlin",
    postCode: "10115",
    address: "Unter den Linden 1",
    email: "info@digitalinnovations.de",
    website: "www.digitalinnovations.de",
    language: "German",
    locationUrl: "https://maps.google.com/digitalinnovations",
    paymentMode: "PayPal",
    status: "active",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    customerNo: "CUST004",
    customerName: "Asia Pacific Trading Co",
    shortName: "AsiaPac",
    vatNumber: "VAT789123456",
    vendorCode: "VEND004",
    currency: "JPY",
    phone: "+81-3-1234-5678",
    fax: "+81-3-1234-5679",
    mobile: "+81-90-1234-5678",
    whatsapp: "+81-90-1234-5678",
    country: "Japan",
    state: "Tokyo",
    city: "Tokyo",
    postCode: "100-0001",
    address: "1-1-1 Marunouchi, Chiyoda-ku",
    email: "sales@asiapacific.co.jp",
    website: "www.asiapacific.co.jp",
    language: "Japanese",
    locationUrl: "https://maps.google.com/asiapacific",
    paymentMode: "Wire Transfer",
    status: "active",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    customerNo: "CUST005",
    customerName: "Middle East Distributors",
    shortName: "MEDist",
    vatNumber: "VAT321654987",
    vendorCode: "VEND005",
    currency: "AED",
    phone: "+971-4-123-4567",
    fax: "+971-4-123-4568",
    mobile: "+971-50-123-4567",
    whatsapp: "+971-50-123-4567",
    country: "UAE",
    state: "Dubai",
    city: "Dubai",
    postCode: "00000",
    address: "Sheikh Zayed Road, Business Bay",
    email: "info@medistributors.ae",
    website: "www.medistributors.ae",
    language: "Arabic",
    locationUrl: "https://maps.google.com/medistributors",
    paymentMode: "Cash",
    status: "active",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    customerNo: "CUST006",
    customerName: "European Tech Partners",
    shortName: "EuroTech",
    vatNumber: "VAT654321987",
    vendorCode: "VEND006",
    currency: "EUR",
    phone: "+33-1-42-86-83-26",
    fax: "+33-1-42-86-83-27",
    mobile: "+33-6-12-34-56-78",
    whatsapp: "+33-6-12-34-56-78",
    country: "France",
    state: "Île-de-France",
    city: "Paris",
    postCode: "75001",
    address: "1 Place du Louvre",
    email: "contact@eurotech.fr",
    website: "www.eurotech.fr",
    language: "French",
    locationUrl: "https://maps.google.com/eurotech",
    paymentMode: "Credit Card",
    status: "draft",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    customerNo: "CUST007",
    customerName: "North American Systems",
    shortName: "NASys",
    vatNumber: "VAT147258369",
    vendorCode: "VEND007",
    currency: "CAD",
    phone: "+1-416-555-0123",
    fax: "+1-416-555-0124",
    mobile: "+1-416-555-0125",
    whatsapp: "+1-416-555-0125",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    postCode: "M5H 2N2",
    address: "100 King Street West",
    email: "info@nasystems.ca",
    website: "www.nasystems.ca",
    language: "English",
    locationUrl: "https://maps.google.com/nasystems",
    paymentMode: "Bank Transfer",
    status: "active",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    customerNo: "CUST008",
    customerName: "South American Ventures",
    shortName: "SAVentures",
    vatNumber: "VAT369258147",
    vendorCode: "VEND008",
    currency: "BRL",
    phone: "+55-11-1234-5678",
    fax: "+55-11-1234-5679",
    mobile: "+55-11-99999-1234",
    whatsapp: "+55-11-99999-1234",
    country: "Brazil",
    state: "São Paulo",
    city: "São Paulo",
    postCode: "01310-100",
    address: "Av. Paulista, 1000",
    email: "contato@saventures.com.br",
    website: "www.saventures.com.br",
    language: "Portuguese",
    locationUrl: "https://maps.google.com/saventures",
    paymentMode: "PIX",
    status: "inactive",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    customerNo: "CUST009",
    customerName: "African Tech Solutions",
    shortName: "AfriTech",
    vatNumber: "VAT852741963",
    vendorCode: "VEND009",
    currency: "ZAR",
    phone: "+27-11-123-4567",
    fax: "+27-11-123-4568",
    mobile: "+27-82-123-4567",
    whatsapp: "+27-82-123-4567",
    country: "South Africa",
    state: "Gauteng",
    city: "Johannesburg",
    postCode: "2000",
    address: "1 Nelson Mandela Square",
    email: "info@afritech.co.za",
    website: "www.afritech.co.za",
    language: "English",
    locationUrl: "https://maps.google.com/afritech",
    paymentMode: "EFT",
    status: "active",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    customerNo: "CUST010",
    customerName: "Oceanic Electronics",
    shortName: "OceanElec",
    vatNumber: "VAT963852741",
    vendorCode: "VEND010",
    currency: "AUD",
    phone: "+61-2-1234-5678",
    fax: "+61-2-1234-5679",
    mobile: "+61-4-1234-5678",
    whatsapp: "+61-4-1234-5678",
    country: "Australia",
    state: "New South Wales",
    city: "Sydney",
    postCode: "2000",
    address: "1 Martin Place",
    email: "sales@oceanicelectronics.com.au",
    website: "www.oceanicelectronics.com.au",
    language: "English",
    locationUrl: "https://maps.google.com/oceanicelectronics",
    paymentMode: "Credit Card",
    status: "draft",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    customerNo: "CUST011",
    customerName: "Innovation Hub",
    shortName: "InnoHub",
    vatNumber: "VAT111222333",
    vendorCode: "VEND011",
    currency: "USD",
    phone: "+1-555-1000",
    fax: "+1-555-1001",
    mobile: "+1-555-1002",
    whatsapp: "+1-555-1002",
    country: "United States",
    state: "New York",
    city: "New York",
    postCode: "10001",
    address: "123 Broadway",
    email: "info@innovationhub.com",
    website: "www.innovationhub.com",
    language: "English",
    locationUrl: "https://maps.google.com/innovationhub",
    paymentMode: "Credit Card",
    status: "active",
    createdAt: "2023-04-15",
    updatedAt: "2023-09-10",
    draftedAt: "2023-04-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    customerNo: "CUST012",
    customerName: "Smart Systems Co",
    shortName: "SmartSys",
    vatNumber: "VAT444555666",
    vendorCode: "VEND012",
    currency: "EUR",
    phone: "+49-89-12345678",
    fax: "+49-89-12345679",
    mobile: "+49-170-9876543",
    whatsapp: "+49-170-9876543",
    country: "Germany",
    state: "Bavaria",
    city: "Munich",
    postCode: "80331",
    address: "Marienplatz 1",
    email: "contact@smartsystems.de",
    website: "www.smartsystems.de",
    language: "German",
    locationUrl: "https://maps.google.com/smartsystems",
    paymentMode: "Bank Transfer",
    status: "inactive",
    createdAt: "2023-05-01",
    updatedAt: "2023-11-12",
    draftedAt: "2023-04-25",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "13",
    customerNo: "CUST013",
    customerName: "Future Tech Ltd",
    shortName: "FutureTech",
    vatNumber: "VAT777888999",
    vendorCode: "VEND013",
    currency: "GBP",
    phone: "+44-161-123-4567",
    fax: "+44-161-123-4568",
    mobile: "+44-7700-123456",
    whatsapp: "+44-7700-123456",
    country: "United Kingdom",
    state: "England",
    city: "Manchester",
    postCode: "M1 1AA",
    address: "1 Albert Square",
    email: "info@futuretech.co.uk",
    website: "www.futuretech.co.uk",
    language: "English",
    locationUrl: "https://maps.google.com/futuretech",
    paymentMode: "PayPal",
    status: "active",
    createdAt: "2023-05-10",
    updatedAt: "2023-10-30",
    draftedAt: "2023-05-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "14",
    customerNo: "CUST014",
    customerName: "Digital Dynamics",
    shortName: "DigiDyn",
    vatNumber: "VAT000111222",
    vendorCode: "VEND014",
    currency: "JPY",
    phone: "+81-6-1234-5678",
    fax: "+81-6-1234-5679",
    mobile: "+81-90-9876-5432",
    whatsapp: "+81-90-9876-5432",
    country: "Japan",
    state: "Osaka",
    city: "Osaka",
    postCode: "530-0001",
    address: "1-1-1 Umeda, Kita-ku",
    email: "sales@digitaldynamics.jp",
    website: "www.digitaldynamics.jp",
    language: "Japanese",
    locationUrl: "https://maps.google.com/digitaldynamics",
    paymentMode: "Wire Transfer",
    status: "draft",
    createdAt: "2023-05-20",
    updatedAt: "2023-11-02",
    draftedAt: "2023-05-15",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "15",
    customerNo: "CUST015",
    customerName: "Tech Pioneers",
    shortName: "TechPioneers",
    vatNumber: "VAT333444555",
    vendorCode: "VEND015",
    currency: "USD",
    phone: "+1-213-555-0123",
    fax: "+1-213-555-0124",
    mobile: "+1-213-555-0125",
    whatsapp: "+1-213-555-0125",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    postCode: "90012",
    address: "123 Hollywood Blvd",
    email: "info@techpioneers.com",
    website: "www.techpioneers.com",
    language: "English",
    locationUrl: "https://maps.google.com/techpioneers",
    paymentMode: "Credit Card",
    status: "active",
    createdAt: "2023-06-01",
    updatedAt: "2023-11-08",
    draftedAt: "2023-05-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "16",
    customerNo: "CUST016",
    customerName: "NextGen Solutions",
    shortName: "NextGen",
    vatNumber: "VAT666777888",
    vendorCode: "VEND016",
    currency: "CAD",
    phone: "+1-514-555-0123",
    fax: "+1-514-555-0124",
    mobile: "+1-514-555-0125",
    whatsapp: "+1-514-555-0125",
    country: "Canada",
    state: "Quebec",
    city: "Montreal",
    postCode: "H1A 0A1",
    address: "123 Rue Saint-Catherine",
    email: "contact@nextgensolutions.ca",
    website: "www.nextgensolutions.ca",
    language: "French",
    locationUrl: "https://maps.google.com/nextgensolutions",
    paymentMode: "Bank Transfer",
    status: "active",
    createdAt: "2023-06-10",
    updatedAt: "2023-10-25",
    draftedAt: "2023-06-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "17",
    customerNo: "CUST017",
    customerName: "Cyber Systems",
    shortName: "CyberSys",
    vatNumber: "VAT999000111",
    vendorCode: "VEND017",
    currency: "EUR",
    phone: "+33-1-23-45-67-89",
    fax: "+33-1-23-45-67-90",
    mobile: "+33-6-12-34-56-78",
    whatsapp: "+33-6-12-34-56-78",
    country: "France",
    state: "Île-de-France",
    city: "Paris",
    postCode: "75008",
    address: "123 Champs-Élysées",
    email: "info@cybersystems.fr",
    website: "www.cybersystems.fr",
    language: "French",
    locationUrl: "https://maps.google.com/cybersystems",
    paymentMode: "Credit Card",
    status: "inactive",
    createdAt: "2023-06-15",
    updatedAt: "2023-06-20",
    draftedAt: "2023-06-12",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "18",
    customerNo: "CUST018",
    customerName: "Data Flow Inc",
    shortName: "DataFlow",
    vatNumber: "VAT222333444",
    vendorCode: "VEND018",
    currency: "USD",
    phone: "+1-312-555-0123",
    fax: "+1-312-555-0124",
    mobile: "+1-312-555-0125",
    whatsapp: "+1-312-555-0125",
    country: "United States",
    state: "Illinois",
    city: "Chicago",
    postCode: "60601",
    address: "123 Michigan Avenue",
    email: "sales@dataflow.com",
    website: "www.dataflow.com",
    language: "English",
    locationUrl: "https://maps.google.com/dataflow",
    paymentMode: "Wire Transfer",
    status: "draft",
    createdAt: "2023-07-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-06-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "19",
    customerNo: "CUST019",
    customerName: "Cloud Technologies",
    shortName: "CloudTech",
    vatNumber: "VAT555666777",
    vendorCode: "VEND019",
    currency: "USD",
    phone: "+1-206-555-0123",
    fax: "+1-206-555-0124",
    mobile: "+1-206-555-0125",
    whatsapp: "+1-206-555-0125",
    country: "United States",
    state: "Washington",
    city: "Seattle",
    postCode: "98101",
    address: "123 Pike Street",
    email: "info@cloudtechnologies.com",
    website: "www.cloudtechnologies.com",
    language: "English",
    locationUrl: "https://maps.google.com/cloudtechnologies",
    paymentMode: "PayPal",
    status: "active",
    createdAt: "2023-07-10",
    updatedAt: "2023-10-18",
    draftedAt: "2023-07-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "20",
    customerNo: "CUST020",
    customerName: "AI Solutions Co",
    shortName: "AISolutions",
    vatNumber: "VAT888999000",
    vendorCode: "VEND020",
    currency: "USD",
    phone: "+1-415-555-0123",
    fax: "+1-415-555-0124",
    mobile: "+1-415-555-0125",
    whatsapp: "+1-415-555-0125",
    country: "United States",
    state: "California",
    city: "San Francisco",
    postCode: "94102",
    address: "123 Market Street",
    email: "contact@aisolutions.com",
    website: "www.aisolutions.com",
    language: "English",
    locationUrl: "https://maps.google.com/aisolutions",
    paymentMode: "Credit Card",
    status: "inactive",
    createdAt: "2023-07-20",
    updatedAt: "2023-09-15",
    draftedAt: "2023-07-15",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function DealersDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
  isFilterOpen,
  setIsFilterOpen,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  searchQuery: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const { canCreate } = useColorsPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "customerName",
      title: "Customer Name",
      options: [...new Set(mockDealers.map((item) => item.customerName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerName")
          .localeCompare(row2.getValue("customerName"));
      },
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Customer Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customerNo",
      title: "Customer No",
      options: [...new Set(mockDealers.map((item) => item.customerNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerNo")
          .localeCompare(row2.getValue("customerNo"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Customer No",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "shortName",
      title: "Short Name",
      options: [...new Set(mockDealers.map((item) => item.shortName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shortName")
          .localeCompare(row2.getValue("shortName"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Short Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vatNumber",
      title: "VAT Number",
      options: [...new Set(mockDealers.map((item) => item.vatNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vatNumber")
          .localeCompare(row2.getValue("vatNumber"));
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "VAT Number",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vendorCode",
      title: "Vendor Code",
      options: [...new Set(mockDealers.map((item) => item.vendorCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vendorCode")
          .localeCompare(row2.getValue("vendorCode"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Vendor Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockDealers.map((item) => item.currency))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currency")
          .localeCompare(row2.getValue("currency"));
      },
      size: isMobile ? 80 : 100,
      minSize: 80,
      meta: {
        exportLabel: "Currency",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [...new Set(mockDealers.map((item) => item.phone))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phone").localeCompare(row2.getValue("phone"));
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Phone",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "mobile",
      title: "Mobile",
      options: [...new Set(mockDealers.map((item) => item.mobile))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("mobile").localeCompare(row2.getValue("mobile"));
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Mobile",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockDealers.map((item) => item.country))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Country",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "city",
      title: "City",
      options: [...new Set(mockDealers.map((item) => item.city))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("city").localeCompare(row2.getValue("city"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "City",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockDealers.map((item) => item.email))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Email",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "paymentMode",
      title: "Payment Mode",
      options: [...new Set(mockDealers.map((item) => item.paymentMode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentMode")
          .localeCompare(row2.getValue("paymentMode"));
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Payment Mode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "createdAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockDealers.filter((item: DealerItem) => {
    // Dealers use the same flags for demo
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["customerName", "customerNo"]}
      pathName="dealers"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
