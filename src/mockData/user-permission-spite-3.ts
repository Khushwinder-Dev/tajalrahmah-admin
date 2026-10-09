import { initialProperties as advancePaymentData } from "@/pages/advance-payment/config/ModuleLevelConfig";
import { initialProperties as noticeData } from "@/pages/notice/config/ModuleLevelConfig";
import { buildPermissions } from "./user-permission-data-splite-version";
import { initialProperties as expenseCategoriesData } from "@/pages/expense-categories/config/ModuleLevelConfig";
import { initialProperties as expenseSubCategoriesData } from "@/pages/expense-sub-categories/config/ModuleLevelConfig";
import { initialProperties as companyLoansData } from "@/pages/company-loans/config/ModuleLevelConfig";
import { initialProperties as companyData } from "@/pages/company/config/ModuleLevelConfig";

export const userPermissionDataSpliteVersionThree = {
  advancePayment: {
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
      ...buildPermissions(advancePaymentData),

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

  notice: {
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
      ...buildPermissions(noticeData),

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

  expenseCategories: {
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
      ...buildPermissions(expenseCategoriesData),

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

  expenseSubCategories: {
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
      ...buildPermissions(expenseSubCategoriesData),

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

  companyLoans: {
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
      ...buildPermissions(companyLoansData),

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

  company: {
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
      ...buildPermissions(companyData),

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
