/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialProperties } from "@/pages/plans/config/ModuleLevelConfig";
import { initialData as campaignsData } from "@/pages/campaigns/CreatePage";
import { initialData as accessoriesData } from "@/pages/accessories/CreatePage";
import { initialProperties as workCentersData } from "@/pages/workCenters/config/ModuleLevelConfig";
import { initialProperties as consumablesData } from "@/pages/consumables/config/ModuleLevelConfig";
import { initialProperties as productionData } from "@/pages/production/config/ModuleLevelConfig";
import { initialProperties as loggedUsersData } from "@/pages/logged-users/config/ModuleLevelConfig";
import { initialProperties as serviceCategoriesData } from "@/pages/service-categories/config/ModuleLevelConfig";
import { initialProperties as serviceData } from "@/pages/service/config/ModuleLevelConfig";
import { initialProperties as printLabelsData } from "@/pages/print-labels/config/ModuleLevelConfig";
import { initialProperties as payslipsData } from "@/pages/payslips/config/ModuleLevelConfig";
import { initialProperties as paymentModesData } from "@/pages/payment-modes/config/ModuleLevelConfig";
import { initialProperties as bonusTypeData } from "@/pages/bonus-type/config/ModuleLevelConfig";
import { initialProperties as salarySheetData } from "@/pages/SalarySheet/config/ModuleLevelConfig";
import { initialProperties as loanTypeData } from "@/pages/loan-type/config/ModuleLevelConfig";
import { initialProperties as allowanceTypeData } from "@/pages/allowance-type/config/ModuleLevelConfig";
import { initialProperties as ticketStatusData } from "@/pages/ticket-status/config/ModuleLevelConfig";
import { initialProperties as predefinedRepliesData } from "@/pages/predefined-replies/config/ModuleLevelConfig";
import { initialProperties as TicketsData } from "@/pages/tickets/config/ModuleLevelConfig";

import { initialProperties as projectStatusData } from "@/pages/project-status/config/ModuleLevelConfig";
import { initialProperties as blogData } from "@/pages/blog/config/ModuleLevelConfig";
import { initialProperties as contractData } from "@/pages/contract/config/ModuleLevelConfig";
import { initialProperties as ticketPrioritiesData } from "@/pages/ticket-priorities/config/ModuleLevelConfig";
import { initialProperties as garagesData } from "@/pages/garages/config/ModuleLevelConfig";
import { initialProperties as projectGroupData } from "@/pages/project-group/config/ModuleLevelConfig";
import { initialProperties as facilityData } from "@/pages/facility/config/ModuleLevelConfig";
import { initialProperties as promocodesData } from "@/pages/promocodes/config/ModuleLevelConfig";

import { initialProperties as dependantsData } from "@/pages/dependants/config/ModuleLevelConfig";
import { initialProperties as facilitydetailsData } from "@/pages/facilitydetails/config/ModuleLevelConfig";
import { initialProperties as birthReportData } from "@/pages/birth-report/config/ModuleLevelConfig";
import { initialProperties as deathReportData } from "@/pages/death-report/config/ModuleLevelConfig";
import { initialProperties as investigationReportData } from "@/pages/investigation-report/config/ModuleLevelConfig";
import { initialProperties as doctorData } from "@/pages/doctor/config/ModuleLevelConfig";
import { initialProperties as patientData } from "@/pages/patient/config/ModuleLevelConfig";
import { initialProperties as scheduleData } from "@/pages/schedule/config/ModuleLevelConfig";
import { initialProperties as operationReportData } from "@/pages/operation-report/config/ModuleLevelConfig";
import { initialProperties as medicineData } from "@/pages/medicine/config/ModuleLevelConfig";
import { initialProperties as assignByAllData } from "@/pages/assign-by-all/config/ModuleLevelConfig";
import { initialProperties as assignByDoctorData } from "@/pages/assign-by-doctor/config/ModuleLevelConfig";
import { initialProperties as customerStatementData } from "@/pages/customer-statement/config/ModuleLevelConfig";
import { initialProperties as employeeStatementData } from "@/pages/employee-statement/config/ModuleLevelConfig";
import { initialProperties as supplierStatementData } from "@/pages/supplier-statement/config/ModuleLevelConfig";
import { initialProperties as subCategoryData } from "@/pages/sub-category/config/ModuleLevelConfig";
import { initialProperties as productUnitData } from "@/pages/product-unit/config/ModuleLevelConfig";
import { initialProperties as timeSlotData } from "@/pages/time-slot/config/ModuleLevelConfig";
import { initialProperties as medicineCategoryData } from "@/pages/medicine-category/config/ModuleLevelConfig";
import { initialProperties as patientAdmissionData } from "@/pages/patient-admission/config/ModuleLevelConfig";
import { initialProperties as packageData } from "@/pages/package/config/ModuleLevelConfig";
import { initialProperties as patientMedicationData } from "@/pages/patient-medication/config/ModuleLevelConfig";
import { initialProperties as patientVisitData } from "@/pages/patient-visit/config/ModuleLevelConfig";

// import { initialProperties as salesItemReportsData } from "@/pages/sales-item-reports/config/ModuleLevelConfig";
// import { initialProperties as currentStockReportsData } from "@/pages/current-stock-reports/config/ModuleLevelConfig";
// import { initialProperties as salesmanSalesReportsData } from "@/pages/salesman-sales-reports/config/ModuleLevelConfig";

import { initialProperties as receivedVoucherData } from "@/pages/received-voucher/config/ModuleLevelConfig";
import { initialProperties as billData } from "@/pages/bill/config/ModuleLevelConfig";
import { initialProperties as patientAppointmentData } from "@/pages/patient-appoinment/config/ModuleLevelConfig";
import { initialProperties as invoicePaymentsData } from "@/pages/invoice-payments/config/ModuleLevelConfig";
import { initialProperties as enquiryData } from "@/pages/enquiry/config/ModuleLevelConfig";
import { initialProperties as vatReportsData } from "@/pages/vat-reports/config/ModuleLevelConfig";
import { initialProperties as teamMembersData } from "@/pages/team-members/config/ModuleLevelConfig";
import { initialProperties as clientData } from "@/pages/client/config/ModuleLevelConfig";
import { initialProperties as contactFormData } from "@/pages/contact-form/config/ModuleLevelConfig";
import { initialProperties as categoryData } from "@/pages/category/config/ModuleLevelConfig";

export const userPermissionDataSpliteVersion = {
  trainingPrograms: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      trainingProgramName: {
        view: true,
        edit: true,
        create: true,
      },
      trainingType: {
        view: true,
        edit: true,
        create: true,
      },
      programItems: {
        view: true,
        edit: true,
        create: true,
      },
      point: {
        view: true,
        edit: true,
        create: true,
      },
      trainingMode: {
        view: true,
        edit: true,
        create: true,
      },
      departments: {
        view: true,
        edit: true,
        create: true,
      },
      applyPosition: {
        view: true,
        edit: true,
        create: true,
      },
      description: {
        view: true,
        edit: true,
        create: true,
      },
      attachment: {
        view: true,
        edit: true,
        create: true,
      },

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },
  warranties: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      claimCode: {
        view: true,
        edit: true,
        create: true,
      },
      dateCreated: {
        view: true,
        edit: true,
        create: true,
      },
      customer: {
        view: true,
        edit: true,
        create: true,
      },
      invoice: {
        view: true,
        edit: true,
        create: true,
      },
      productService: {
        view: true,
        edit: true,
        create: true,
      },
      receiptProcess: {
        view: true,
        edit: true,
        create: true,
      },
      description: {
        view: true,
        edit: true,
        create: true,
      },
      clientNote: {
        view: true,
        edit: true,
        create: true,
      },
      adminNote: {
        view: true,
        edit: true,
        create: true,
      },

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },
  warrantyInformation: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      customer: {
        view: true,
        edit: true,
        create: true,
      },
      orderNumber: {
        view: true,
        edit: true,
        create: true,
      },
      invoiceNumber: {
        view: true,
        edit: true,
        create: true,
      },
      productOrServiceName: {
        view: true,
        edit: true,
        create: true,
      },
      rate: {
        view: true,
        edit: true,
        create: true,
      },
      quantity: {
        view: true,
        edit: true,
        create: true,
      },
      serialNumber: {
        view: true,
        edit: true,
        create: true,
      },

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  audits: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      title: {
        view: true,
        edit: true,
        create: true,
      },
      auditor: {
        view: true,
        edit: true,
        create: true,
      },
      auditDate: {
        view: true,
        edit: true,
        create: true,
      },
      status: {
        view: true,
        edit: true,
        create: true,
      },

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  billsOfMaterials: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      product: {
        view: true,
        edit: true,
        create: true,
      },
      productVariant: {
        view: true,
        edit: true,
        create: true,
      },
      quantity: {
        view: true,
        edit: true,
        create: true,
      },
      unitOfMeasure: {
        view: true,
        edit: true,
        create: true,
      },
      routing: {
        view: true,
        edit: true,
        create: true,
      },
      bomType: {
        view: true,
        edit: true,
        create: true,
      },
      manufacturingReadiness: {
        view: true,
        edit: true,
        create: true,
      },
      consumption: {
        view: true,
        edit: true,
        create: true,
      },
      description: {
        view: true,
        edit: true,
        create: true,
      },

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  plans: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(initialProperties),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  ticketStatus: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(ticketStatusData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  receivedVoucher: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(receivedVoucherData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  medicineCategory: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(medicineCategoryData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },
  patientAdmission: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(patientAdmissionData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  ticketPriorities: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(ticketPrioritiesData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  garages: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(garagesData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  predefinedReplies: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(predefinedRepliesData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  bonusType: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(bonusTypeData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  tickets: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(TicketsData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  salarySheet: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(salarySheetData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  campaigns: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(campaignsData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  workCenters: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(workCentersData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  consumables: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(consumablesData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  accessories: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(accessoriesData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  production: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(productionData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  loggedUsers: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(loggedUsersData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  serviceCategories: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(serviceCategoriesData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  service: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(serviceData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  printLabels: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(printLabelsData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  payslips: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(payslipsData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  paymentModes: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(paymentModesData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  loanType: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(loanTypeData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  allowanceType: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(allowanceTypeData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  projectStatus: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(projectStatusData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  contract: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(contractData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  projectGroup: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(projectGroupData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  facility: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(facilityData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  promocodes: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(promocodesData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  depandants: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(dependantsData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  facilitydetails: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(facilitydetailsData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  blog: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(blogData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  birthReport: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(birthReportData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },
  deathReport: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(deathReportData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  investigationReport: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(investigationReportData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },
  doctor: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(doctorData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  patient: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(patientData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  schedule: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(scheduleData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  operationReport: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(operationReportData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  medicine: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(medicineData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  assignByAll: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(assignByAllData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  assignByDoctor: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(assignByDoctorData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  customerStatement: {
    formPermissions: {
      create: false,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(customerStatementData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  employeeStatement: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(employeeStatementData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  supplierStatement: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(supplierStatementData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  category: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(categoryData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  subCategory: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(subCategoryData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  productUnit: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(productUnitData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  timeSlot: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(timeSlotData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  package: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(packageData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  patientMedication: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(patientMedicationData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  patientVisit: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(patientVisitData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  bill: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(billData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  patientAppoinment: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(patientAppointmentData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  invoicePayments: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(invoicePaymentsData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  enquiry: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(enquiryData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  vatReports: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(vatReportsData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  teamMembers: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(teamMembersData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  client: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(clientData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },

  contactForm: {
    formPermissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      restore: true,
      export: true,
      import: true,
      pdf: true,
      print: true,
      history: true,
    },
    fieldPermissions: {
      ...buildPermissions(contactFormData),

      isDefault: {
        view: true,
        edit: true,
        create: true,
      },
      isDraft: {
        view: true,
        edit: true,
        create: true,
      },
      isActive: {
        view: true,
        edit: true,
        create: true,
      },
      isDeleted: {
        view: true,
        edit: true,
        create: true,
      },
      createdAt: {
        view: true,
        edit: false,
        create: true,
      },
      updatedAt: {
        view: true,
        edit: false,
        create: true,
      },
      draftedAt: {
        view: true,
        edit: false,
        create: true,
      },
      deletedAt: {
        view: true,
        edit: false,
        create: true,
      },
    },
  },
};

type PermissionConfig = {
  view: boolean;
  edit: boolean;
  create: boolean;
};

export function buildPermissions<T extends Record<string, any>>(
  fields: T
): Record<keyof T, PermissionConfig> {
  return Object.keys(fields).reduce((acc, key) => {
    acc[key as keyof T] = {
      view: true,
      edit: true,
      create: true,
    };
    return acc;
  }, {} as Record<keyof T, PermissionConfig>);
}
