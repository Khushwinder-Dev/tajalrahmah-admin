// mockData/languageData.ts
export interface LanguageLabels {
  // Form labels
  date: string;
  code: string;
  calling: string;
  country: string;
  insurances: string;
  certificates: string;
  holiday: string;
  increments: string;
  retirement: string;
  financialYear: string;
  texRates: string;
  candidateList: string;
  leads: string;
  candidateSelections: string;
  commission: string;
  default: string;
  draft: string;
  flagPreview: string;
  dragDropImage: string;

  // Button labels
  reset: string;
  submit: string;

  // Form titles
  addingCountry: string;
  editingCountry: string;
  creatingInsurances: string;
  editingInsurances: string;
  creatingCertificates: string;
  editingCertificates: string;
  creatingHoliday: string;
  editingHoliday: string;
  creatingIncrements: string;
  editingIncrements: string;
  creatingRetirement: string;
  editingRetirement: string;
  creatingFinancialYear: string;
  editingFinancialYear: string;
  creatingTexRates: string;
  editingTexRates: string;
  creatingCandidateList: string;
  editingCandidateList: string;
  creatingLeads: string;
  editingLeads: string;
  creatingCandidateSelections: string;
  editingCandidateSelections: string;
  creatingCommission: string;
  editingCommission: string;

  // Modal labels
  resetForm: string;
  resetFormMessage: string;
  resetFormConfirm: string;
  cancel: string;

  // Options
  yes: string;
  no: string;

  Yes: string;
  No: string;

  // Tooltips
  callingCodeTooltip: string;
  countryNameTooltip: string;
  countryCodeTooltip: string;
  defaultCountryTooltip: string;
  statusTooltip: string;
  isdTooltip: string;

  // assets module
  assetCategory: string;
  assetNameTooltip: string;

  // rental module
  rentalCategory: string;
  rentalDescriptionTooltip: string;
  segTooltip: string;
  rentalNameTooltip: string;
  agreementAmountTooltip: string;
  agreementNumberTooltip: string;
  agreementNameTooltip: string;
  agreementTypeTooltip: string;
  agreementDateTooltip: string;
  installExpireDateTooltip: string;
  installmentNoTooltip: string;
  installmentAmountTooltip: string;
  installmentPlanTooltip: string;
  NotificationDaysTooltip: string;
  creatingAssetMaster: string;
  editingAssetMaster: string;
  creatingRental: string;
  editingRental: string;
  creatingAsset: string;
  editingAsset: string;

  // languages module
  language: string;
  status: string;
  editingLanguage: string;
  addingLanguage: string;
  sequence: string;
  sequenceTooltip: string;
  languageCodeTooltip: string;
  languageNameTooltip: string;
  defaultLanguage: string;
  language_ar: string;
  language_hi: string;
  language_ur: string;
  language_bn: string;

  // Holiday module
  holidayNameTooltip: string;
  holidayFromDateTooltip: string;
  holidayEndDateTooltip: string;

  // Increments module
  incrementsNameTooltip: string;
  incrementsDateTooltip: string;
  incrementsAmountTooltip: string;
  incrementsNoteTooltip: string;
  iqamaNoTooltip: string;
  // employeeNameTooltip: string;
  employeeDesignationTooltip: string;
  employeeBranchTooltip: string;

  // Retirement module
  retirementNameTooltip: string;
  retirementDateTooltip: string;
  retirementIqamaNoTooltip: string;
  retirementEmployeeNameTooltip: string;
  retirementEmployeeDesignationTooltip: string;
  retirementEmployeeBranchTooltip: string;
  retirementDetailsTooltip: string;
  retirementStatusTooltip: string;

  // insurances
  insuranceNameTooltip: string;
  insuranceIqamaNoTooltip: string;
  insuranceEmployeeNameTooltip: string;
  insuranceEmployeeDesignationTooltip: string;
  insuranceEmployeeBranchTooltip: string;
  insuranceDetailsTooltip: string;

  // certificates
  certificatesNumberTooltip: string;
  certificatesTypeTooltip: string;
  labManagerTooltip: string;
  generalManagerTooltip: string;

  // financial year
  financialYearTitleTooltip: string;
  fromDateTooltip: string;
  toDateTooltip: string;
  financialYearStatusTooltip: string;

  // tax rates
  taxRateTooltip: string;

  // candidateList
  firstNameTooltip: string;
  lastNameTooltip: string;
  emailTooltip: string;
  phoneTooltip: string;
  alternatePhoneTooltip: string;
  ssnTooltip: string;
  presentAddressTooltip: string;
  permanentAddressTooltip: string;
  zipCodeTooltip: string;
  pictureTooltip: string;
  obtainedDegreeTooltip: string;
  universityTooltip: string;
  cgpaTooltip: string;
  commentTooltip: string;
  experienceLevelTooltip: string;
  skillTooltip: string;
  companyNameTooltip: string;
  workingPeriodTooltip: string;
  dutiesTooltip: string;
  supervisorTooltip: string;

  // candidateSelections
  employeeNameTooltip: string;
  positionTooltip: string;
  teamTooltip: string;

  // commission
  commissionTooltip: string;
  designationTooltip: string;

  // lead
  clientNamerTooltip: string;
  productGroupTooltip: string;
  serviceTooltip: string;
  budgetTooltip: string;
  priorityTooltip: string;
  assigneeTooltip: string;
  contactTooltip: string;
  sourceTooltip: string;
  employeesTooltip: string;
  branchesTooltip: string;
  businessTooltip: string;
  automationTooltip: string;
  languageTooltip: string;
  mobileTooltip: string;
  whatsappTooltip: string;
  faxTooltip: string;
  countryTooltip: string;
  stateTooltip: string;
  cityTooltip: string;
  areaTooltip: string;
  websiteTooltip: string;
  linkedinTooltip: string;
  facebookTooltip: string;
  instagramTooltip: string;
  locationTooltip: string;
  notesTooltip: string;

  // room size
  roomSize: string;
  creatingRoomSize: string;
  editingRoomSize: string;
  roomSizeTooltip: string;

  // rooms
  rooms: string;
  creatingRooms: string;
  editingRooms: string;
  roomTypeTooltip: string;
  roomSizeNameTooltip: string;
  capacityTooltip: string;
  extraCapacityTooltip: string;
  rateTooltip: string;
  bedChargeTooltip: string;
  personalChargeTooltip: string;
  reviewTooltip: string;

  // booking type
  bookingType: string;
  creatingBookingType: string;
  editingBookingType: string;
  bookingTypeTooltip: string;

  // Log Booking
  logBooking: string;
  creatingLogBooking: string;
  editingLogBooking: string;
  bookingTooltip: string;
  vehicleTooltip: string;
  driverTooltip: string;
  logBookingTooltip: string;
  odometersTooltip: string;

  // drivers
  drivers: string;
  creatingDrivers: string;
  editingDrivers: string;
  employeeTooltip: string;

  // real estate agent
  realEstateAgent: string;
  creatingRealEstateAgent: string;
  editingRealEstateAgent: string;
  profileImageTooltip: string;
  codeTooltip: string;
  nameTooltip: string;
  vatNumberTooltip: string;
  aboutInformationsTooltip: string;
  addressTooltip: string;
  whatsappUrlTooltip: string;
  facebookUrlTooltip: string;
  instagramUrlTooltip: string;
  skypeUrlTooltip: string;
  linkedinUrlTooltip: string;
  planTooltip: string;
  attachFileTooltip: string;
  hourlyRateTooltip: string;
  defaultLanguageTooltip: string;
  emailSignatureTooltip: string;
  directionTooltip: string;
  shiftReportsTooltip: string;
  passwordTooltip: string;

  // business broker
  businessBroker: string;
  creatingBusinessBroker: string;
  editingBusinessBroker: string;

  // shipment
  shipment: string;
  creatingShipment: string;
  editingShipment: string;
  shippingPrefixTooltip: string;
  numberTooltip: string;
  agencyTooltip: string;
  officeOfOriginTooltip: string;
  customerTooltip: string;
  customerAddressTooltip: string;
  recipientTooltip: string;
  recipientAddressTooltip: string;
  logisticServiceTooltip: string;
  paymentTermTooltip: string;
  typeofPackageTooltip: string;
  courierCompanyTooltip: string;
  serviceModeTooltip: string;
  deliveryTimeTooltip: string;
  assignDriverTooltip: string;
  currencyTooltip: string;
  currencyRateTooltip: string;
  deliveryStatusTooltip: string;
  invoiceTooltip: string;
  amountTooltip: string;
  packageDetailsTooltip: string;
  weightTooltip: string;
  lengthTooltip: string;
  widthTooltip: string;
  heightTooltip: string;
  weightVolTooltip: string;
  fixedChargeTooltip: string;
  DecValueTooltip: string;
  TariffFeeTooltip: string;
  priceKgTooltip: string;
  DiscountTooltip: string;
  valueAssuredTooltip: string;
  shippingInsuranceTooltip: string;
  customDutiesTooltip: string;
  taxTooltip: string;
  declaredValueTooltip: string;
  reissueTooltip: string;

  // journalEntry
  journalEntry: string;
  creatingJournalEntry: string;
  editingJournalEntry: string;
  journalDateTooltip: string;
  referenceTooltip: string;
  totalCyclesTooltip: string;
  accountTooltip: string;
  debitTooltip: string;
  creditTooltip: string;

  // pickup
  pickup: string;
  creatingPickup: string;
  editingPickup: string;

  // transport master
  transportMaster: string;
  creatingTransportMaster: string;
  editingTransportMaster: string;
  transporterNameTooltip: string;
  landMarkTooltip: string;
  notificationTooltip: string;
  contactPersonTooltip: string;

  // Supplier Master
  supplierMaster: string;
  creatingSupplierMaster: string;
  editingSupplierMaster: string;
  supplierNameTooltip: string;
  paymentTermsTooltip: string;
  paymentTypeTooltip: string;
  dueDayTooltip: string;
  depositTypeTooltip: string;
  depositAmountTooltip: string;
  exchangeRateTooltip: string;
  localAmtTooltip: string;
  poBoxTooltip: string;
  zipTooltip: string;

  // logistic warehouse
  logisticWarehouse: string;
  creatingLogisticWarehouse: string;
  editingLogisticWarehouse: string;

  // receive warehouse logistics
  receiveWarehouseLogistics: string;
  creatingReceiveWarehouseLogistics: string;
  editingReceiveWarehouseLogistics: string;

  // Booking List
  bookingList: string;
  creatingBookingList: string;
  editingBookingList: string;
  bookingNoTooltip: string;
  checkInTooltip: string;
  checkOutTooltip: string;
  refNoTooltip: string;
  purposeOfVisitTooltip: string;
  remarksTooltip: string;
  roomNoTooltip: string;
  adultsTooltip: string;
  childrenTooltip: string;

  // job categories
  jobCategories: string;
  creatingJobCategories: string;
  editingJobCategories: string;

  // Booking Sources
  bookingSources: string;
  creatingBookingSources: string;
  editingBookingSources: string;
  BookingSourceTooltip: string;
  commissionRateTooltip: string;

  // Booking Types
  shift: string;
  creatingShifts: string;
  editingShifts: string;
  startTimeTooltip: string;
  endTimeTooltip: string;

  // assets-maintenances
  assetMaintenances: string;
  creatingAssetMaintenances: string;
  editingAssetMaintenances: string;
  assetTooltip: string;
  maintenanceTypeTooltip: string;
  completionDateTooltip: string;
  warrantyImprovementTooltip: string;
  costTooltip: string;

  // membership-rules
  membershipRules: string;
  creatingMembershipRules: string;
  editingMembershipRules: string;
  customerGroupTooltip: string;
  cardTooltip: string;
  pointFromTooltip: string;
  pointToTooltip: string;
  // loyalty-programs
  loyaltyPrograms: string;
  creatingLoyaltyPrograms: string;
  editingLoyaltyPrograms: string;
  minimumPurchaseTooltip: string;
  accountCreationPointTooltip: string;
  birthdayPointTooltip: string;
  redeemTypeTooltip: string;
  minimumPointToRedeemTooltip: string;
  maxAmountReceiveTooltip: string;
  redeemInPortalTooltip: string;
  redeemInPosTooltip: string;
  ruleNameTooltip: string;

  //manufacturing orders
  manufacturingOrders: string;
  creatingManufacturingOrders: string;
  editingManufacturingOrders: string;
  productTooltip: string;
  quantityTooltip: string;
  deadlineTooltip: string;
  planFromTooltip: string;
  unitOfMeasureTooltip: string;
  responsibleTooltip: string;
  bomCodeTooltip: string;
  referenceCodeTooltip: string;
  routingTooltip: string;

  // items module
  items: string;
  creatingItems: string;
  editingItems: string;
  addingItem: string;
  editingItem: string;
  itemCode: string;
  itemName: string;
  arabicName: string;
  costPrice: string;
  regularPrice: string;
  offerPrice: string;
  startDate: string;
  endDate: string;
  openingStock: string;
  category: string;
  subCategory: string;
  unit: string;
  description: string;
  itemCodeTooltip: string;
  itemNameTooltip: string;
  arabicNameTooltip: string;
  costPriceTooltip: string;
  regularPriceTooltip: string;
  offerPriceTooltip: string;
  startDateTooltip: string;
  endDateTooltip: string;
  openingStockTooltip: string;
  categoryTooltip: string;
  subCategoryTooltip: string;
  unitTooltip: string;
  defaultItemTooltip: string;
  itemStatusTooltip: string;
}

export const LANGUAGE_LABELS: Record<string, LanguageLabels> = {
  en: {
    date: "Date",
    code: "Code",
    calling: "Calling",
    country: "Country",
    insurances: "Insurances",
    certificates: "Certificates",
    financialYear: "Financial Year",
    texRates: "Tax Rates",
    default: "Default",
    draft: "Draft",
    flagPreview: "Flag Preview",
    dragDropImage: "Drag & drop an image here or click to select",
    reset: "Reset",
    submit: "Submit",
    addingCountry: "Adding Country",
    editingCountry: "Editing Country",
    creatingInsurances: "Creating Insurances",
    editingInsurances: "Editing Insurances",
    creatingCertificates: "Creating Certificates",
    editingCertificates: "Editing Certificates",
    creatingFinancialYear: "Creating Financial Year",
    editingFinancialYear: "Editing Financial Year",
    creatingTexRates: "Creating Tax Rates",
    editingTexRates: "Editing Tax Rates",
    resetForm: "Reset Form",
    resetFormMessage: "Are you sure you want to reset this form?",
    resetFormConfirm: "Reset Form",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
    Yes: "Yes",
    No: "No",
    callingCodeTooltip: "Calling code",
    countryNameTooltip: "Country name",
    countryCodeTooltip: "Country Code",
    defaultCountryTooltip: "Country Default",
    statusTooltip: "Country Status",
    isdTooltip: "Country ISD",
    codeTooltip: "Code",
    assetCategory: "Category",
    assetNameTooltip: "Name",
    // rental module
    rentalCategory: "Category",
    rentalNameTooltip: "Rental Name",
    rentalDescriptionTooltip: "Rental Description",
    // rental field
    segTooltip: "SEG",
    agreementNumberTooltip: "Agreement Number",
    agreementAmountTooltip: "Agreement Amount",
    agreementNameTooltip: "Agreement Name",
    agreementTypeTooltip: "Agreement Type",
    agreementDateTooltip: "Agreement Date",
    installExpireDateTooltip: "Expire Date",
    installmentNoTooltip: "Installment No",
    installmentAmountTooltip: "Installment Amount",
    installmentPlanTooltip: "Installment Plan",
    NotificationDaysTooltip: "Notification Days",
    creatingAssetMaster: "Creating Asset Master",
    editingAssetMaster: "Editing Asset Master",
    creatingRental: "Creating Rental",
    editingRental: "Editing Rental",
    creatingAsset: "Creating Asset",
    editingAsset: "Editing Asset",
    // insurances
    insuranceNameTooltip: "Insurance",
    insuranceIqamaNoTooltip: "Iqama No",
    insuranceEmployeeNameTooltip: "Employee Name",
    insuranceEmployeeDesignationTooltip: "Designation",
    insuranceEmployeeBranchTooltip: "Branch",
    insuranceDetailsTooltip: "Description",

    // certificates
    certificatesNumberTooltip: "Certificate Number",
    certificatesTypeTooltip: "Certificate Type",
    labManagerTooltip: "Lab Manager",
    generalManagerTooltip: "General Manager",

    // financial year
    financialYearTitleTooltip: "Title",
    fromDateTooltip: "From Date",
    toDateTooltip: "To Date",
    financialYearStatusTooltip: "Status",

    // tax rates
    taxRateTooltip: "Tax Rate(%)",

    // languages
    language: "Language",
    status: "Status",
    editingLanguage: "Editing Language",
    addingLanguage: "Adding Language",
    sequence: "Sequence",
    sequenceTooltip:
      "Enter the display order sequence number for this language",
    languageCodeTooltip: "Enter the ISO language code (e.g., en, ar, hi)",
    languageNameTooltip: "Enter the full name of the language",
    defaultLanguage: "Default",
    language_ar: "Language (Arabic)",
    language_hi: "Language (Hindi)",
    language_ur: "Language (Urdu)",
    language_bn: "Language (Bengali)",

    // candidateList
    candidateList: "Candidate List",
    creatingCandidateList: "Creating Candidate List",
    editingCandidateList: "Editing Candidate List",
    firstNameTooltip: "First Name",
    lastNameTooltip: "Last Name",
    emailTooltip: "Email",
    phoneTooltip: "Phone",
    alternatePhoneTooltip: "Alternate Phone",
    ssnTooltip: "SSN",
    presentAddressTooltip: "Present Address",
    permanentAddressTooltip: "Permanent Address",
    zipCodeTooltip: "Zip Code",
    pictureTooltip: "Picture",
    obtainedDegreeTooltip: "Obtained Degree",
    universityTooltip: "University",
    cgpaTooltip: "CGPA",
    commentTooltip: "Comment",
    experienceLevelTooltip: "Experience Level",
    skillTooltip: "Skill",
    companyNameTooltip: "Company Name",
    workingPeriodTooltip: "Working Period",
    dutiesTooltip: "Duties",
    supervisorTooltip: "Supervisor",
    // candidateSelections
    candidateSelections: "Candidate Selections",
    creatingCandidateSelections: "Creating Candidate Selections",
    editingCandidateSelections: "Editing Candidate Selections",
    employeeNameTooltip: "Employee Name",
    positionTooltip: "Position",
    teamTooltip: "Team",

    // commission
    commission: "Commission",
    creatingCommission: "Creating Commission",
    editingCommission: "Editing Commission",
    designationTooltip: "Designation",
    commissionTooltip: "Commission",

    // leads
    leads: "Leads",
    creatingLeads: "Creating Leads",
    editingLeads: "Editing Leads",
    clientNamerTooltip: "Client Name",
    productGroupTooltip: "Product Group",
    serviceTooltip: "Service",
    budgetTooltip: "Budget",
    priorityTooltip: "Priority",
    startDateTooltip: "Start Date",
    assigneeTooltip: "Assignee",
    contactTooltip: "Contact",
    sourceTooltip: "Source",
    employeesTooltip: "Employees",
    branchesTooltip: "Branches",
    businessTooltip: "Business",
    automationTooltip: "Automation",
    languageTooltip: "Language",
    mobileTooltip: "Mobile",
    whatsappTooltip: "WhatsApp",
    faxTooltip: "Fax",
    countryTooltip: "Country",
    stateTooltip: "State",
    cityTooltip: "City",
    areaTooltip: "Area",
    websiteTooltip: "Website",
    linkedinTooltip: "LinkedIn",
    facebookTooltip: "Facebook",
    instagramTooltip: "Instagram",
    locationTooltip: "Location",
    notesTooltip: "Notes",

    // holiday, increment, retirement
    holiday: "Holiday",
    increments: "Increments",
    retirement: "Retirement",
    creatingHoliday: "Creating Holiday",
    editingHoliday: "Editing Holiday",
    creatingIncrements: "Creating Increments",
    editingIncrements: "Editing Increments",
    creatingRetirement: "Creating Retirement",
    editingRetirement: "Editing Retirement",
    holidayNameTooltip: " Name",
    holidayFromDateTooltip: "From Date",
    holidayEndDateTooltip: "End Date",
    incrementsNameTooltip: " Name",
    incrementsDateTooltip: "Date",
    incrementsAmountTooltip: "Amount",
    incrementsNoteTooltip: "Note",
    iqamaNoTooltip: "Iqama No",
    employeeDesignationTooltip: "Designation",
    employeeBranchTooltip: "Branch",
    retirementNameTooltip: " Retirement",
    retirementDateTooltip: "Date",
    retirementIqamaNoTooltip: "Iqama No",
    retirementEmployeeNameTooltip: "Employee Name",
    retirementEmployeeDesignationTooltip: "Designation",
    retirementEmployeeBranchTooltip: "Branch",
    retirementDetailsTooltip: "Description",
    retirementStatusTooltip: "Status",

    // room size
    roomSize: "Room Size",
    creatingRoomSize: "Creating Room Size",
    editingRoomSize: "Editing Room Size",
    roomSizeTooltip: "Room Size",

    // booking type
    bookingType: "Booking Type",
    creatingBookingType: "Creating Booking Type",
    editingBookingType: "Editing Booking Type",
    bookingTypeTooltip: "Booking Type",

    // rooms
    rooms: "Rooms",
    creatingRooms: "Creating Rooms",
    editingRooms: "Editing Rooms",
    roomTypeTooltip: "Room Type",
    roomSizeNameTooltip: "Room Size",
    capacityTooltip: "Capacity",
    extraCapacityTooltip: "Extra Capacity",
    rateTooltip: "Rate",
    bedChargeTooltip: "Bed Charge",
    personalChargeTooltip: "Personal Charge",
    reviewTooltip: "Review",

    // log booking
    logBooking: "Log Booking",
    creatingLogBooking: "Creating Log Booking",
    editingLogBooking: "Editing Log Booking",
    bookingTooltip: "Booking",
    vehicleTooltip: "Vehicle",
    driverTooltip: "Driver",
    logBookingTooltip: "Log Booking",
    odometersTooltip: "Odometers",

    // drivers
    drivers: "Drivers",
    creatingDrivers: "Creating Drivers",
    editingDrivers: "Editing Drivers",
    employeeTooltip: "Employee",

    // real estate agent
    realEstateAgent: "Real Estate Agent",
    creatingRealEstateAgent: "Creating Real Estate Agent",
    editingRealEstateAgent: "Editing Real Estate Agent",
    profileImageTooltip: "Profile Image",
    nameTooltip: "Name",
    vatNumberTooltip: "VAT Number",
    aboutInformationsTooltip: "About Informations",
    addressTooltip: "Address",
    facebookUrlTooltip: "Facebook URL",
    whatsappUrlTooltip: "WhatsApp URL",
    instagramUrlTooltip: "Instagram URL",
    skypeUrlTooltip: "Skype URL",
    linkedinUrlTooltip: "LinkedIn URL",
    planTooltip: "Plan",
    attachFileTooltip: "Attach File",
    hourlyRateTooltip: "Hourly Rate",
    defaultLanguageTooltip: "Default Language",
    emailSignatureTooltip: "Email Signature",
    directionTooltip: "Direction",
    shiftReportsTooltip: "Shift Reports",
    passwordTooltip: "Password",

    // business broker
    businessBroker: "Business Broker",
    creatingBusinessBroker: "Creating Business Broker",
    editingBusinessBroker: "Editing Business Broker",

    // shipment
    shipment: "Shipment",
    creatingShipment: "Creating Shipment",
    editingShipment: "Editing Shipment",
    shippingPrefixTooltip: "Shipping Prefix",
    numberTooltip: "Number",
    agencyTooltip: "Agency",
    officeOfOriginTooltip: "Office of Origin",
    customerTooltip: "Customer",
    customerAddressTooltip: "Customer Address",
    recipientTooltip: "Recipient",
    recipientAddressTooltip: "Recipient Address",
    logisticServiceTooltip: "Logistic Service",
    paymentTermTooltip: "Payment Term",
    typeofPackageTooltip: "Type of Package",
    courierCompanyTooltip: "Courier Company",
    serviceModeTooltip: "Service Mode",
    deliveryTimeTooltip: "Delivery Time",
    assignDriverTooltip: "Assign Driver",
    currencyTooltip: "Currency",
    currencyRateTooltip: "Currency Rate",
    deliveryStatusTooltip: "Delivery Status",
    invoiceTooltip: "Invoice",
    amountTooltip: "Amount",
    packageDetailsTooltip: "Package Details",
    weightTooltip: "Weight",
    lengthTooltip: "Length",
    widthTooltip: "Width",
    heightTooltip: "Height",
    weightVolTooltip: "Volumetric Weight",
    fixedChargeTooltip: "Fixed Charge",
    DecValueTooltip: "Declared Value",
    TariffFeeTooltip: "Tariff Fee",
    priceKgTooltip: "Price Kg",
    DiscountTooltip: "Discount %",
    valueAssuredTooltip: "Value Assured %",
    shippingInsuranceTooltip: "Shipping Insurance %",
    customDutiesTooltip: "Custom Duties %",
    taxTooltip: "Tax %",
    declaredValueTooltip: "Declared Value %",
    reissueTooltip: "Reissue",

    // journal Entry
    journalEntry: "Journal Entry",
    creatingJournalEntry: "Creating Journal Entry",
    editingJournalEntry: "Editing Journal Entry",
    journalDateTooltip: "Journal Date",
    referenceTooltip: "Reference",
    totalCyclesTooltip: "Total Cycles",
    accountTooltip: "Account",
    debitTooltip: "Debit",
    creditTooltip: "Credit",

    // pickup
    pickup: "Pickup",
    creatingPickup: "Creating Pickup",
    editingPickup: "Editing Pickup",

    // transport master
    transportMaster: "Transport Master",
    creatingTransportMaster: "Creating Transport Master",
    editingTransportMaster: "Editing Transport Master",
    transporterNameTooltip: "Transporter Name",
    landMarkTooltip: "Land Mark",
    notificationTooltip: "Notification",
    contactPersonTooltip: "Contact Person",

    // Supplier Master
    supplierMaster: "Supplier Master",
    creatingSupplierMaster: "Creating Supplier Master",
    editingSupplierMaster: "Editing Supplier Master",
    supplierNameTooltip: "Supplier Name",
    paymentTermsTooltip: "Payment Terms",
    paymentTypeTooltip: "Payment Type",
    dueDayTooltip: "Due Day",
    depositTypeTooltip: "Deposit Type",
    depositAmountTooltip: "Deposit Amount",
    exchangeRateTooltip: "Exchange Rate",
    localAmtTooltip: "Local Amt",
    poBoxTooltip: "PO Box",
    zipTooltip: "Zip",
    // logistic warehouse
    logisticWarehouse: "Logistic Warehouse",
    creatingLogisticWarehouse: "Creating Logistic Warehouse",
    editingLogisticWarehouse: "Editing Logistic Warehouse",

    // receive warehouse logistics
    receiveWarehouseLogistics: "Receive Warehouse Logistics",
    creatingReceiveWarehouseLogistics: "Creating Receive Warehouse Logistics",
    editingReceiveWarehouseLogistics: "Editing Receive Warehouse Logistics",

    // booking list
    bookingList: "Booking List",
    creatingBookingList: "Creating Booking List",
    editingBookingList: "Editing Booking List",
    bookingNoTooltip: "Booking No",
    checkInTooltip: "Check In",
    checkOutTooltip: "Check Out",
    refNoTooltip: "Ref No",
    purposeOfVisitTooltip: "Purpose Of Visit",
    remarksTooltip: "Remarks",
    roomNoTooltip: "Room No",
    adultsTooltip: "Adults",
    childrenTooltip: "Children",

    // job categories
    jobCategories: "Job Categories",
    creatingJobCategories: "Creating Job Categories",
    editingJobCategories: "Editing Job Categories",

    // Booking Sources
    bookingSources: "Booking Sources",
    creatingBookingSources: "Creating Booking Sources",
    editingBookingSources: "Editing Booking Sources",
    BookingSourceTooltip: "Booking Source",
    commissionRateTooltip: "Commission Rate",

    // shifts
    shift: "Shifts",
    creatingShifts: "Creating Shifts",
    editingShifts: "Editing Shifts",
    startTimeTooltip: "Start Time",
    endTimeTooltip: "End Time",

    // assets-maintenances
    assetMaintenances: "Asset Maintenances",
    creatingAssetMaintenances: "Creating Asset Maintenances",
    editingAssetMaintenances: "Editing Asset Maintenances",
    assetTooltip: "Asset",
    maintenanceTypeTooltip: "Maintenance Type",
    completionDateTooltip: "Completion Date",
    warrantyImprovementTooltip: "Warranty Improvement",
    costTooltip: "Cost",

    // membership-rules
    membershipRules: "Membership Rules",
    creatingMembershipRules: "Creating Membership Rules",
    editingMembershipRules: "Editing Membership Rules",
    customerGroupTooltip: "Customer Group",
    cardTooltip: "Card",
    pointFromTooltip: "Point From",
    pointToTooltip: "Point To",
    // loyalty-programs
    loyaltyPrograms: "Loyalty Programs",
    creatingLoyaltyPrograms: "Creating Loyalty Programs",
    editingLoyaltyPrograms: "Editing Loyalty Programs",
    endDateTooltip: "End Date",
    minimumPurchaseTooltip: "Minimum Purchase",
    accountCreationPointTooltip: "Account Creation Point",
    birthdayPointTooltip: "Birthday Point",
    redeemTypeTooltip: "Redeem Type",
    minimumPointToRedeemTooltip: "Minimum Point To Redeem",
    maxAmountReceiveTooltip: "Max Amount Receive",
    redeemInPortalTooltip: "Redeem In Portal",
    redeemInPosTooltip: "Redeem In Pos",
    ruleNameTooltip: "Rule Name",

    //manufacturing orders
    manufacturingOrders: "Manufacturing Orders",
    creatingManufacturingOrders: "Creating Manufacturing Orders",
    editingManufacturingOrders: "Editing Manufacturing Orders",
    productTooltip: "Product",
    quantityTooltip: "Quantity",
    deadlineTooltip: "Deadline",
    planFromTooltip: "Plan From",
    unitOfMeasureTooltip: "Unit Of Measure",
    responsibleTooltip: "Responsible",
    bomCodeTooltip: "Bom Code",
    referenceCodeTooltip: "Reference Code",
    routingTooltip: "Routing",

    // items module
    items: "Items",
    creatingItems: "Creating Items",
    editingItems: "Editing Items",
    addingItem: "Adding Item",
    editingItem: "Edit Item",
    itemCode: "Item Code",
    itemName: "Item Name",
    arabicName: "Arabic Name",
    costPrice: "Cost Price",
    regularPrice: "Regular Price",
    offerPrice: "Offer Price",
    startDate: "Start Date",
    endDate: "End Date",
    openingStock: "Opening Stock",
    category: "Category",
    subCategory: "Sub Category",
    unit: "Unit",
    description: "Description",
    itemCodeTooltip: "Enter the item code (e.g., ITM001)",
    itemNameTooltip: "Enter the item name",
    arabicNameTooltip: "Enter the Arabic name for the item",
    costPriceTooltip: "Enter the cost price",
    regularPriceTooltip: "Enter the regular selling price",
    offerPriceTooltip: "Enter the special offer price",
    openingStockTooltip: "Enter the initial stock quantity",
    categoryTooltip: "Enter the item category",
    subCategoryTooltip: "Enter the item sub category",
    unitTooltip: "Enter the unit of measurement",
    defaultItemTooltip: "Set as default item",
    itemStatusTooltip: "Set the item status",
  },
  ar: {
    date: "Date",
    code: "الرمز",
    calling: "رمز الاتصال",
    country: "البلد",
    insurances: "التأمينات",
    certificates: "الشهادات",
    financialYear: "سنة المالية",
    texRates: "نسب الضريبة",
    default: "افتراضي",
    draft: "مسودة",
    flagPreview: "معاينة العلم",
    dragDropImage: "اسحب وأفلت صورة هنا أو انقر للتحديد",
    reset: "إعادة تعيين",
    submit: "إرسال",
    addingCountry: "إنشاء بلد",
    editingCountry: "تحرير البلد",
    creatingInsurances: "إنشاء التأمينات",
    editingInsurances: "تحرير التأمينات",
    creatingCertificates: "إنشاء الشهادات",
    editingCertificates: "تحرير الشهادات",
    creatingFinancialYear: "إنشاء سنة المالية",
    editingFinancialYear: "تحرير سنة المالية",
    creatingTexRates: "إنشاء نسب الضريبة",
    editingTexRates: "تحرير نسب الضريبة",
    resetForm: "إعادة تعيين النموذج",
    resetFormMessage: "هل أنت متأكد أنك تريد إعادة تعيين هذا النموذج؟",
    resetFormConfirm: "إعادة تعيين النموذج",
    cancel: "إلغاء",
    yes: "نعم",
    no: "لا",
    Yes: "نعم",
    No: "لا",
    callingCodeTooltip: "رمز الاتصال",
    countryNameTooltip: "اسم البلد",
    countryCodeTooltip: "رمز البلد",
    defaultCountryTooltip: "افتراضي البلد",
    statusTooltip: "حالة البلد",
    isdTooltip: "رمز البلد الدولي",
    codeTooltip: "الرمز",
    assetCategory: "Category",
    assetNameTooltip: "Name",
    // rental module
    rentalCategory: "Category",
    rentalNameTooltip: "اسم التاجرة",
    rentalDescriptionTooltip: "وصف التاجرة",
    // rental field
    segTooltip: "SEG",
    agreementNumberTooltip: "رقم الاتفاقية",
    agreementAmountTooltip: "قيمة الاتفاقية",
    agreementNameTooltip: "اسم الاتفاقية",
    agreementTypeTooltip: "نوع الاتفاقية",
    agreementDateTooltip: "تاريخ الاتفاقية",
    installExpireDateTooltip: "تاريخ الانتهاء",
    installmentNoTooltip: "رقم التقسيط",
    installmentAmountTooltip: "قيمة التقسيط",
    installmentPlanTooltip: "خطة التقسيط",
    NotificationDaysTooltip: "وقت الاشعار",
    creatingAssetMaster: "إنشاء مالك",
    editingAssetMaster: "تحرير المالك",
    creatingRental: "إنشاء تاجير",
    editingRental: "تحرير تاجير",
    creatingAsset: "إنشاء مالك",
    editingAsset: "تحرير المالك",
    // insurances
    insuranceNameTooltip: "Insurance",
    insuranceIqamaNoTooltip: "Iqama No",
    insuranceEmployeeNameTooltip: "Employee Name",
    insuranceEmployeeDesignationTooltip: "Designation",
    insuranceEmployeeBranchTooltip: "Branch",
    insuranceDetailsTooltip: "Description",

    language: "اللغة",
    status: "الحالة",
    editingLanguage: "تحرير اللغة",
    addingLanguage: "إضافة لغة",
    sequence: "التسلسل",
    sequenceTooltip: "أدخل رقم تسلسل العرض لهذه اللغة",
    languageCodeTooltip: "أدخل رمز اللغة ISO (مثل en, ar, hi)",
    languageNameTooltip: "أدخل الاسم الكامل للغة",
    defaultLanguage: "اللغة الافتراضية",
    language_ar: "اللغة (العربية)",
    language_hi: "اللغة (الهندية)",
    language_ur: "اللغة (الأردية)",
    language_bn: "اللغة (البنغالية)",

    // certificates
    certificatesNumberTooltip: "Certificate Number",
    certificatesTypeTooltip: "Certificate Type",
    labManagerTooltip: "Lab Manager",
    generalManagerTooltip: "General Manager",

    // financial year
    financialYearTitleTooltip: "Financial Year",
    fromDateTooltip: "From Date",
    toDateTooltip: "To Date",
    financialYearStatusTooltip: "Status",

    // tax rates
    taxRateTooltip: "تحرير المالك",

    // candidateList
    candidateList: "Candidate List",
    creatingCandidateList: "Creating Candidate List",
    editingCandidateList: "Editing Candidate List",
    firstNameTooltip: "First Name",
    lastNameTooltip: "Last Name",
    emailTooltip: "Email",
    phoneTooltip: "Phone",
    alternatePhoneTooltip: "Alternate Phone",
    ssnTooltip: "SSN",
    presentAddressTooltip: "Present Address",
    permanentAddressTooltip: "Permanent Address",
    zipCodeTooltip: "Zip Code",
    pictureTooltip: "Picture",
    obtainedDegreeTooltip: "Obtained Degree",
    universityTooltip: "University",
    cgpaTooltip: "CGPA",
    commentTooltip: "Comment",
    experienceLevelTooltip: "Experience Level",
    skillTooltip: "Skill",
    companyNameTooltip: "Company Name",
    workingPeriodTooltip: "Working Period",
    dutiesTooltip: "Duties",
    supervisorTooltip: "Supervisor",

    // candidateSelections
    candidateSelections: "Candidate Selections",
    creatingCandidateSelections: "Creating Candidate Selections",
    editingCandidateSelections: "Editing Candidate Selections",
    employeeNameTooltip: "Employee Name",
    positionTooltip: "Position",
    teamTooltip: "Team",
    // commission
    commission: "Commission",
    creatingCommission: "Creating Commission",
    editingCommission: "Editing Commission",
    designationTooltip: "Designation",
    commissionTooltip: "Commission",

    // leads
    leads: "العملاء المحتملون",
    creatingLeads: "إنشاء العملاء المحتملين",
    editingLeads: "تعديل العملاء المحتملين",
    clientNamerTooltip: "اسم العميل",
    productGroupTooltip: "مجموعة المنتج",
    serviceTooltip: "الخدمة",
    budgetTooltip: "الميزانية",
    priorityTooltip: "الأولوية",
    startDateTooltip: "تاريخ البدء",
    assigneeTooltip: "المعين",
    contactTooltip: "جهة الاتصال",
    sourceTooltip: "المصدر",
    employeesTooltip: "الموظفون",
    branchesTooltip: "الفروع",
    businessTooltip: "العمل",
    automationTooltip: "التشغيل الآلي",
    languageTooltip: "اللغة",
    mobileTooltip: "الجوال",
    whatsappTooltip: "واتساب",
    faxTooltip: "الفاكس",
    countryTooltip: "البلد",
    stateTooltip: "الولاية",
    cityTooltip: "المدينة",
    areaTooltip: "المنطقة",
    websiteTooltip: "الموقع الإلكتروني",
    linkedinTooltip: "لينكدإن",
    facebookTooltip: "فيسبوك",
    instagramTooltip: "إنستاجرام",
    locationTooltip: "الموقع",
    notesTooltip: "ملاحظات",
    // holiday, increment, retirement
    holiday: "Holiday",
    increments: "Increments",
    retirement: "Retirement",
    creatingHoliday: "Creating Holiday",
    editingHoliday: "Editing Holiday",
    creatingIncrements: "Creating Increments",
    editingIncrements: "Editing Increments",
    creatingRetirement: "Creating Retirement",
    editingRetirement: "Editing Retirement",
    holidayNameTooltip: " Name",
    holidayFromDateTooltip: "From Date",
    holidayEndDateTooltip: "End Date",
    incrementsNameTooltip: " Name",
    incrementsDateTooltip: "Date",
    incrementsAmountTooltip: "Amount",
    incrementsNoteTooltip: "Note",
    iqamaNoTooltip: "Iqama No",
    employeeDesignationTooltip: "Designation",
    employeeBranchTooltip: "Branch",
    retirementNameTooltip: " Retirement",
    retirementDateTooltip: "Date",
    retirementIqamaNoTooltip: "Iqama No",
    retirementEmployeeNameTooltip: "Employee Name",
    retirementEmployeeDesignationTooltip: "Designation",
    retirementEmployeeBranchTooltip: "Branch",
    retirementDetailsTooltip: "Description",
    retirementStatusTooltip: "Status",

    // room size
    roomSize: "Room Size",
    creatingRoomSize: "Creating Room Size",
    editingRoomSize: "Editing Room Size",
    roomSizeTooltip: "Room Size",

    // booking type
    bookingType: "Booking Type",
    creatingBookingType: "Creating Booking Type",
    editingBookingType: "Editing Booking Type",
    bookingTypeTooltip: "Booking Type",

    // rooms
    rooms: "Rooms",
    creatingRooms: "Creating Rooms",
    editingRooms: "Editing Rooms",
    roomTypeTooltip: "Room Type",
    roomSizeNameTooltip: "Room Size",
    capacityTooltip: "Capacity",
    extraCapacityTooltip: "Extra Capacity",
    rateTooltip: "Rate",
    bedChargeTooltip: "Bed Charge",
    personalChargeTooltip: "Personal Charge",
    reviewTooltip: "Review",

    // log booking
    logBooking: "Log Booking",
    creatingLogBooking: "Creating Log Booking",
    editingLogBooking: "Editing Log Booking",
    bookingTooltip: "Booking",
    vehicleTooltip: "Vehicle",
    driverTooltip: "Driver",
    logBookingTooltip: "Log Booking",
    odometersTooltip: "Odometers",

    // drivers
    drivers: "Drivers",
    creatingDrivers: "Creating Drivers",
    editingDrivers: "Editing Drivers",
    employeeTooltip: "Employee",

    // real estate agent
    realEstateAgent: "Real Estate Agent",
    creatingRealEstateAgent: "Creating Real Estate Agent",
    editingRealEstateAgent: "Editing Real Estate Agent",
    profileImageTooltip: "Profile Image",
    // codeTooltip: "Code",
    nameTooltip: "Name",
    vatNumberTooltip: "VAT Number",
    aboutInformationsTooltip: "About Informations",
    addressTooltip: "Address",
    facebookUrlTooltip: "Facebook URL",
    whatsappUrlTooltip: "WhatsApp URL",
    instagramUrlTooltip: "Instagram URL",
    skypeUrlTooltip: "Skype URL",
    linkedinUrlTooltip: "LinkedIn URL",
    planTooltip: "Plan",
    attachFileTooltip: "Attach File",
    hourlyRateTooltip: "Hourly Rate",
    defaultLanguageTooltip: "Default Language",
    emailSignatureTooltip: "Email Signature",
    directionTooltip: "Direction",
    shiftReportsTooltip: "Shift Reports",
    passwordTooltip: "Password",
    // business broker
    businessBroker: "Business Broker",
    creatingBusinessBroker: "Creating Business Broker",
    editingBusinessBroker: "Editing Business Broker",
    // shipment
    shipment: "Shipment",
    creatingShipment: "Creating Shipment",
    editingShipment: "Editing Shipment",
    shippingPrefixTooltip: "Shipping Prefix",
    numberTooltip: "Number",
    agencyTooltip: "Agency",
    officeOfOriginTooltip: "Office of Origin",
    customerTooltip: "Customer",
    customerAddressTooltip: "Customer Address",
    recipientTooltip: "Recipient",
    recipientAddressTooltip: "Recipient Address",
    logisticServiceTooltip: "Logistic Service",
    paymentTermTooltip: "Payment Term",
    typeofPackageTooltip: "Type of Package",
    courierCompanyTooltip: "Courier Company",
    serviceModeTooltip: "Service Mode",
    deliveryTimeTooltip: "Delivery Time",
    assignDriverTooltip: "Assign Driver",
    currencyTooltip: "Currency",
    currencyRateTooltip: "Currency Rate",
    deliveryStatusTooltip: "Delivery Status",
    invoiceTooltip: "Invoice",
    amountTooltip: "Amount",
    packageDetailsTooltip: "Package Details",
    weightTooltip: "Weight",
    lengthTooltip: "Length",
    widthTooltip: "Width",
    heightTooltip: "Height",
    weightVolTooltip: "Volumetric Weight",
    fixedChargeTooltip: "Fixed Charge",
    DecValueTooltip: "Declared Value",
    TariffFeeTooltip: "Tariff Fee",
    priceKgTooltip: "Price per Kg",
    DiscountTooltip: "Discount %",
    valueAssuredTooltip: "Value Assured %",
    shippingInsuranceTooltip: "Shipping Insurance %",
    customDutiesTooltip: "Custom Duties %",
    taxTooltip: "Tax %",
    declaredValueTooltip: "Declared Value %",
    reissueTooltip: "Reissue",
    // journal Entry
    journalEntry: "Journal Entry",
    creatingJournalEntry: "Creating Journal Entry",
    editingJournalEntry: "Editing Journal Entry",
    journalDateTooltip: "Journal Date",
    referenceTooltip: "Reference",
    totalCyclesTooltip: "Total Cycles",
    accountTooltip: "Account",
    debitTooltip: "Debit",
    creditTooltip: "Credit",
    // pickup
    pickup: "Pickup",
    creatingPickup: "Creating Pickup",
    editingPickup: "Editing Pickup",
    // transport master
    transportMaster: "Transport Master",
    creatingTransportMaster: "Creating Transport Master",
    editingTransportMaster: "Editing Transport Master",
    transporterNameTooltip: "Transporter Name",
    landMarkTooltip: "Land Mark",
    notificationTooltip: "Notification",
    contactPersonTooltip: "Contact Person",
    // Supplier Master
    supplierMaster: "Supplier Master",
    creatingSupplierMaster: "Creating Supplier Master",
    editingSupplierMaster: "Editing Supplier Master",
    supplierNameTooltip: "Supplier Name",
    paymentTermsTooltip: "Payment Terms",
    paymentTypeTooltip: "Payment Type",
    dueDayTooltip: "Due Day",
    depositTypeTooltip: "Deposit Type",
    depositAmountTooltip: "Deposit Amount",
    exchangeRateTooltip: "Exchange Rate",
    localAmtTooltip: "Local Amt",
    poBoxTooltip: "PO Box",
    zipTooltip: "Zip",
    // logistic warehouse
    logisticWarehouse: "Logistic Warehouse",
    creatingLogisticWarehouse: "Creating Logistic Warehouse",
    editingLogisticWarehouse: "Editing Logistic Warehouse",
    // receive warehouse logistics
    receiveWarehouseLogistics: "Receive Warehouse Logistics",
    creatingReceiveWarehouseLogistics: "Creating Receive Warehouse Logistics",
    editingReceiveWarehouseLogistics: "Editing Receive Warehouse Logistics",
    // booking list
    bookingList: "Booking List",
    creatingBookingList: "Creating Booking List",
    editingBookingList: "Editing Booking List",
    bookingNoTooltip: "Booking No",
    checkInTooltip: "Check In",
    checkOutTooltip: "Check Out",
    refNoTooltip: "Ref No",
    purposeOfVisitTooltip: "Purpose Of Visit",
    remarksTooltip: "Remarks",
    roomNoTooltip: "Room No",
    adultsTooltip: "Adults",
    childrenTooltip: "Children",
    // job categories
    jobCategories: "Job Categories",
    creatingJobCategories: "Creating Job Categories",
    editingJobCategories: "Editing Job Categories",

    // Booking Sources
    bookingSources: "Booking Sources",
    creatingBookingSources: "Creating Booking Sources",
    editingBookingSources: "Editing Booking Sources",
    BookingSourceTooltip: "Booking Source",
    commissionRateTooltip: "Commission Rate",
    // shifts
    shift: "Shifts",
    creatingShifts: "Creating Shifts",
    editingShifts: "Editing Shifts",
    startTimeTooltip: "Start Time",
    endTimeTooltip: "End Time",
    // assets-maintenances
    assetMaintenances: "Asset Maintenances",
    creatingAssetMaintenances: "Creating Asset Maintenances",
    editingAssetMaintenances: "Editing Asset Maintenances",
    assetTooltip: "Asset",
    maintenanceTypeTooltip: "Maintenance Type",
    completionDateTooltip: "Completion Date",
    warrantyImprovementTooltip: "Warranty Improvement",
    costTooltip: "Cost",
    // membership-rules
    membershipRules: "Membership Rules",
    creatingMembershipRules: "Creating Membership Rules",
    editingMembershipRules: "Editing Membership Rules",
    customerGroupTooltip: "Customer Group",
    cardTooltip: "Card",
    pointFromTooltip: "Point From",
    pointToTooltip: "Point To",
    // loyalty-programs
    loyaltyPrograms: "Loyalty Programs",
    creatingLoyaltyPrograms: "Creating Loyalty Programs",
    editingLoyaltyPrograms: "Editing Loyalty Programs",
    endDateTooltip: "End Date",
    minimumPurchaseTooltip: "Minimum Purchase",
    accountCreationPointTooltip: "Account Creation Point",
    birthdayPointTooltip: "Birthday Point",
    redeemTypeTooltip: "Redeem Type",
    minimumPointToRedeemTooltip: "Minimum Point To Redeem",
    maxAmountReceiveTooltip: "Max Amount Receive",
    redeemInPortalTooltip: "Redeem In Portal",
    redeemInPosTooltip: "Redeem In Pos",
    ruleNameTooltip: "Rule Name",

    //manufacturing orders
    manufacturingOrders: "Manufacturing Orders",
    creatingManufacturingOrders: "Creating Manufacturing Orders",
    editingManufacturingOrders: "Editing Manufacturing Orders",
    productTooltip: "Product",
    quantityTooltip: "Quantity",
    deadlineTooltip: "Deadline",
    planFromTooltip: "Plan From",
    unitOfMeasureTooltip: "Unit Of Measure",
    responsibleTooltip: "Responsible",
    bomCodeTooltip: "Bom Code",
    referenceCodeTooltip: "Reference Code",
    routingTooltip: "Routing",

    // items module
    items: "العناصر",
    creatingItems: "إنشاء العناصر",
    editingItems: "تحرير العناصر",
    addingItem: "إضافة عنصر",
    editingItem: "تحرير العنصر",
    itemCode: "كود العنصر",
    itemName: "اسم العنصر",
    arabicName: "الاسم العربي",
    costPrice: "سعر التكلفة",
    regularPrice: "السعر العادي",
    offerPrice: "سعر العرض",
    startDate: "تاريخ البداية",
    endDate: "تاريخ النهاية",
    openingStock: "المخزون الافتتاحي",
    category: "الفئة",
    subCategory: "الفئة الفرعية",
    unit: "الوحدة",
    description: "الوصف",
    itemCodeTooltip: "أدخل كود العنصر (مثل ITM001)",
    itemNameTooltip: "أدخل اسم العنصر",
    arabicNameTooltip: "أدخل الاسم العربي للعنصر",
    costPriceTooltip: "أدخل سعر التكلفة",
    regularPriceTooltip: "أدخل سعر البيع العادي",
    offerPriceTooltip: "أدخل سعر العرض الخاص",
    openingStockTooltip: "أدخل كمية المخزون الأولية",
    categoryTooltip: "أدخل فئة العنصر",
    subCategoryTooltip: "أدخل الفئة الفرعية للعنصر",
    unitTooltip: "أدخل وحدة القياس",
    defaultItemTooltip: "تعيين كعنصر افتراضي",
    itemStatusTooltip: "تعيين حالة العنصر",
  },
  hi: {
    date: "Date",
    code: "कोड",
    calling: "कॉलिंग",
    country: "देश",
    insurances: "बीमा",
    certificates: "शहादा",
    financialYear: "वित्तीय वर्ष",
    texRates: "टेक्स रेट",
    default: "डिफ़ॉल्ट",
    draft: "ड्राफ्ट",
    flagPreview: "फ्लैग पूर्वावलोकन",
    dragDropImage: "यहाँ एक छवि खींचें और छोड़ें या चुनने के लिए क्लिक करें",
    reset: "रीसेट",
    submit: "सबमिट",
    addingCountry: "देश बना रहे हैं",
    editingCountry: "देश संपादित कर रहे हैं",
    creatingInsurances: "बीमा बना रहे हैं",
    editingInsurances: "बीमा संपादित कर रहे हैं",
    creatingCertificates: "शहादा बना रहे हैं",
    editingCertificates: "शहादा संपादित कर रहे हैं",
    creatingFinancialYear: "वित्तीय वर्ष बना रहे हैं",
    editingFinancialYear: "वित्तीय वर्ष संपादित कर रहे हैं",
    creatingTexRates: "टेक्स रेट बना रहे हैं",
    editingTexRates: "टेक्स रेट संपादित कर रहे हैं",
    resetForm: "फॉर्म रीसेट करें",
    resetFormMessage: "क्या आप वाकई इस फॉर्म को रीसेट करना चाहते हैं?",
    resetFormConfirm: "फॉर्म रीसेट करें",
    cancel: "रद्द करें",
    yes: "हाँ",
    no: "नहीं",
    Yes: "हाँ",
    No: "नहीं",
    callingCodeTooltip: "कॉलिंग कोड",
    countryNameTooltip: "देश का नाम",
    countryCodeTooltip: "देश का कोड",
    defaultCountryTooltip: "देश डिफ़ॉल्ट",
    statusTooltip: "देश की स्थिति",
    isdTooltip: "देश ISD",
    codeTooltip: "कोड",
    assetNameTooltip: "संपादित कर रहे हैं",
    assetCategory: "क्याटेगरी",
    // rental module
    rentalCategory: "क्याटेगरी",
    rentalNameTooltip: "संपादित कर रहे हैं",
    rentalDescriptionTooltip: "विवरण",
    // rental field
    segTooltip: "SEG",
    agreementNumberTooltip: "संपादित कर रहे हैं",
    agreementAmountTooltip: "संपादित कर रहे हैं",
    agreementNameTooltip: "संपादित कर रहे हैं",
    agreementTypeTooltip: "संपादित कर रहे हैं",
    agreementDateTooltip: "संपादित कर रहे हैं",
    installExpireDateTooltip: "संपादित कर रहे हैं",
    installmentNoTooltip: "संपादित कर रहे हैं",
    installmentAmountTooltip: "संपादित कर रहे हैं",
    installmentPlanTooltip: "संपादित कर रहे हैं",
    NotificationDaysTooltip: "संपादित कर रहे हैं",
    creatingAssetMaster: "Creating Asset Master",
    editingAssetMaster: "Editing Asset Master",
    creatingRental: "Creating Rental",
    editingRental: "Editing Rental",
    creatingAsset: "Creating Asset",
    editingAsset: "Editing Asset",
    // insurances
    insuranceNameTooltip: "Insurance",
    insuranceIqamaNoTooltip: "Iqama No",
    insuranceEmployeeNameTooltip: "Employee Name",
    insuranceEmployeeDesignationTooltip: "Designation",
    insuranceEmployeeBranchTooltip: "Branch",
    insuranceDetailsTooltip: "Description",

    language: "भाषा",
    status: "स्थिति",
    editingLanguage: "भाषा संपादित करना",
    addingLanguage: "भाषा जोड़ना",
    sequence: "क्रम",
    sequenceTooltip: "इस भाषा के लिए प्रदर्शन क्रम संख्या दर्ज करें",
    languageCodeTooltip: "ISO भाषा कोड दर्ज करें (जैसे en, ar, hi)",
    languageNameTooltip: "भाषा का पूरा नाम दर्ज करें",
    defaultLanguage: "डिफ़ॉल्ट भाषा",
    language_ar: "भाषा (अरबी)",
    language_hi: "भाषा (हिंदी)",
    language_ur: "भाषा (उर्दू)",
    language_bn: "भाषा (बंगाली)",

    // certificates
    certificatesNumberTooltip: "Certificate Number",
    certificatesTypeTooltip: "Certificate Type",
    labManagerTooltip: "Lab Manager",
    generalManagerTooltip: "General Manager",

    // financial year
    financialYearTitleTooltip: "Financial Year",
    fromDateTooltip: "From Date",
    toDateTooltip: "To Date",
    financialYearStatusTooltip: "Status",

    // tax rates
    taxRateTooltip: "Tax Rate",
    // candidateList
    candidateList: "Candidate List",
    creatingCandidateList: "Creating Candidate List",
    editingCandidateList: "Editing Candidate List",
    firstNameTooltip: "First Name",
    lastNameTooltip: "Last Name",
    emailTooltip: "Email",
    phoneTooltip: "Phone",
    alternatePhoneTooltip: "Alternate Phone",
    ssnTooltip: "SSN",
    presentAddressTooltip: "Present Address",
    permanentAddressTooltip: "Permanent Address",
    zipCodeTooltip: "Zip Code",
    pictureTooltip: "Picture",
    obtainedDegreeTooltip: "Obtained Degree",
    universityTooltip: "University",
    cgpaTooltip: "CGPA",
    commentTooltip: "Comment",
    experienceLevelTooltip: "Experience Level",
    skillTooltip: "Skill",
    companyNameTooltip: "Company Name",
    workingPeriodTooltip: "Working Period",
    dutiesTooltip: "Duties",
    supervisorTooltip: "Supervisor",
    // candidateSelections
    candidateSelections: "Candidate Selections",
    creatingCandidateSelections: "Creating Candidate Selections",
    editingCandidateSelections: "Editing Candidate Selections",
    employeeNameTooltip: "Employee Name",
    positionTooltip: "Position",
    teamTooltip: "Team",
    // commission
    commission: "Commission",
    creatingCommission: "Creating Commission",
    editingCommission: "Editing Commission",
    designationTooltip: "Designation",
    commissionTooltip: "Commission",

    // leads
    leads: "लीड्स",
    creatingLeads: "लीड बना रहे हैं",
    editingLeads: "लीड संपादित कर रहे हैं",
    clientNamerTooltip: "ग्राहक का नाम",
    productGroupTooltip: "उत्पाद समूह",
    serviceTooltip: "सेवा",
    budgetTooltip: "बजट",
    priorityTooltip: "प्राथमिकता",
    startDateTooltip: "प्रारंभ तिथि",
    assigneeTooltip: "असाइन किया गया",
    contactTooltip: "संपर्क",
    sourceTooltip: "स्रोत",
    employeesTooltip: "कर्मचारी",
    branchesTooltip: "शाखाएँ",
    businessTooltip: "व्यवसाय",
    automationTooltip: "स्वचालन",
    languageTooltip: "भाषा",
    mobileTooltip: "मोबाइल",
    whatsappTooltip: "व्हाट्सएप",
    faxTooltip: "फैक्स",
    countryTooltip: "देश",
    stateTooltip: "राज्य",
    cityTooltip: "शहर",
    areaTooltip: "क्षेत्र",
    websiteTooltip: "वेबसाइट",
    linkedinTooltip: "लिंक्डइन",
    facebookTooltip: "फेसबुक",
    instagramTooltip: "इंस्टाग्राम",
    locationTooltip: "स्थान",
    notesTooltip: "नोट्स",
    // holiday, increment, retirement
    holiday: "Holiday",
    increments: "Increments",
    retirement: "Retirement",
    creatingHoliday: "Creating Holiday",
    editingHoliday: "Editing Holiday",
    creatingIncrements: "Creating Increments",
    editingIncrements: "Editing Increments",
    creatingRetirement: "Creating Retirement",
    editingRetirement: "Editing Retirement",
    holidayNameTooltip: " Name",
    holidayFromDateTooltip: "From Date",
    holidayEndDateTooltip: "End Date",
    incrementsNameTooltip: " Name",
    incrementsDateTooltip: "Date",
    incrementsAmountTooltip: "Amount",
    incrementsNoteTooltip: "Note",
    iqamaNoTooltip: "Iqama No",
    employeeDesignationTooltip: "Designation",
    employeeBranchTooltip: "Branch",
    retirementNameTooltip: " Retirement",
    retirementDateTooltip: "Date",
    retirementIqamaNoTooltip: "Iqama No",
    retirementEmployeeNameTooltip: "Employee Name",
    retirementEmployeeDesignationTooltip: "Designation",
    retirementEmployeeBranchTooltip: "Branch",
    retirementDetailsTooltip: "Description",
    retirementStatusTooltip: "Status",

    // room size
    roomSize: "Room Size",
    creatingRoomSize: "Creating Room Size",
    editingRoomSize: "Editing Room Size",
    roomSizeTooltip: "Room Size",

    // booking type
    bookingType: "Booking Type",
    creatingBookingType: "Creating Booking Type",
    editingBookingType: "Editing Booking Type",
    bookingTypeTooltip: "Booking Type",

    // rooms
    rooms: "Rooms",
    creatingRooms: "Creating Rooms",
    editingRooms: "Editing Rooms",
    roomTypeTooltip: "Room Type",
    roomSizeNameTooltip: "Room Size",
    capacityTooltip: "Capacity",
    extraCapacityTooltip: "Extra Capacity",
    rateTooltip: "Rate",
    bedChargeTooltip: "Bed Charge",
    personalChargeTooltip: "Personal Charge",
    reviewTooltip: "Review",

    // log booking
    logBooking: "Log Booking",
    creatingLogBooking: "Creating Log Booking",
    editingLogBooking: "Editing Log Booking",
    bookingTooltip: "Booking",
    vehicleTooltip: "Vehicle",
    driverTooltip: "Driver",
    logBookingTooltip: "Log Booking",
    odometersTooltip: "Odometers",

    // drivers
    drivers: "Drivers",
    creatingDrivers: "Creating Drivers",
    editingDrivers: "Editing Drivers",
    employeeTooltip: "Employee",

    // real estate agent
    realEstateAgent: "Real Estate Agent",
    creatingRealEstateAgent: "Creating Real Estate Agent",
    editingRealEstateAgent: "Editing Real Estate Agent",
    profileImageTooltip: "Profile Image",
    // codeTooltip: "Code",
    nameTooltip: "Name",
    vatNumberTooltip: "VAT Number",
    aboutInformationsTooltip: "About Informations",
    addressTooltip: "Address",
    facebookUrlTooltip: "Facebook URL",
    whatsappUrlTooltip: "WhatsApp URL",
    instagramUrlTooltip: "Instagram URL",
    skypeUrlTooltip: "Skype URL",
    linkedinUrlTooltip: "LinkedIn URL",
    planTooltip: "Plan",
    attachFileTooltip: "Attach File",
    hourlyRateTooltip: "Hourly Rate",
    defaultLanguageTooltip: "Default Language",
    emailSignatureTooltip: "Email Signature",
    directionTooltip: "Direction",
    shiftReportsTooltip: "Shift Reports",
    passwordTooltip: "Password",

    // business broker
    businessBroker: "Business Broker",
    creatingBusinessBroker: "Creating Business Broker",
    editingBusinessBroker: "Editing Business Broker",
    // shipment
    shipment: "Shipment",
    creatingShipment: "Creating Shipment",
    editingShipment: "Editing Shipment",
    shippingPrefixTooltip: "Shipping Prefix",
    numberTooltip: "Number",
    agencyTooltip: "Agency",
    officeOfOriginTooltip: "Office of Origin",
    customerTooltip: "Customer",
    customerAddressTooltip: "Customer Address",
    recipientTooltip: "Recipient",
    recipientAddressTooltip: "Recipient Address",
    logisticServiceTooltip: "Logistic Service",
    paymentTermTooltip: "Payment Term",
    typeofPackageTooltip: "Type of Package",
    courierCompanyTooltip: "Courier Company",
    serviceModeTooltip: "Service Mode",
    deliveryTimeTooltip: "Delivery Time",
    assignDriverTooltip: "Assign Driver",
    currencyTooltip: "Currency",
    currencyRateTooltip: "Currency Rate",
    deliveryStatusTooltip: "Delivery Status",
    invoiceTooltip: "Invoice",
    amountTooltip: "Amount",
    packageDetailsTooltip: "Package Details",
    weightTooltip: "Weight",
    lengthTooltip: "Length",
    widthTooltip: "Width",
    heightTooltip: "Height",
    weightVolTooltip: "Volumetric Weight",
    fixedChargeTooltip: "Fixed Charge",
    DecValueTooltip: "Declared Value",
    TariffFeeTooltip: "Tariff Fee",
    priceKgTooltip: "Price per Kg",
    DiscountTooltip: "Discount %",
    valueAssuredTooltip: "Value Assured %",
    shippingInsuranceTooltip: "Shipping Insurance %",
    customDutiesTooltip: "Custom Duties %",
    taxTooltip: "Tax %",
    declaredValueTooltip: "Declared Value %",
    reissueTooltip: "Reissue",
    // journal Entry
    journalEntry: "Journal Entry",
    creatingJournalEntry: "Creating Journal Entry",
    editingJournalEntry: "Editing Journal Entry",
    journalDateTooltip: "Journal Date",
    referenceTooltip: "Reference",
    totalCyclesTooltip: "Total Cycles",
    accountTooltip: "Account",
    debitTooltip: "Debit",
    creditTooltip: "Credit",
    // pickup
    pickup: "Pickup",
    creatingPickup: "Creating Pickup",
    editingPickup: "Editing Pickup",
    // transport master
    transportMaster: "Transport Master",
    creatingTransportMaster: "Creating Transport Master",
    editingTransportMaster: "Editing Transport Master",
    transporterNameTooltip: "Transporter Name",
    landMarkTooltip: "Land Mark",
    notificationTooltip: "Notification",
    contactPersonTooltip: "Contact Person",
    // Supplier Master
    supplierMaster: "Supplier Master",
    creatingSupplierMaster: "Creating Supplier Master",
    editingSupplierMaster: "Editing Supplier Master",
    supplierNameTooltip: "Supplier Name",
    paymentTermsTooltip: "Payment Terms",
    paymentTypeTooltip: "Payment Type",
    dueDayTooltip: "Due Day",
    depositTypeTooltip: "Deposit Type",
    depositAmountTooltip: "Deposit Amount",
    exchangeRateTooltip: "Exchange Rate",
    localAmtTooltip: "Local Amt",
    poBoxTooltip: "PO Box",
    zipTooltip: "Zip",
    // logistic warehouse
    logisticWarehouse: "Logistic Warehouse",
    creatingLogisticWarehouse: "Creating Logistic Warehouse",
    editingLogisticWarehouse: "Editing Logistic Warehouse",
    // receive warehouse logistics
    receiveWarehouseLogistics: "Receive Warehouse Logistics",
    creatingReceiveWarehouseLogistics: "Creating Receive Warehouse Logistics",
    editingReceiveWarehouseLogistics: "Editing Receive Warehouse Logistics",
    // booking list
    bookingList: "Booking List",
    creatingBookingList: "Creating Booking List",
    editingBookingList: "Editing Booking List",
    bookingNoTooltip: "Booking No",
    checkInTooltip: "Check In",
    checkOutTooltip: "Check Out",
    refNoTooltip: "Ref No",
    purposeOfVisitTooltip: "Purpose Of Visit",
    remarksTooltip: "Remarks",
    roomNoTooltip: "Room No",
    adultsTooltip: "Adults",
    childrenTooltip: "Children",
    // job categories
    jobCategories: "Job Categories",
    creatingJobCategories: "Creating Job Categories",
    editingJobCategories: "Editing Job Categories",

    // Booking Sources
    bookingSources: "Booking Sources",
    creatingBookingSources: "Creating Booking Sources",
    editingBookingSources: "Editing Booking Sources",
    BookingSourceTooltip: "Booking Source",
    commissionRateTooltip: "Commission Rate",
    // shifts
    shift: "Shifts",
    creatingShifts: "Creating Shifts",
    editingShifts: "Editing Shifts",
    startTimeTooltip: "Start Time",
    endTimeTooltip: "End Time",
    // assets-maintenances
    assetMaintenances: "Asset Maintenances",
    creatingAssetMaintenances: "Creating Asset Maintenances",
    editingAssetMaintenances: "Editing Asset Maintenances",
    assetTooltip: "Asset",
    maintenanceTypeTooltip: "Maintenance Type",
    completionDateTooltip: "Completion Date",
    warrantyImprovementTooltip: "Warranty Improvement",
    costTooltip: "Cost",
    // membership-rules
    membershipRules: "Membership Rules",
    creatingMembershipRules: "Creating Membership Rules",
    editingMembershipRules: "Editing Membership Rules",
    customerGroupTooltip: "Customer Group",
    cardTooltip: "Card",
    pointFromTooltip: "Point From",
    pointToTooltip: "Point To",
    // loyalty-programs
    loyaltyPrograms: "Loyalty Programs",
    creatingLoyaltyPrograms: "Creating Loyalty Programs",
    editingLoyaltyPrograms: "Editing Loyalty Programs",
    endDateTooltip: "End Date",
    minimumPurchaseTooltip: "Minimum Purchase",
    accountCreationPointTooltip: "Account Creation Point",
    birthdayPointTooltip: "Birthday Point",
    redeemTypeTooltip: "Redeem Type",
    minimumPointToRedeemTooltip: "Minimum Point To Redeem",
    maxAmountReceiveTooltip: "Max Amount Receive",
    redeemInPortalTooltip: "Redeem In Portal",
    redeemInPosTooltip: "Redeem In Pos",
    ruleNameTooltip: "Rule Name",

    //manufacturing orders
    manufacturingOrders: "Manufacturing Orders",
    creatingManufacturingOrders: "Creating Manufacturing Orders",
    editingManufacturingOrders: "Editing Manufacturing Orders",
    productTooltip: "Product",
    quantityTooltip: "Quantity",
    deadlineTooltip: "Deadline",
    planFromTooltip: "Plan From",
    unitOfMeasureTooltip: "Unit Of Measure",
    responsibleTooltip: "Responsible",
    bomCodeTooltip: "Bom Code",
    referenceCodeTooltip: "Reference Code",
    routingTooltip: "Routing",

    // items module
    items: "आइटम",
    creatingItems: "आइटम बनाना",
    editingItems: "आइटम संपादित करना",
    addingItem: "आइटम जोड़ना",
    editingItem: "आइटम संपादित करें",
    itemCode: "आइटम कोड",
    itemName: "आइटम नाम",
    arabicName: "अरबी नाम",
    costPrice: "लागत मूल्य",
    regularPrice: "नियमित मूल्य",
    offerPrice: "ऑफर मूल्य",
    startDate: "प्रारंभ तिथि",
    endDate: "समाप्ति तिथि",
    openingStock: "प्रारंभिक स्टॉक",
    category: "श्रेणी",
    subCategory: "उप श्रेणी",
    unit: "इकाई",
    description: "विवरण",
    itemCodeTooltip: "आइटम कोड दर्ज करें (जैसे ITM001)",
    itemNameTooltip: "आइटम नाम दर्ज करें",
    arabicNameTooltip: "आइटम के लिए अरबी नाम दर्ज करें",
    costPriceTooltip: "लागत मूल्य दर्ज करें",
    regularPriceTooltip: "नियमित बिक्री मूल्य दर्ज करें",
    offerPriceTooltip: "विशेष ऑफर मूल्य दर्ज करें",
    openingStockTooltip: "प्रारंभिक स्टॉक मात्रा दर्ज करें",
    categoryTooltip: "आइटम श्रेणी दर्ज करें",
    subCategoryTooltip: "आइटम उप श्रेणी दर्ज करें",
    unitTooltip: "माप की इकाई दर्ज करें",
    defaultItemTooltip: "डिफ़ॉल्ट आइटम के रूप में सेट करें",
    itemStatusTooltip: "आइटम स्थिति सेट करें",
  },
  ur: {
    date: "Date",
    code: "کوڈ",
    calling: "کالنگ",
    country: "ملک",
    insurances: "بیما",
    certificates: "شہادہ",
    financialYear: "ویٹر سال",
    texRates: "ٹیکس ریٹ",
    default: "ڈیفالٹ",
    draft: "ڈرافٹ",
    flagPreview: "پرچم کا پیش منظر",
    dragDropImage:
      "یہاں ایک تصویر کھینچیں اور چھوڑیں یا منتخب کرنے کے لیے کلک کریں",
    reset: "ری سیٹ",
    submit: "جمع کریں",
    addingCountry: "ملک بنا رہے ہیں",
    editingCountry: "ملک میں ترمیم",
    creatingInsurances: "بیما بنا رہے ہیں",
    editingInsurances: "بیما میں ترمیم",
    creatingCertificates: "شہادہ بنا رہے ہیں",
    editingCertificates: "شہادہ میں ترمیم",
    creatingFinancialYear: "ویٹر سال بنا رہے ہیں",
    editingFinancialYear: "ویٹر سال میں ترمیم",
    creatingTexRates: "ٹیکس ریٹ بنا رہے ہیں",
    editingTexRates: "ٹیکس ریٹ میں ترمیم",
    resetForm: "فارم ری سیٹ کریں",
    resetFormMessage: "کیا آپ واقعی اس فارم کو ری سیٹ کرنا چاہتے ہیں؟",
    resetFormConfirm: "فارم ری سیٹ کریں",
    cancel: "منسوخ",
    yes: "جی ہاں",
    no: "نہیں",
    Yes: "جی ہاں",
    No: "نہیں",
    callingCodeTooltip: "کالنگ کوڈ",
    countryNameTooltip: "ملک کا نام",
    countryCodeTooltip: "ملک کا کوڈ",
    defaultCountryTooltip: "ملک ڈیفالٹ",
    statusTooltip: "ملک کی حالت",
    isdTooltip: "ملک ISD",
    codeTooltip: "کوڈ",
    assetNameTooltip: "میں ترمیم",
    assetCategory: "کیٹیگری",
    // rental module
    rentalCategory: "کیٹیگری",
    rentalNameTooltip: "سیٹیگری",
    rentalDescriptionTooltip: "تفصیل",
    // rental field
    segTooltip: "",
    agreementNumberTooltip: "سیٹیگری",
    agreementAmountTooltip: "संपादित कर रहे हैं",
    agreementNameTooltip: "संपादित कर रहे हैं",
    agreementTypeTooltip: "संपादित कर रहे हैं",
    agreementDateTooltip: "संपादित कर रहे हैं",
    installExpireDateTooltip: "संपादित कर रहे हैं",
    installmentNoTooltip: "संपादित कर रहे हैं",
    installmentAmountTooltip: "संपादित कर रहे हैं",
    installmentPlanTooltip: "संपादित कर रहे हैं",
    NotificationDaysTooltip: "সंপাদিত করা হচ্ছে",
    creatingAssetMaster: "Creating Asset Master",
    editingAssetMaster: "Editing Asset Master",
    creatingRental: "Creating Rental",
    editingRental: "Editing Rental",
    creatingAsset: "Creating Asset",
    editingAsset: "Editing Asset",
    // insurances
    insuranceNameTooltip: "Insurance",
    insuranceIqamaNoTooltip: "Iqama No",
    insuranceEmployeeNameTooltip: "Employee Name",
    insuranceEmployeeDesignationTooltip: "Designation",
    insuranceEmployeeBranchTooltip: "Branch",
    insuranceDetailsTooltip: "Description",

    // certificates
    certificatesNumberTooltip: "Certificate Number",
    certificatesTypeTooltip: "Certificate Type",
    labManagerTooltip: "Lab Manager",
    generalManagerTooltip: "General Manager",

    // financial year
    financialYearTitleTooltip: "Financial Year",
    fromDateTooltip: "From Date",
    toDateTooltip: "To Date",
    financialYearStatusTooltip: "Status",

    // tax rates
    taxRateTooltip: "Tax Rate",

    // candidateList
    candidateList: "Candidate List",
    creatingCandidateList: "Creating Candidate List",
    editingCandidateList: "Editing Candidate List",
    firstNameTooltip: "First Name",
    lastNameTooltip: "Last Name",
    emailTooltip: "Email",
    phoneTooltip: "Phone",
    alternatePhoneTooltip: "Alternate Phone",
    ssnTooltip: "SSN",
    presentAddressTooltip: "Present Address",
    permanentAddressTooltip: "Permanent Address",
    zipCodeTooltip: "Zip Code",
    pictureTooltip: "Picture",
    obtainedDegreeTooltip: "Obtained Degree",
    universityTooltip: "University",
    cgpaTooltip: "CGPA",
    commentTooltip: "Comment",
    experienceLevelTooltip: "Experience Level",
    skillTooltip: "Skill",
    companyNameTooltip: "Company Name",
    workingPeriodTooltip: "Working Period",
    dutiesTooltip: "Duties",
    supervisorTooltip: "Supervisor",
    // candidateSelections
    candidateSelections: "Candidate Selections",
    creatingCandidateSelections: "Creating Candidate Selections",
    editingCandidateSelections: "Editing Candidate Selections",
    employeeNameTooltip: "Employee Name",
    positionTooltip: "Position",
    teamTooltip: "Team",
    // commission
    commission: "Commission",
    creatingCommission: "Creating Commission",
    editingCommission: "Editing Commission",
    designationTooltip: "Designation",
    commissionTooltip: "Commission",

    language: "زبان",
    status: "حالت",
    editingLanguage: "زبان میں تبدیلی",
    addingLanguage: "زبان شامل کرنا",
    sequence: "ترتیب",
    sequenceTooltip: "اس زبان کے لیے ڈسپلے آرڈر کا نمبر داخل کریں",
    languageCodeTooltip: "ISO زبان کا کوڈ داخل کریں (جیسے en, ar, hi)",
    languageNameTooltip: "زبان کا مکمل نام داخل کریں",
    defaultLanguage: "ڈیفالٹ زبان",
    language_ar: "زبان (عربی)",
    language_hi: "زبان (ہندی)",
    language_ur: "زبان (اردو)",
    language_bn: "زبان (بنگالی)",

    // leads
    leads: "لیڈز",
    creatingLeads: "لیڈز بنا رہے ہیں",
    editingLeads: "لیڈز میں ترمیم کر رہے ہیں",
    clientNamerTooltip: "گاہک کا نام",
    productGroupTooltip: "پروڈکٹ گروپ",
    serviceTooltip: "سروس",
    budgetTooltip: "بجٹ",
    priorityTooltip: "ترجیح",
    startDateTooltip: "شروع ہونے کی تاریخ",
    assigneeTooltip: "اسائن کیا ہوا",
    contactTooltip: "رابطہ",
    sourceTooltip: "ذریعہ",
    employeesTooltip: "ملازمین",
    branchesTooltip: "شاخیں",
    businessTooltip: "کاروبار",
    automationTooltip: "آٹومیشن",
    languageTooltip: "زبان",
    mobileTooltip: "موبائل",
    whatsappTooltip: "واٹس ایپ",
    faxTooltip: "فیکس",
    countryTooltip: "ملک",
    stateTooltip: "ریاست",
    cityTooltip: "شہر",
    areaTooltip: "علاقہ",
    websiteTooltip: "ویب سائٹ",
    linkedinTooltip: "لنکڈ ان",
    facebookTooltip: "فیس بک",
    instagramTooltip: "انسٹاگرام",
    locationTooltip: "مقام",
    notesTooltip: "نوٹس",
    // holiday, increment, retirement
    holiday: "Holiday",
    increments: "Increments",
    retirement: "Retirement",
    creatingHoliday: "Creating Holiday",
    editingHoliday: "Editing Holiday",
    creatingIncrements: "Creating Increments",
    editingIncrements: "Editing Increments",
    creatingRetirement: "Creating Retirement",
    editingRetirement: "Editing Retirement",
    holidayNameTooltip: " Name",
    holidayFromDateTooltip: "From Date",
    holidayEndDateTooltip: "End Date",
    incrementsNameTooltip: " Name",
    incrementsDateTooltip: "Date",
    incrementsAmountTooltip: "Amount",
    incrementsNoteTooltip: "Note",
    iqamaNoTooltip: "Iqama No",
    employeeDesignationTooltip: "Designation",
    employeeBranchTooltip: "Branch",
    retirementNameTooltip: " Retirement",
    retirementDateTooltip: "Date",
    retirementIqamaNoTooltip: "Iqama No",
    retirementEmployeeNameTooltip: "Employee Name",
    retirementEmployeeDesignationTooltip: "Designation",
    retirementEmployeeBranchTooltip: "Branch",
    retirementDetailsTooltip: "Description",
    retirementStatusTooltip: "Status",

    // room size
    roomSize: "Room Size",
    creatingRoomSize: "Creating Room Size",
    editingRoomSize: "Editing Room Size",
    roomSizeTooltip: "Room Size",

    // booking type
    bookingType: "Booking Type",
    creatingBookingType: "Creating Booking Type",
    editingBookingType: "Editing Booking Type",
    bookingTypeTooltip: "Booking Type",

    // rooms
    rooms: "Rooms",
    creatingRooms: "Creating Rooms",
    editingRooms: "Editing Rooms",
    roomTypeTooltip: "Room Type",
    roomSizeNameTooltip: "Room Size",
    capacityTooltip: "Capacity",
    extraCapacityTooltip: "Extra Capacity",
    rateTooltip: "Rate",
    bedChargeTooltip: "Bed Charge",
    personalChargeTooltip: "Personal Charge",
    reviewTooltip: "Review",

    // log booking
    logBooking: "Log Booking",
    creatingLogBooking: "Creating Log Booking",
    editingLogBooking: "Editing Log Booking",
    bookingTooltip: "Booking",
    vehicleTooltip: "Vehicle",
    driverTooltip: "Driver",
    logBookingTooltip: "Log Booking",
    odometersTooltip: "Odometers",

    // drivers
    drivers: "Drivers",
    creatingDrivers: "Creating Drivers",
    editingDrivers: "Editing Drivers",
    employeeTooltip: "Employee",

    // real estate agent
    realEstateAgent: "Real Estate Agent",
    creatingRealEstateAgent: "Creating Real Estate Agent",
    editingRealEstateAgent: "Editing Real Estate Agent",
    profileImageTooltip: "Profile Image",
    // codeTooltip: "Code",
    nameTooltip: "Name",
    vatNumberTooltip: "VAT Number",
    aboutInformationsTooltip: "About Informations",
    addressTooltip: "Address",
    facebookUrlTooltip: "Facebook URL",
    whatsappUrlTooltip: "WhatsApp URL",
    instagramUrlTooltip: "Instagram URL",
    skypeUrlTooltip: "Skype URL",
    linkedinUrlTooltip: "LinkedIn URL",
    planTooltip: "Plan",
    attachFileTooltip: "Attach File",
    hourlyRateTooltip: "Hourly Rate",
    defaultLanguageTooltip: "Default Language",
    emailSignatureTooltip: "Email Signature",
    directionTooltip: "Direction",
    shiftReportsTooltip: "Shift Reports",
    passwordTooltip: "Password",

    // business broker
    businessBroker: "Business Broker",
    creatingBusinessBroker: "Creating Business Broker",
    editingBusinessBroker: "Editing Business Broker",
    // shipment
    shipment: "Shipment",
    creatingShipment: "Creating Shipment",
    editingShipment: "Editing Shipment",
    shippingPrefixTooltip: "Shipping Prefix",
    numberTooltip: "Number",
    agencyTooltip: "Agency",
    officeOfOriginTooltip: "Office of Origin",
    customerTooltip: "Customer",
    customerAddressTooltip: "Customer Address",
    recipientTooltip: "Recipient",
    recipientAddressTooltip: "Recipient Address",
    logisticServiceTooltip: "Logistic Service",
    paymentTermTooltip: "Payment Term",
    typeofPackageTooltip: "Type of Package",
    courierCompanyTooltip: "Courier Company",
    serviceModeTooltip: "Service Mode",
    deliveryTimeTooltip: "Delivery Time",
    assignDriverTooltip: "Assign Driver",
    currencyTooltip: "Currency",
    currencyRateTooltip: "Currency Rate",
    deliveryStatusTooltip: "Delivery Status",
    invoiceTooltip: "Invoice",
    amountTooltip: "Amount",
    packageDetailsTooltip: "Package Details",
    weightTooltip: "Weight",
    lengthTooltip: "Length",
    widthTooltip: "Width",
    heightTooltip: "Height",
    weightVolTooltip: "Volumetric Weight",
    fixedChargeTooltip: "Fixed Charge",
    DecValueTooltip: "Declared Value",
    TariffFeeTooltip: "Tariff Fee",
    priceKgTooltip: "Price per Kg",
    DiscountTooltip: "Discount %",
    valueAssuredTooltip: "Value Assured %",
    shippingInsuranceTooltip: "Shipping Insurance %",
    customDutiesTooltip: "Custom Duties %",
    taxTooltip: "Tax %",
    declaredValueTooltip: "Declared Value %",
    reissueTooltip: "Reissue",
    // journal Entry
    journalEntry: "Journal Entry",
    creatingJournalEntry: "Creating Journal Entry",
    editingJournalEntry: "Editing Journal Entry",
    journalDateTooltip: "Journal Date",
    referenceTooltip: "Reference",
    totalCyclesTooltip: "Total Cycles",
    accountTooltip: "Account",
    debitTooltip: "Debit",
    creditTooltip: "Credit",
    // pickup
    pickup: "Pickup",
    creatingPickup: "Creating Pickup",
    editingPickup: "Editing Pickup",
    // transport master
    transportMaster: "Transport Master",
    creatingTransportMaster: "Creating Transport Master",
    editingTransportMaster: "Editing Transport Master",
    transporterNameTooltip: "Transporter Name",
    landMarkTooltip: "Land Mark",
    notificationTooltip: "Notification",
    contactPersonTooltip: "Contact Person",
    // Supplier Master
    supplierMaster: "Supplier Master",
    creatingSupplierMaster: "Creating Supplier Master",
    editingSupplierMaster: "Editing Supplier Master",
    supplierNameTooltip: "Supplier Name",
    paymentTermsTooltip: "Payment Terms",
    paymentTypeTooltip: "Payment Type",
    dueDayTooltip: "Due Day",
    depositTypeTooltip: "Deposit Type",
    depositAmountTooltip: "Deposit Amount",
    exchangeRateTooltip: "Exchange Rate",
    localAmtTooltip: "Local Amt",
    poBoxTooltip: "PO Box",
    zipTooltip: "Zip",
    // logistic warehouse
    logisticWarehouse: "Logistic Warehouse",
    creatingLogisticWarehouse: "Creating Logistic Warehouse",
    editingLogisticWarehouse: "Editing Logistic Warehouse",
    // receive warehouse logistics
    receiveWarehouseLogistics: "Receive Warehouse Logistics",
    creatingReceiveWarehouseLogistics: "Creating Receive Warehouse Logistics",
    editingReceiveWarehouseLogistics: "Editing Receive Warehouse Logistics",
    // booking list
    bookingList: "Booking List",
    creatingBookingList: "Creating Booking List",
    editingBookingList: "Editing Booking List",
    bookingNoTooltip: "Booking No",
    checkInTooltip: "Check In",
    checkOutTooltip: "Check Out",
    refNoTooltip: "Ref No",
    purposeOfVisitTooltip: "Purpose Of Visit",
    remarksTooltip: "Remarks",
    roomNoTooltip: "Room No",
    adultsTooltip: "Adults",
    childrenTooltip: "Children",
    // job categories
    jobCategories: "Job Categories",
    creatingJobCategories: "Creating Job Categories",
    editingJobCategories: "Editing Job Categories",

    // Booking Sources
    bookingSources: "Booking Sources",
    creatingBookingSources: "Creating Booking Sources",
    editingBookingSources: "Editing Booking Sources",
    BookingSourceTooltip: "Booking Source",
    commissionRateTooltip: "Commission Rate",

    // shifts
    shift: "Shifts",
    creatingShifts: "Creating Shifts",
    editingShifts: "Editing Shifts",
    startTimeTooltip: "Start Time",
    endTimeTooltip: "End Time",

    // assets-maintenances
    assetMaintenances: "Asset Maintenances",
    creatingAssetMaintenances: "Creating Asset Maintenances",
    editingAssetMaintenances: "Editing Asset Maintenances",
    assetTooltip: "Asset",
    maintenanceTypeTooltip: "Maintenance Type",
    completionDateTooltip: "Completion Date",
    warrantyImprovementTooltip: "Warranty Improvement",
    costTooltip: "Cost",
    // membership-rules
    membershipRules: "Membership Rules",
    creatingMembershipRules: "Creating Membership Rules",
    editingMembershipRules: "Editing Membership Rules",
    customerGroupTooltip: "Customer Group",
    cardTooltip: "Card",
    pointFromTooltip: "Point From",
    pointToTooltip: "Point To",
    // loyalty-programs
    loyaltyPrograms: "Loyalty Programs",
    creatingLoyaltyPrograms: "Creating Loyalty Programs",
    editingLoyaltyPrograms: "Editing Loyalty Programs",
    endDateTooltip: "End Date",
    minimumPurchaseTooltip: "Minimum Purchase",
    accountCreationPointTooltip: "Account Creation Point",
    birthdayPointTooltip: "Birthday Point",
    redeemTypeTooltip: "Redeem Type",
    minimumPointToRedeemTooltip: "Minimum Point To Redeem",
    maxAmountReceiveTooltip: "Max Amount Receive",
    redeemInPortalTooltip: "Redeem In Portal",
    redeemInPosTooltip: "Redeem In Pos",
    ruleNameTooltip: "Rule Name",

    //manufacturing orders
    manufacturingOrders: "Manufacturing Orders",
    creatingManufacturingOrders: "Creating Manufacturing Orders",
    editingManufacturingOrders: "Editing Manufacturing Orders",
    productTooltip: "Product",
    quantityTooltip: "Quantity",
    deadlineTooltip: "Deadline",
    planFromTooltip: "Plan From",
    unitOfMeasureTooltip: "Unit Of Measure",
    responsibleTooltip: "Responsible",
    bomCodeTooltip: "Bom Code",
    referenceCodeTooltip: "Reference Code",
    routingTooltip: "Routing",

    // items module
    items: "آئٹمز",
    creatingItems: "آئٹمز بنانا",
    editingItems: "آئٹمز میں ترمیم کرنا",
    addingItem: "آئٹم شامل کرنا",
    editingItem: "آئٹم میں ترمیم کریں",
    itemCode: "آئٹم کوڈ",
    itemName: "آئٹم کا نام",
    arabicName: "عربی نام",
    costPrice: "لاگت کی قیمت",
    regularPrice: "عام قیمت",
    offerPrice: "آفر کی قیمت",
    startDate: "شروع کی تاریخ",
    endDate: "اختتام کی تاریخ",
    openingStock: "افتتاحی اسٹاک",
    category: "قسم",
    subCategory: "ذیلی قسم",
    unit: "یونٹ",
    description: "تفصیل",
    itemCodeTooltip: "آئٹم کوڈ درج کریں (مثال: ITM001)",
    itemNameTooltip: "آئٹم کا نام درج کریں",
    arabicNameTooltip: "آئٹم کے لیے عربی نام درج کریں",
    costPriceTooltip: "لاگت کی قیمت درج کریں",
    regularPriceTooltip: "عام فروخت کی قیمت درج کریں",
    offerPriceTooltip: "خصوصی آفر کی قیمت درج کریں",
    openingStockTooltip: "ابتدائی اسٹاک کی مقدار درج کریں",
    categoryTooltip: "آئٹم کی قسم درج کریں",
    subCategoryTooltip: "آئٹم کی ذیلی قسم درج کریں",
    unitTooltip: "پیمائش کی یونٹ درج کریں",
    defaultItemTooltip: "ڈیفالٹ آئٹم کے طور پر سیٹ کریں",
    itemStatusTooltip: "آئٹم کی حالت سیٹ کریں",
  },
  bn: {
    date: "তারিখ",
    code: "কোড",
    calling: "কলিং",
    country: "দেশ",
    insurances: "বিমা",
    certificates: "শেয়াদ",
    financialYear: "ফিনান্সিয়াল সাল",
    texRates: "টেক্স রেট",
    default: "ডিফল্ট",
    draft: "খসড়া",
    flagPreview: "পতাকার পূর্বরূপ",
    dragDropImage: "এখানে একটি ছবি টেনে আনুন বা নির্বাচন করতে ক্লিক করুন",
    reset: "রিসেট",
    submit: "জমা দিন",
    addingCountry: "দেশ তৈরি করা হচ্ছে",
    editingCountry: "দেশ সম্পাদনা",
    creatingInsurances: "বিমা তৈরি করা হচ্ছে",
    editingInsurances: "বিমা সম্পাদনা",
    creatingCertificates: "শেয়াদ তৈরি করা হচ্ছে",
    editingCertificates: "শেয়াদ সম্পাদনা",
    creatingFinancialYear: "ফিনান্সিয়াল সাল তৈরি করা হচ্ছে",
    editingFinancialYear: "ফিনান্সিয়াল সাল সম্পাদনা",
    creatingTexRates: "টেক্স রেট তৈরি করা হচ্ছে",
    editingTexRates: "টেক্স রেট সম্পাদনা",
    resetForm: "ফর্ম রিসেট করুন",
    resetFormMessage: "আপনি কি সত্যিই এই ফর্মটি রিসেট করতে চান?",
    resetFormConfirm: "ফর্ম রিসেট করুন",
    cancel: "বাতিল",
    yes: "হ্যাঁ",
    no: "না",
    Yes: "হ্যাঁ",
    No: "না",
    callingCodeTooltip: "কলিং কোড",
    countryNameTooltip: "দেশের নাম",
    countryCodeTooltip: "দেশের কোড",
    defaultCountryTooltip: "দেশ ডিফল্ট",
    statusTooltip: "দেশের অবস্থা",
    isdTooltip: "দেশ ISD",
    codeTooltip: "কোড",
    assetNameTooltip: "সম্পাদনা নাম",
    rentalNameTooltip: "সম্পাদনা নাম",
    rentalDescriptionTooltip: "বিবরণ",
    assetCategory: "ক্যাটেগরি",
    rentalCategory: "ক্যাটেগরি",

    // rental field
    segTooltip: "SEG",
    agreementNumberTooltip: "সंপাদিত করা হচ্ছে",
    agreementAmountTooltip: "সম্পাদনা নাম",
    agreementNameTooltip: "संपादित कर रहे हैं",
    agreementTypeTooltip: "संपादित कर रहे हैं",
    agreementDateTooltip: "संपादित कर रहे हैं",
    installExpireDateTooltip: "সंপাদিত করা হচ্ছে",
    installmentNoTooltip: "সম্পাদনা নাম",
    installmentAmountTooltip: "সম্পাদনা নাম",
    installmentPlanTooltip: "সম্পাদনা নাম",
    NotificationDaysTooltip: "সম্পাদনা নাম",
    creatingAssetMaster: "সম্পাদনা নাম",
    editingAssetMaster: "সম্পাদনা নাম",
    creatingRental: "সম্পাদনা নাম",
    editingRental: "সম্পাদনা নাম",
    creatingAsset: "সম্পাদনা নাম",
    editingAsset: "সম্পাদনা নাম",
    // insurance field
    insuranceNameTooltip: "Insurance",
    insuranceIqamaNoTooltip: "Iqama No",
    insuranceEmployeeNameTooltip: "Employee Name",
    insuranceEmployeeDesignationTooltip: "Designation",
    insuranceEmployeeBranchTooltip: "Branch",
    insuranceDetailsTooltip: "Description",
    // certificates
    certificatesNumberTooltip: "Certificate Number",
    certificatesTypeTooltip: "Certificate Type",
    labManagerTooltip: "Lab Manager",
    generalManagerTooltip: "General Manager",

    // financial year
    financialYearTitleTooltip: "Financial Year",
    fromDateTooltip: "From Date",
    toDateTooltip: "To Date",
    financialYearStatusTooltip: "Status",

    // tax rates
    taxRateTooltip: "Tax Rate",

    // candidateList
    candidateList: "Candidate List",
    creatingCandidateList: "Creating Candidate List",
    editingCandidateList: "Editing Candidate List",
    firstNameTooltip: "First Name",
    lastNameTooltip: "Last Name",
    emailTooltip: "Email",
    phoneTooltip: "Phone",
    alternatePhoneTooltip: "Alternate Phone",
    ssnTooltip: "SSN",
    presentAddressTooltip: "Present Address",
    permanentAddressTooltip: "Permanent Address",
    zipCodeTooltip: "Zip Code",
    pictureTooltip: "Picture",
    obtainedDegreeTooltip: "Obtained Degree",
    universityTooltip: "University",
    cgpaTooltip: "CGPA",
    commentTooltip: "Comment",
    experienceLevelTooltip: "Experience Level",
    skillTooltip: "Skill",
    companyNameTooltip: "Company Name",
    workingPeriodTooltip: "Working Period",
    dutiesTooltip: "Duties",
    supervisorTooltip: "Supervisor",
    // candidateSelections
    candidateSelections: "Candidate Selections",
    creatingCandidateSelections: "Creating Candidate Selections",
    editingCandidateSelections: "Editing Candidate Selections",
    employeeNameTooltip: "Employee Name",
    positionTooltip: "Position",
    teamTooltip: "Team",
    // commission
    commission: "Commission",
    creatingCommission: "Creating Commission",
    editingCommission: "Editing Commission",
    designationTooltip: "Designation",
    commissionTooltip: "Commission",

    language: "ভাষা",
    status: "অবস্থা",
    editingLanguage: "ভাষা সম্পাদনা",
    addingLanguage: "ভাষা যোগ করা",
    sequence: "ক্রম",
    sequenceTooltip: "এই ভাষার জন্য প্রদর্শন ক্রম নম্বর প্রবেশ করান",
    languageCodeTooltip: "ISO ভাষা কোড প্রবেশ করান (যেমন en, ar, hi)",
    languageNameTooltip: "ভাষার পূর্ণ নাম প্রবেশ করান",
    defaultLanguage: "ডিফল্ট ভাষা",
    language_ar: "ভাষা (আরবি)",
    language_hi: "ভাষা (হিন্দি)",
    language_ur: "ভাষা (উর্দু)",
    language_bn: "ভাষা (বাংলা)",

    // leads
    leads: "লিডস",
    creatingLeads: "লিড তৈরি করা হচ্ছে",
    editingLeads: "লিড সম্পাদনা করা হচ্ছে",
    clientNamerTooltip: "ক্লায়েন্টের নাম",
    productGroupTooltip: "পণ্য গ্রুপ",
    serviceTooltip: "সেবা",
    budgetTooltip: "বাজেট",
    priorityTooltip: "অগ্রাধিকার",
    startDateTooltip: "শুরুর তারিখ",
    assigneeTooltip: "নিয়োগপ্রাপ্ত",
    contactTooltip: "যোগাযোগ",
    sourceTooltip: "উৎস",
    employeesTooltip: "কর্মচারী",
    branchesTooltip: "শাখা",
    businessTooltip: "ব্যবসা",
    automationTooltip: "স্বয়ংক্রিয়তা",
    languageTooltip: "ভাষা",
    mobileTooltip: "মোবাইল",
    whatsappTooltip: "হোয়াটসঅ্যাপ",
    faxTooltip: "ফ্যাক্স",
    countryTooltip: "দেশ",
    stateTooltip: "রাজ্য",
    cityTooltip: "শহর",
    areaTooltip: "এলাকা",
    websiteTooltip: "ওয়েবসাইট",
    linkedinTooltip: "লিঙ্কডইন",
    facebookTooltip: "ফেসবুক",
    instagramTooltip: "ইনস্টাগ্রাম",
    locationTooltip: "অবস্থান",
    notesTooltip: "মন্তব্য",
    // holiday, increment, retirement
    holiday: "Holiday",
    increments: "Increments",
    retirement: "Retirement",
    creatingHoliday: "Creating Holiday",
    editingHoliday: "Editing Holiday",
    creatingIncrements: "Creating Increments",
    editingIncrements: "Editing Increments",
    creatingRetirement: "Creating Retirement",
    editingRetirement: "Editing Retirement",
    holidayNameTooltip: " Name",
    holidayFromDateTooltip: "From Date",
    holidayEndDateTooltip: "End Date",
    incrementsNameTooltip: " Name",
    incrementsDateTooltip: "Date",
    incrementsAmountTooltip: "Amount",
    incrementsNoteTooltip: "Note",
    iqamaNoTooltip: "Iqama No",
    employeeDesignationTooltip: "Designation",
    employeeBranchTooltip: "Branch",
    retirementNameTooltip: " Retirement",
    retirementDateTooltip: "Date",
    retirementIqamaNoTooltip: "Iqama No",
    retirementEmployeeNameTooltip: "Employee Name",
    retirementEmployeeDesignationTooltip: "Designation",
    retirementEmployeeBranchTooltip: "Branch",
    retirementDetailsTooltip: "Description",
    retirementStatusTooltip: "Status",

    // room size
    roomSize: "Room Size",
    creatingRoomSize: "Creating Room Size",
    editingRoomSize: "Editing Room Size",
    roomSizeTooltip: "Room Size",

    // booking type
    bookingType: "Booking Type",
    creatingBookingType: "Creating Booking Type",
    editingBookingType: "Editing Booking Type",
    bookingTypeTooltip: "Booking Type",

    // rooms
    rooms: "Rooms",
    creatingRooms: "Creating Rooms",
    editingRooms: "Editing Rooms",
    roomTypeTooltip: "Room Type",
    roomSizeNameTooltip: "Room Size",
    capacityTooltip: "Capacity",
    extraCapacityTooltip: "Extra Capacity",
    rateTooltip: "Rate",
    bedChargeTooltip: "Bed Charge",
    personalChargeTooltip: "Personal Charge",
    reviewTooltip: "Review",

    // log booking
    logBooking: "Log Booking",
    creatingLogBooking: "Creating Log Booking",
    editingLogBooking: "Editing Log Booking",
    bookingTooltip: "Booking",
    vehicleTooltip: "Vehicle",
    driverTooltip: "Driver",
    logBookingTooltip: "Log Booking",
    odometersTooltip: "Odometers",

    // drivers
    drivers: "Drivers",
    creatingDrivers: "Creating Drivers",
    editingDrivers: "Editing Drivers",
    employeeTooltip: "Employee",

    // real estate agent
    realEstateAgent: "Real Estate Agent",
    creatingRealEstateAgent: "Creating Real Estate Agent",
    editingRealEstateAgent: "Editing Real Estate Agent",
    profileImageTooltip: "Profile Image",
    // codeTooltip: "Code",
    nameTooltip: "Name",
    vatNumberTooltip: "VAT Number",
    aboutInformationsTooltip: "About Informations",
    addressTooltip: "Address",
    facebookUrlTooltip: "Facebook URL",
    whatsappUrlTooltip: "WhatsApp URL",
    instagramUrlTooltip: "Instagram URL",
    skypeUrlTooltip: "Skype URL",
    linkedinUrlTooltip: "LinkedIn URL",
    planTooltip: "Plan",
    attachFileTooltip: "Attach File",
    hourlyRateTooltip: "Hourly Rate",
    defaultLanguageTooltip: "Default Language",
    emailSignatureTooltip: "Email Signature",
    directionTooltip: "Direction",
    shiftReportsTooltip: "Shift Reports",
    passwordTooltip: "Password",

    // business broker
    businessBroker: "Business Broker",
    creatingBusinessBroker: "Creating Business Broker",
    editingBusinessBroker: "Editing Business Broker",
    // shipment
    shipment: "Shipment",
    creatingShipment: "Creating Shipment",
    editingShipment: "Editing Shipment",
    shippingPrefixTooltip: "Shipping Prefix",
    numberTooltip: "Number",
    agencyTooltip: "Agency",
    officeOfOriginTooltip: "Office of Origin",
    customerTooltip: "Customer",
    customerAddressTooltip: "Customer Address",
    recipientTooltip: "Recipient",
    recipientAddressTooltip: "Recipient Address",
    logisticServiceTooltip: "Logistic Service",
    paymentTermTooltip: "Payment Term",
    typeofPackageTooltip: "Type of Package",
    courierCompanyTooltip: "Courier Company",
    serviceModeTooltip: "Service Mode",
    deliveryTimeTooltip: "Delivery Time",
    assignDriverTooltip: "Assign Driver",
    currencyTooltip: "Currency",
    currencyRateTooltip: "Currency Rate",
    deliveryStatusTooltip: "Delivery Status",
    invoiceTooltip: "Invoice",
    amountTooltip: "Amount",
    packageDetailsTooltip: "Package Details",
    weightTooltip: "Weight",
    lengthTooltip: "Length",
    widthTooltip: "Width",
    heightTooltip: "Height",
    weightVolTooltip: "Volumetric Weight",
    fixedChargeTooltip: "Fixed Charge",
    DecValueTooltip: "Declared Value",
    TariffFeeTooltip: "Tariff Fee",
    priceKgTooltip: "Price per Kg",
    DiscountTooltip: "Discount %",
    valueAssuredTooltip: "Value Assured %",
    shippingInsuranceTooltip: "Shipping Insurance %",
    customDutiesTooltip: "Custom Duties %",
    taxTooltip: "Tax %",
    declaredValueTooltip: "Declared Value %",
    reissueTooltip: "Reissue",
    // journal Entry
    journalEntry: "Journal Entry",
    creatingJournalEntry: "Creating Journal Entry",
    editingJournalEntry: "Editing Journal Entry",
    journalDateTooltip: "Journal Date",
    referenceTooltip: "Reference",
    totalCyclesTooltip: "Total Cycles",
    accountTooltip: "Account",
    debitTooltip: "Debit",
    creditTooltip: "Credit",
    // pickup
    pickup: "Pickup",
    creatingPickup: "Creating Pickup",
    editingPickup: "Editing Pickup",
    // transport master
    transportMaster: "Transport Master",
    creatingTransportMaster: "Creating Transport Master",
    editingTransportMaster: "Editing Transport Master",
    transporterNameTooltip: "Transporter Name",
    landMarkTooltip: "Land Mark",
    notificationTooltip: "Notification",
    contactPersonTooltip: "Contact Person",
    // Supplier Master
    supplierMaster: "Supplier Master",
    creatingSupplierMaster: "Creating Supplier Master",
    editingSupplierMaster: "Editing Supplier Master",
    supplierNameTooltip: "Supplier Name",
    paymentTermsTooltip: "Payment Terms",
    paymentTypeTooltip: "Payment Type",
    dueDayTooltip: "Due Day",
    depositTypeTooltip: "Deposit Type",
    depositAmountTooltip: "Deposit Amount",
    exchangeRateTooltip: "Exchange Rate",
    localAmtTooltip: "Local Amt",
    poBoxTooltip: "PO Box",
    zipTooltip: "Zip",
    // logistic warehouse
    logisticWarehouse: "Logistic Warehouse",
    creatingLogisticWarehouse: "Creating Logistic Warehouse",
    editingLogisticWarehouse: "Editing Logistic Warehouse",
    // receive warehouse logistics
    receiveWarehouseLogistics: "Receive Warehouse Logistics",
    creatingReceiveWarehouseLogistics: "Creating Receive Warehouse Logistics",
    editingReceiveWarehouseLogistics: "Editing Receive Warehouse Logistics",
    // booking list
    bookingList: "Booking List",
    creatingBookingList: "Creating Booking List",
    editingBookingList: "Editing Booking List",
    bookingNoTooltip: "Booking No",
    checkInTooltip: "Check In",
    checkOutTooltip: "Check Out",
    refNoTooltip: "Ref No",
    purposeOfVisitTooltip: "Purpose Of Visit",
    remarksTooltip: "Remarks",
    roomNoTooltip: "Room No",
    adultsTooltip: "Adults",
    childrenTooltip: "Children",
    // job categories
    jobCategories: "Job Categories",
    creatingJobCategories: "Creating Job Categories",
    editingJobCategories: "Editing Job Categories",

    // Booking Sources
    bookingSources: "Booking Sources",
    creatingBookingSources: "Creating Booking Sources",
    editingBookingSources: "Editing Booking Sources",
    BookingSourceTooltip: "Booking Source",
    commissionRateTooltip: "Commission Rate",
    // shifts
    shift: "Shifts",
    creatingShifts: "Creating Shifts",
    editingShifts: "Editing Shifts",
    startTimeTooltip: "Start Time",
    endTimeTooltip: "End Time",
    // assets-maintenances
    assetMaintenances: "Asset Maintenances",
    creatingAssetMaintenances: "Creating Asset Maintenances",
    editingAssetMaintenances: "Editing Asset Maintenances",
    assetTooltip: "Asset",
    maintenanceTypeTooltip: "Maintenance Type",
    completionDateTooltip: "Completion Date",
    warrantyImprovementTooltip: "Warranty Improvement",
    costTooltip: "Cost",
    // membership-rules
    membershipRules: "Membership Rules",
    creatingMembershipRules: "Creating Membership Rules",
    editingMembershipRules: "Editing Membership Rules",
    customerGroupTooltip: "Customer Group",
    cardTooltip: "Card",
    pointFromTooltip: "Point From",
    pointToTooltip: "Point To",
    // loyalty-programs
    loyaltyPrograms: "Loyalty Programs",
    creatingLoyaltyPrograms: "Creating Loyalty Programs",
    editingLoyaltyPrograms: "Editing Loyalty Programs",
    endDateTooltip: "End Date",
    minimumPurchaseTooltip: "Minimum Purchase",
    accountCreationPointTooltip: "Account Creation Point",
    birthdayPointTooltip: "Birthday Point",
    redeemTypeTooltip: "Redeem Type",
    minimumPointToRedeemTooltip: "Minimum Point To Redeem",
    maxAmountReceiveTooltip: "Max Amount Receive",
    redeemInPortalTooltip: "Redeem In Portal",
    redeemInPosTooltip: "Redeem In Pos",
    ruleNameTooltip: "Rule Name",

    //manufacturing orders
    manufacturingOrders: "Manufacturing Orders",
    creatingManufacturingOrders: "Creating Manufacturing Orders",
    editingManufacturingOrders: "Editing Manufacturing Orders",
    productTooltip: "Product",
    quantityTooltip: "Quantity",
    deadlineTooltip: "Deadline",
    planFromTooltip: "Plan From",
    unitOfMeasureTooltip: "Unit Of Measure",
    responsibleTooltip: "Responsible",
    bomCodeTooltip: "Bom Code",
    referenceCodeTooltip: "Reference Code",
    routingTooltip: "Routing",

    // items module
    items: "Items",
    creatingItems: "Creating Items",
    editingItems: "Editing Items",
    addingItem: "Adding Item",
    editingItem: "Edit Item",
    itemCode: "Item Code",
    itemName: "Item Name",
    arabicName: "Arabic Name",
    costPrice: "Cost Price",
    regularPrice: "Regular Price",
    offerPrice: "Offer Price",
    startDate: "Start Date",
    endDate: "End Date",
    openingStock: "Opening Stock",
    category: "Category",
    subCategory: "Sub Category",
    unit: "Unit",
    description: "Description",
    itemCodeTooltip: "Enter the item code (e.g., ITM001)",
    itemNameTooltip: "Enter the item name",
    arabicNameTooltip: "Enter the Arabic name for the item",
    costPriceTooltip: "Enter the cost price",
    regularPriceTooltip: "Enter the regular selling price",
    offerPriceTooltip: "Enter the special offer price",
    openingStockTooltip: "Enter the initial stock quantity",
    categoryTooltip: "Enter the item category",
    subCategoryTooltip: "Enter the item sub category",
    unitTooltip: "Enter the unit of measurement",
    defaultItemTooltip: "Set as default item",
    itemStatusTooltip: "Set the item status",
  },
};
