import { userPermissionDataSpliteVersion } from "./user-permission-data-splite-version";
import { userPermissionDataSpliteVersionThree } from "./user-permission-spite-3";

export const userPermission = {
  modules: {
    ...userPermissionDataSpliteVersion,
    ...userPermissionDataSpliteVersionThree,
    users: {
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
        userName: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    "user-master": {
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
        userName: {
          view: true,
          edit: true,
          create: true,
        },
        mobileNumber: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        userType: {
          view: true,
          edit: true,
          create: true,
        },
        password: {
          view: true,
          edit: true,
          create: true,
        },
        confirmPassword: {
          view: true,
          edit: true,
          create: true,
        },
        otp: {
          view: true,
          edit: true,
          create: true,
        },
        facebook: {
          view: true,
          edit: true,
          create: true,
        },
        linkedin: {
          view: true,
          edit: true,
          create: true,
        },
        instagram: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    countries: {
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
        countryName: {
          view: true,
          edit: true,
          create: true,
        },
        countryCode: {
          view: true,
          edit: true,
          create: true,
        },
        ISD: {
          view: true,
          edit: true,
          create: true,
        },
        flag: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
          edit: false,
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
      },
    },
    states: {
      formPermissions: {
        create: true,
        view: true,
        edit: true,
        delete: true,
        export: true,
        import: true,
        pdf: true,
        print: true,
      },
      fieldPermissions: {
        state: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
          edit: false,
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
      },
    },
    beds: {
      formPermissions: {
        create: true,
        view: true,
        edit: true,
        delete: true,
        export: true,
        import: true,
        pdf: true,
        print: true,
      },
      fieldPermissions: {
        roomName: {
          view: true,
          edit: true,
          create: true,
        },
        bedNumber: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
          edit: false,
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
      },
    },
    cities: {
      formPermissions: {
        create: true,
        view: true,
        edit: true,
        delete: true,
        export: true,
        import: true,
        pdf: true,
        print: true,
      },
      fieldPermissions: {
        city: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
          edit: false,
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
      },
    },

    areas: {
      formPermissions: {
        create: true,
        view: true,
        edit: true,
        delete: true,
        export: true,
        import: true,
        pdf: true,
        print: true,
      },
      fieldPermissions: {
        area: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
          edit: false,
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
      },
    },
    "expense-reports": {
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
        totalAmount: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    "bed-transfer": {
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
        patientId: {
          view: true,
          edit: true,
          create: true,
        },
        roomName: {
          view: true,
          edit: true,
          create: true,
        },
        bedNumber: {
          view: true,
          edit: true,
          create: true,
        },
        charge: {
          view: true,
          edit: true,
          create: true,
        },
        assignDate: {
          view: true,
          edit: true,
          create: true,
        },
        dischargeDate: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    "bed-assign": {
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
        patientId: {
          view: true,
          edit: true,
          create: true,
        },
        roomName: {
          view: true,
          edit: true,
          create: true,
        },
        bedNumber: {
          view: true,
          edit: true,
          create: true,
        },
        charge: {
          view: true,
          edit: true,
          create: true,
        },
        assignDate: {
          view: true,
          edit: true,
          create: true,
        },
        dischargeDate: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    "bed-reports": {
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
        patientId: {
          view: true,
          edit: true,
          create: true,
        },
        roomName: {
          view: true,
          edit: true,
          create: true,
        },
        bedNumber: {
          view: true,
          edit: true,
          create: true,
        },
        charge: {
          view: true,
          edit: true,
          create: true,
        },
        assignDate: {
          view: true,
          edit: true,
          create: true,
        },
        dischargeDate: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    "order-type": {
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
        orderType: {
          view: true,
          edit: true,
          create: true,
        },
        customerId: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        requiresDeliveryman: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    groups: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        groupName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    divisions: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        divisionName: {
          view: true,
          edit: true,
          create: true,
        },
        region: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    // sections: {
    //   formPermissions: {
    //     create: true,
    //     view: true,
    //     edit: true,
    //     delete: true,
    //     restore: true,
    //     export: true,
    //     import: true,
    //     pdf: true,
    //     print: true,
    //     history: true,
    //   },
    //   fieldPermissions: {
    //     code: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     sectionName: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     sectionType: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     description: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     status: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     createdDate: {
    //       view: true,
    //       edit: false,
    //       create: true,
    //     },
    //     updatedDate: {
    //       view: true,
    //       edit: false,
    //       create: true,
    //     },
    //     draftedDate: {
    //       view: true,
    //       edit: false,
    //       create: true,
    //     },
    //     isActive: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     isDraft: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     isDeleted: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     isUpdated: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //     isDefault: {
    //       view: true,
    //       edit: true,
    //       create: true,
    //     },
    //   },
    // },
    promotion: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        employeeName: {
          view: true,
          edit: true,
          create: true,
        },
        fromPosition: {
          view: true,
          edit: true,
          create: true,
        },
        toPosition: {
          view: true,
          edit: true,
          create: true,
        },
        fromDepartment: {
          view: true,
          edit: true,
          create: true,
        },
        toDepartment: {
          view: true,
          edit: true,
          create: true,
        },
        fromSalary: {
          view: true,
          edit: true,
          create: true,
        },
        toSalary: {
          view: true,
          edit: true,
          create: true,
        },
        promotionDate: {
          view: true,
          edit: true,
          create: true,
        },
        effectiveDate: {
          view: true,
          edit: true,
          create: true,
        },
        approvedBy: {
          view: true,
          edit: true,
          create: true,
        },
        reason: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: true,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    warehouse: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        warehouseName: {
          view: true,
          edit: true,
          create: true,
        },
        managerName: {
          view: true,
          edit: true,
          create: true,
        },
        location: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: true,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    "task-category": {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        department: {
          view: true,
          edit: true,
          create: true,
        },
        designation: {
          view: true,
          edit: true,
          create: true,
        },
        task: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    salesman: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        salesmanName: {
          view: true,
          edit: true,
          create: true,
        },
        commission: {
          view: true,
          edit: true,
          create: true,
        },
        territory: {
          view: true,
          edit: true,
          create: true,
        },
        experience: {
          view: true,
          edit: true,
          create: true,
        },
        department: {
          view: true,
          edit: true,
          create: true,
        },
        manager: {
          view: true,
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    "supplier-items-report": {
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
        supplier: {
          view: true,
          edit: true,
          create: true,
        },
        itemName: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    currencies: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        currency: {
          view: true,
          edit: true,
          create: true,
        },
        exchange: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        symbol: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    deliverymen: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        name: {
          view: true,
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        address: {
          view: true,
          edit: true,
          create: true,
        },
        nationalId: {
          view: true,
          edit: true,
          create: true,
        },
        vehicleType: {
          view: true,
          edit: true,
          create: true,
        },
        assignedArea: {
          view: true,
          edit: true,
          create: true,
        },
        customerLogo: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    section: {
      formPermissions: {
        create: true,
        view: true,
        edit: true,
        delete: true,
        export: true,
        import: true,
        pdf: true,
        print: true,
      },
      fieldPermissions: {
        code: {
          view: true,
          edit: true,
          create: true,
        },
        title: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        manager: {
          view: true,
          edit: true,
          create: true,
        },
        employeeCount: {
          view: true,
          edit: true,
          create: true,
        },
        budget: {
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
    taskAssigns: {
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
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        employee: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        timeline: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
          edit: false,
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
      },
    },

    projects: {
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
        vendorCode: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        projectName: {
          view: true,
          edit: true,
          create: true,
        },
        projectCode: {
          view: true,
          edit: true,
          create: true,
        },
        projectType: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        projectLocation: {
          view: true,
          edit: true,
          create: true,
        },
        poNumber: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        customerNo: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
          edit: false,
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
      },
    },
    taskCategory: {
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
        department: {
          view: true,
          edit: true,
          create: true,
        },
        designation: {
          view: true,
          edit: true,
          create: true,
        },
        task: {
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
    permissions: {
      formPermissions: {
        create: true,
        view: true,
        edit: true,
        delete: true,
        restore: true,
        export: true,
        import: false,
        pdf: true,
        print: true,
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        role: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    languages: {
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
        seq: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        language: {
          view: true,
          edit: true,
          create: true,
        },
        default: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        createdBy: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    userLocations: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        totalCompanies: {
          view: true,
          edit: true,
          create: true,
        },
        totalBranches: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        createdBy: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    userMaster: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        mobileNumber: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        password: {
          view: true,
          edit: true,
          create: true,
        },
        confirmPassword: {
          view: true,
          edit: true,
          create: true,
        },
        otp: {
          view: true,
          edit: true,
          create: true,
        },
        facebook: {
          view: true,
          edit: true,
          create: true,
        },
        linkedin: {
          view: true,
          edit: true,
          create: true,
        },
        instagram: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        userType: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
          edit: false,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    assetsCategory: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        assetName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        description: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        flag: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    assetsMaster: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        assetName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        description: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        flag: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    rental: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        assetName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        description: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        flag: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    holiday: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        formDate: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        endDate: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    increments: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        date: {
          view: true, // false for test user
          edit: true,
          create: true,
        },

        status: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    retirement: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        date: {
          view: true, // false for test user
          edit: true,
          create: true,
        },

        status: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    sampleCategory: {
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
        name: {
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
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        lastUpdated: {
          view: true,
          edit: false,
          create: true,
        },
        createdBy: {
          view: false,
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
    sampleReceiving: {
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
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        receivingNo: {
          view: true,
          edit: true,
          create: true,
        },
        clientName: {
          view: true,
          edit: true,
          create: true,
        },
        clientReference: {
          view: true,
          edit: true,
          create: true,
        },
        typeOfSample: {
          view: true,
          edit: true,
          create: true,
        },
        requiredTests: {
          view: true,
          edit: true,
          create: true,
        },
        numberOfSample: {
          view: true,
          edit: true,
          create: true,
        },
        section: {
          view: true,
          edit: true,
          create: true,
        },
        deliveredBy: {
          view: true,
          edit: true,
          create: true,
        },
        receivedBy: {
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
        receivingDate: {
          view: true,
          edit: true,
          create: true,
        },
        receivingTime: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },

    leavesApproval: {
      formPermissions: {
        // create: true,
        view: true,
        // edit: true,
        delete: true,
        restore: true,
        export: true,
        import: true,
        pdf: true,
        print: true,
        history: true,
      },
      fieldPermissions: {
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        id: {
          view: true,
          edit: false,
          create: true,
        },
        employee: {
          view: true,
          edit: true,
          create: true,
        },
        leaveType: {
          view: true,
          edit: true,
          create: true,
        },
        fromDate: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        totalDays: {
          view: true,
          edit: true,
          create: true,
        },
        hardCopy: {
          view: true,
          edit: true,
          create: true,
        },
        approvedBy: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    leavesApplication: {
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
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        iqamaNo: {
          view: true,
          edit: true,
          create: true,
        },
        leaveType: {
          view: true,
          edit: true,
          create: true,
        },
        fromDate: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        totalDays: {
          view: true,
          edit: true,
          create: true,
        },
        applicationHardCopy: {
          view: true,
          edit: true,
          create: true,
        },
        reason: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    projectTypes: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        projectType: {
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
    candidateSortlists: {
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
        candidateName: {
          view: true,
          edit: true,
          create: true,
        },
        shortlistedDate: {
          view: true,
          edit: true,
          create: true,
        },
        interviewDate: {
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
    bloodGroups: {
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
        bloodGroup: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
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
    leads: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
        flag: true,
      },
      fieldPermissions: {
        clientName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        email: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    commission: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        designation: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        commission: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    transportMaster: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        designation: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        commission: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    supplierMaster: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        designation: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        commission: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    userLog: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
    },
    pendingOrder: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
    },
    logisticWareHouse: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        country: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        contactPerson: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        mobile: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        phone: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        fax: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        email: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    receiveWarehouseLogistics: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        company: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        country: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        note: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    taxRates: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        taxRate: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    roomSize: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        roomSize: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        description: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    rooms: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        roomType: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        roomSize: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        roomSizeName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        capacity: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        description: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    logBooks: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        booking: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        vehicle: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        driver: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        logBooks: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        description: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    realestateAgent: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        profilePic: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        firstName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        lastName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        email: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        address: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        city: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        state: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        code: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    businessBroker: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        profilePic: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        firstName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        lastName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        email: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        address: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        city: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        state: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        code: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    shipment: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        profilePic: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        firstName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        lastName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        email: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        address: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        city: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        state: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        code: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    pickup: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        profilePic: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        firstName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        lastName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        email: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        address: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        city: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        state: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        code: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    journalEntry: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        number: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        journalDate: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        journalEntry: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        reference: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        totalCycles: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        account: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        debit: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        describe: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        credit: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    drivers: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        employee: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        vehicle: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    bookingType: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        bookingType: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        description: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    bookingList: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        bookingNo: {
          view: true,
          edit: true,
          create: true,
        },
        checkIn: {
          view: true,
          edit: true,
          create: true,
        },
        checkOut: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        bookingType: {
          view: true,
          edit: true,
          create: true,
        },
        reference: {
          view: true,
          edit: true,
          create: true,
        },
        refNo: {
          view: true,
          edit: true,
          create: true,
        },
        purposeOfVisit: {
          view: true,
          edit: true,
          create: true,
        },
        remarks: {
          view: true,
          edit: true,
          create: true,
        },
        roomType: {
          view: true,
          edit: true,
          create: true,
        },
        roomNo: {
          view: true,
          edit: true,
          create: true,
        },
        adults: {
          view: true,
          edit: true,
          create: true,
        },
        children: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    membershipRules: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true,
          create: true,
        },
        customerGroup: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        card: {
          view: true,
          edit: true,
          create: true,
        },
        pointFrom: {
          view: true,
          edit: true,
          create: true,
        },
        pointTo: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    manufacturingOrders: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        product: {
          view: true,
          edit: true,
          create: true,
        },
        quantity: {
          view: true,
          edit: true,
          create: true,
        },
        deadline: {
          view: true,
          edit: true,
          create: true,
        },
        planFrom: {
          view: true,
          edit: true,
          create: true,
        },
        unitOfMeasure: {
          view: true,
          edit: true,
          create: true,
        },
        responsible: {
          view: true,
          edit: true,
          create: true,
        },
        bomCode: {
          view: true,
          edit: true,
          create: true,
        },
        referenceCode: {
          view: true,
          edit: true,
          create: true,
        },
        routing: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    loyaltyPrograms: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true,
          create: true,
        },
        customerGroup: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        minimumPurchase: {
          view: true,
          edit: true,
          create: true,
        },
        accountCreationPoint: {
          view: true,
          edit: true,
          create: true,
        },
        birthdayPoint: {
          view: true,
          edit: true,
          create: true,
        },
        redeemType: {
          view: true,
          edit: true,
          create: true,
        },
        minimumPointToRedeem: {
          view: true,
          edit: true,
          create: true,
        },
        maxAmountReceive: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        redeemInPortal: {
          view: true,
          edit: true,
          create: true,
        },
        redeemInPos: {
          view: true,
          edit: true,
          create: true,
        },
        ruleName: {
          view: true,
          edit: true,
          create: true,
        },
        pointFrom: {
          view: true,
          edit: true,
          create: true,
        },
        pointTo: {
          view: true,
          edit: true,
          create: true,
        },
        weight: {
          view: true,
          edit: true,
          create: true,
        },
        rulesStatus: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    loyaltyUsers: {
      formPermissions: {
        create: false,
        view: false, // false for test user
        edit: false,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
    },
    bookingSource: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        bookingSource: {
          view: true,
          edit: true,
          create: true,
        },
        commissionRate: {
          view: true,
          edit: true,
          create: true,
        },
        bookingType: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    jobCategories: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    shifts: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        shift: {
          view: true,
          edit: true,
          create: true,
        },
        startTime: {
          view: true,
          edit: true,
          create: true,
        },
        endTime: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    "asset-maintenances": {
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
        asset: {
          view: true,
          edit: true,
          create: true,
        },
        maintenanceType: {
          view: true,
          edit: true,
          create: true,
        },
        title: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        completionDate: {
          view: true,
          edit: true,
          create: true,
        },
        warrantyImprovement: {
          view: true,
          edit: true,
          create: true,
        },
        cost: {
          view: true,
          edit: true,
          create: true,
        },
        notes: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    "shift-type": {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        color: {
          view: true,
          edit: true,
          create: true,
        },
        startTime: {
          view: true,
          edit: true,
          create: true,
        },
        endTime: {
          view: true,
          edit: true,
          create: true,
        },
        lunchStart: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    candidateList: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
        flag: true,
      },
      fieldPermissions: {
        firstName: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        email: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    unavailableDates: {
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
        unavailableDate: {
          view: true,
          edit: true,
          create: true,
        },
        startTime: {
          view: true,
          edit: true,
          create: true,
        },
        endTime: {
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
    jobLocations: {
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
        jobLocation: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
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
    documents: {
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
        documentNo: { view: true, edit: true, create: true },
        piNo: { view: true, edit: true, create: true },
        invoiceNo: { view: true, edit: true, create: true },
        orderBy: { view: true, edit: true, create: true },
        shipmentType: { view: true, edit: true, create: true },
        documentDate: { view: true, edit: true, create: true },
        piDate: { view: true, edit: true, create: true },
        invoiceDate: { view: true, edit: true, create: true },
        mobileNo: { view: true, edit: true, create: true },
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
    goods: {
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
        description: { view: true, edit: true, create: true },
        netWeight: { view: true, edit: true, create: true },
        totalCTN: { view: true, edit: true, create: true },
        totalPCS: { view: true, edit: true, create: true },
        artWork: { view: true, edit: true, create: true },
        piNoImage: { view: true, edit: true, create: true },
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
    courier: {
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
        documentRequired: { view: true, edit: true, create: true },
        courierName: { view: true, edit: true, create: true },
        contactPerson: { view: true, edit: true, create: true },
        airwayLocation: { view: true, edit: true, create: true },
        trackingNo: { view: true, edit: true, create: true },
        mobileNo: { view: true, edit: true, create: true },
        email: { view: true, edit: true, create: true },
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
    rentalRequests: {
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
        propertyName: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        requestNumber: {
          view: true,
          edit: true,
          create: true,
        },
        inspected: {
          view: true,
          edit: true,
          create: true,
        },
        leaseStartDate: {
          view: true,
          edit: true,
          create: true,
        },
        term: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        dateCreated: {
          view: true,
          edit: true,
          create: true,
        },
        propertyPrice: {
          view: true,
          edit: true,
          create: true,
        },
        contractAmount: {
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

    wakeUpCalls: {
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
        customerName: {
          view: true,
          edit: true,
          create: true,
        },
        dateAndTime: {
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

    awardLists: {
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
        awardName: { view: true, edit: true, create: true },
        employeeName: { view: true, edit: true, create: true },
        awardBy: { view: true, edit: true, create: true },
        date: { view: true, edit: true, create: true },
        giftItem: { view: true, edit: true, create: true },
        awardDescription: { view: true, edit: true, create: true },

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

    noticeBoards: {
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
        noticeType: { view: true, edit: true, create: true },
        noticeBy: { view: true, edit: true, create: true },
        noticeDate: { view: true, edit: true, create: true },
        description: { view: true, edit: true, create: true },
        noticeAttachment: { view: true, edit: true, create: true },
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

    employeePerformances: {
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
        employeeName: { view: true, edit: true, create: true },
        reviewPeriodInMonths: { view: true, edit: true, create: true },
        nameAndPositionOfSupervisorHeadOfDepartment: {
          view: true,
          edit: true,
          create: true,
        },
        demonstratedKnowledgeOfDutiesQualityOfWork: {
          view: true,
          edit: true,
          create: true,
        },
        timelinessOfDelivery: { view: true, edit: true, create: true },
        impactOfAchievement: { view: true, edit: true, create: true },
        overallAchievementOfGoalsObjectives: {
          view: true,
          edit: true,
          create: true,
        },
        goingBeyondTheCallOfDuty: { view: true, edit: true, create: true },
        interpersonalSkillsAbilityToWorkInATeamEnvironment: {
          view: true,
          edit: true,
          create: true,
        },
        attendanceAndPunctuality: { view: true, edit: true, create: true },
        communicationSkills: { view: true, edit: true, create: true },
        contributingToCompanyMission: { view: true, edit: true, create: true },
        totalScore: { view: true, edit: true, create: true },

        reviewerName: { view: true, edit: true, create: true },
        reviewerSignature: { view: true, edit: true, create: true },
        reviewDate: { view: true, edit: true, create: true },
        nextReviewPeriod: { view: true, edit: true, create: true },

        employeeComments: { view: true, edit: true, create: true },

        demonstratedKnowledgeOfDutiesQualityOfWorkScore: {
          view: true,
          edit: true,
          create: true,
        },
        demonstratedKnowledgeOfDutiesQualityOfWorkComments: {
          view: true,
          edit: true,
          create: true,
        },
        timelinessOfDeliveryScore: {
          view: true,
          edit: true,
          create: true,
        },
        timelinessOfDeliveryComments: {
          view: true,
          edit: true,
          create: true,
        },
        impactOfAchievementScore: {
          view: true,
          edit: true,
          create: true,
        },
        impactOfAchievementComments: {
          view: true,
          edit: true,
          create: true,
        },
        overallAchievementOfGoalsObjectivesScore: {
          view: true,
          edit: true,
          create: true,
        },
        overallAchievementOfGoalsObjectivesComments: {
          view: true,
          edit: true,
          create: true,
        },
        goingBeyondTheCallOfDutyScore: {
          view: true,
          edit: true,
          create: true,
        },
        goingBeyondTheCallOfDutyComments: {
          view: true,
          edit: true,
          create: true,
        },
        interpersonalSkillsAbilityToWorkInATeamEnvironmentScore: {
          view: true,
          edit: true,
          create: true,
        },
        interpersonalSkillsAbilityToWorkInATeamEnvironmentComments: {
          view: true,
          edit: true,
          create: true,
        },
        attendanceAndPunctualityScore: {
          view: true,
          edit: true,
          create: true,
        },
        attendanceAndPunctualityComments: {
          view: true,
          edit: true,
          create: true,
        },
        communicationSkillsScore: {
          view: true,
          edit: true,
          create: true,
        },
        communicationSkillsComments: {
          view: true,
          edit: true,
          create: true,
        },
        contributingToCompanyMissionScore: {
          view: true,
          edit: true,
          create: true,
        },
        contributingToCompanyMissionComments: {
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

    vehicles: {
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
        vehicle: { view: true, edit: true, create: true },
        vin: { view: true, edit: true, create: true },
        licensePlate: { view: true, edit: true, create: true },
        vehicleType: { view: true, edit: true, create: true },
        year: { view: true, edit: true, create: true },
        make: { view: true, edit: true, create: true },
        model: { view: true, edit: true, create: true },
        trim: { view: true, edit: true, create: true },
        registration: { view: true, edit: true, create: true },
        vehicleGroup: { view: true, edit: true, create: true },
        ownership: { view: true, edit: true, create: true },
        color: { view: true, edit: true, create: true },
        bodyType: { view: true, edit: true, create: true },
        subBodyType: { view: true, edit: true, create: true },
        msrp: { view: true, edit: true, create: true },
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
    fuels: {
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
        vehicle: { view: true, edit: true, create: true },
        fuelTime: { view: true, edit: true, create: true },
        odometer: { view: true, edit: true, create: true },
        gallons: { view: true, edit: true, create: true },
        price: { view: true, edit: true, create: true },
        fuelType: { view: true, edit: true, create: true },
        vendor: { view: true, edit: true, create: true },
        reference: { view: true, edit: true, create: true },
        description: { view: true, edit: true, create: true },
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

    parts: {
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
        name: { view: true, edit: true, create: true },
        partsType: { view: true, edit: true, create: true },
        brand: { view: true, edit: true, create: true },
        model: { view: true, edit: true, create: true },
        serialNumber: { view: true, edit: true, create: true },
        linkedVehicle: { view: true, edit: true, create: true },
        currentAssignee: { view: true, edit: true, create: true },
        partGroup: { view: true, edit: true, create: true },
        status: { view: true, edit: true, create: true },
        purchaseVendor: { view: true, edit: true, create: true },
        purchaseDate: { view: true, edit: true, create: true },
        warrantyDate: { view: true, edit: true, create: true },
        comments: { view: true, edit: true, create: true },
        serviceDate: { view: true, edit: true, create: true },
        serviceMonths: { view: true, edit: true, create: true },
        resaleValue: { view: true, edit: true, create: true },
        outOfDate: { view: true, edit: true, create: true },
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
    propertyOwner: {
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
        code: { view: true, edit: true, create: true },
        ownerName: { view: true, edit: true, create: true },
        vatNumber: { view: true, edit: true, create: true },
        email: { view: true, edit: true, create: true },
        phoneNumber: { view: true, edit: true, create: true },
        website: { view: true, edit: true, create: true },
        address: { view: true, edit: true, create: true },
        city: { view: true, edit: true, create: true },
        state: { view: true, edit: true, create: true },
        zipCode: { view: true, edit: true, create: true },
        country: { view: true, edit: true, create: true },
        profileImage: { view: true, edit: true, create: true },

        facebookUrl: { view: true, edit: true, create: true },
        instagramUrl: { view: true, edit: true, create: true },
        whatsappUrl: { view: true, edit: true, create: true },

        billingStreet: { view: true, edit: true, create: true },
        billingCity: { view: true, edit: true, create: true },
        billingState: { view: true, edit: true, create: true },
        billingZipCode: { view: true, edit: true, create: true },
        billingCountry: { view: true, edit: true, create: true },

        shippingStreet: { view: true, edit: true, create: true },
        shippingCity: { view: true, edit: true, create: true },
        shippingState: { view: true, edit: true, create: true },
        shippingZipCode: { view: true, edit: true, create: true },
        shippingCountry: { view: true, edit: true, create: true },

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
    property: {
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
        propertyCode: { view: true, edit: true, create: true },
        propertyName: { view: true, edit: true, create: true },
        group: { view: true, edit: true, create: true },
        propertyType: { view: true, edit: true, create: true },
        propertyStyle: { view: true, edit: true, create: true },
        status: { view: true, edit: true, create: true },
        transactionType: { view: true, edit: true, create: true },

        sellingPrice: { view: true, edit: true, create: true },
        propertyNumber: { view: true, edit: true, create: true },
        propertyCondition: { view: true, edit: true, create: true },
        newConstruction: { view: true, edit: true, create: true },
        yearBuilt: { view: true, edit: true, create: true },
        availabilityDate: { view: true, edit: true, create: true },

        lotSizeSqm: { view: true, edit: true, create: true },
        totalFloors: { view: true, edit: true, create: true },
        energyEfficiency: { view: true, edit: true, create: true },
        gasEmission: { view: true, edit: true, create: true },
        energyEfficient: { view: true, edit: true, create: true },

        building: { view: true, edit: true, create: true },
        streetNumber: { view: true, edit: true, create: true },
        streetName: { view: true, edit: true, create: true },
        streetType: { view: true, edit: true, create: true },
        zone: { view: true, edit: true, create: true },
        city: { view: true, edit: true, create: true },
        state: { view: true, edit: true, create: true },
        zipCode: { view: true, edit: true, create: true },
        areaNumber: { view: true, edit: true, create: true },
        country: { view: true, edit: true, create: true },
        latitude: { view: true, edit: true, create: true },
        longitude: { view: true, edit: true, create: true },

        nearestHospital: { view: true, edit: true, create: true },
        nearestSchool: { view: true, edit: true, create: true },
        nearestLandmark: { view: true, edit: true, create: true },
        description: { view: true, edit: true, create: true },
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
    propertyApproval: {
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
        propertyCode: { view: true, edit: true, create: true },
        propertyName: { view: true, edit: true, create: true },
        group: { view: true, edit: true, create: true },
        propertyType: { view: true, edit: true, create: true },
        propertyStyle: { view: true, edit: true, create: true },
        status: { view: true, edit: true, create: true },
        transactionType: { view: true, edit: true, create: true },

        sellingPrice: { view: true, edit: true, create: true },
        propertyNumber: { view: true, edit: true, create: true },
        propertyCondition: { view: true, edit: true, create: true },
        newConstruction: { view: true, edit: true, create: true },
        yearBuilt: { view: true, edit: true, create: true },
        availabilityDate: { view: true, edit: true, create: true },

        lotSizeSqm: { view: true, edit: true, create: true },
        totalFloors: { view: true, edit: true, create: true },
        energyEfficiency: { view: true, edit: true, create: true },
        gasEmission: { view: true, edit: true, create: true },
        energyEfficient: { view: true, edit: true, create: true },

        building: { view: true, edit: true, create: true },
        streetNumber: { view: true, edit: true, create: true },
        streetName: { view: true, edit: true, create: true },
        streetType: { view: true, edit: true, create: true },
        zone: { view: true, edit: true, create: true },
        city: { view: true, edit: true, create: true },
        state: { view: true, edit: true, create: true },
        zipCode: { view: true, edit: true, create: true },
        areaNumber: { view: true, edit: true, create: true },
        country: { view: true, edit: true, create: true },
        latitude: { view: true, edit: true, create: true },
        longitude: { view: true, edit: true, create: true },

        nearestHospital: { view: true, edit: true, create: true },
        nearestSchool: { view: true, edit: true, create: true },
        nearestLandmark: { view: true, edit: true, create: true },
        description: { view: true, edit: true, create: true },
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

    tenant: {
      formPermissions: {
        create: false,
        view: false,
        edit: false,
        delete: false,
        restore: false,
        export: false,
        import: false,
        pdf: false,
        print: false,
        history: true,
      },
      fieldPermissions: {
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
    depreciations: {
      formPermissions: {
        create: false,
        view: false,
        edit: false,
        delete: false,
        restore: false,
        export: false,
        import: false,
        pdf: false,
        print: false,
        history: true,
      },
      fieldPermissions: {
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
    expenses: {
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
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        voucherNumber: {
          view: true,
          edit: true,
          create: true,
        },
        category: {
          view: true,
          edit: true,
          create: true,
        },
        subCategory: {
          view: true,
          edit: true,
          create: true,
        },
        expense: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        amount: {
          view: true,
          edit: true,
          create: true,
        },
        currency: {
          view: true,
          edit: true,
          create: true,
        },
        paymentMode: {
          view: true,
          edit: true,
          create: true,
        },
        vat: {
          view: true,
          edit: true,
          create: true,
        },
        supplier: {
          view: true,
          edit: true,
          create: true,
        },
        approvedBy: {
          view: true,
          edit: true,
          create: true,
        },
        purchaseInvoiceNumber: {
          view: true,
          edit: true,
          create: true,
        },
        supplierVatNumber: {
          view: true,
          edit: true,
          create: true,
        },
        expenseBy: {
          view: true,
          edit: true,
          create: true,
        },
        expenseFor: {
          view: true,
          edit: true,
          create: true,
        },
        note: {
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
    terms: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        termsConditions: {
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
    transferCash: {
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
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        transferFrom: {
          view: true,
          edit: true,
          create: true,
        },
        transferTo: {
          view: true,
          edit: true,
          create: true,
        },
        transferAmount: {
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
    deductions: {
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
        iqamaNo: {
          view: true,
          edit: true,
          create: true,
        },
        deductionType: {
          view: true,
          edit: true,
          create: true,
        },
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        deductionAmount: {
          view: true,
          edit: true,
          create: true,
        },
        notes: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
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

    allowances: {
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
        iqamaNo: {
          view: true,
          edit: true,
          create: true,
        },
        allowanceType: {
          view: true,
          edit: true,
          create: true,
        },
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        allowanceAmount: {
          view: true,
          edit: true,
          create: true,
        },
        notes: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
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

    loans: {
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
        iqamaNo: {
          view: true,
          edit: true,
          create: true,
        },
        permittedBy: {
          view: true,
          edit: true,
          create: true,
        },
        approvedDate: {
          view: true,
          edit: true,
          create: true,
        },
        repaymentFrom: {
          view: true,
          edit: true,
          create: true,
        },
        amount: {
          view: true,
          edit: true,
          create: true,
        },
        interestPercentage: {
          view: true,
          edit: true,
          create: true,
        },
        installmentPeriod: {
          view: true,
          edit: true,
          create: true,
        },
        repaymentAmount: {
          view: true,
          edit: true,
          create: true,
        },
        installment: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        loanDetails: {
          view: true,
          edit: true,
          create: true,
        },
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
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

    appointments: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        mobile: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        appointmentDate: {
          view: true,
          edit: true,
          create: true,
        },
        appointmentTime: {
          view: true,
          edit: true,
          create: true,
        },
        appointmentBy: {
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
    insurances: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        date: {
          view: true, // false for test user
          edit: true,
          create: true,
        },

        status: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    certificates: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        date: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },
    candidateSelections: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        name: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        position: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        team: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },

    financialYear: {
      formPermissions: {
        create: true,
        view: true, // false for test user
        edit: true,
        delete: true, // false for test user
        restore: true,
        export: true,
        import: true, // false for test user
        pdf: true,
        print: true, // false for test user
        history: true,
      },
      fieldPermissions: {
        title: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
        fromDate: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        toDate: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        status: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: true,
          create: true, // false for test user
        },
        lastUpdated: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        createdBy: {
          view: true, // true for test user
          edit: true,
          create: true, // false for test user
        },
        isDefault: {
          view: true, // false for test user
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true, // false for test user
          create: true,
        },
      },
    },

    salaryAdvance: {
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
        date: {
          view: true,
          edit: true,
          create: true,
        },
        iqamaNo: {
          view: true,
          edit: true,
          create: true,
        },
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        paymentMode: {
          view: true,
          edit: true,
          create: true,
        },
        advanceAmount: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    benefitPenalty: {
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
        type: {
          view: true,
          edit: true,
          create: true,
        },
        subject: {
          view: true,
          edit: true,
          create: true,
        },
        criteria: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        driver: {
          view: true,
          edit: true,
          create: true,
        },
        formality: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    maintenance: {
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
        vehicle: {
          view: true,
          edit: true,
          create: true,
        },
        garage: {
          view: true,
          edit: true,
          create: true,
        },
        maintenanceType: {
          view: true,
          edit: true,
          create: true,
        },
        serviceName: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        completionDate: {
          view: true,
          edit: true,
          create: true,
        },
        parts: {
          view: true,
          edit: true,
          create: true,
        },
        cost: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    bonus: {
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
        date: {
          view: true,
          edit: true,
          create: true,
        },
        iqamaNo: {
          view: true,
          edit: true,
          create: true,
        },
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        bonusType: {
          view: true,
          edit: true,
          create: true,
        },
        bonusAmount: {
          view: true,
          edit: true,
          create: true,
        },
        notes: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    employeeContract: {
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
        staffName: {
          view: true,
          edit: true,
          create: true,
        },
        contactType: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        salaryAllowance: {
          view: true,
          edit: true,
          create: true,
        },
        effectiveDate: {
          view: true,
          edit: true,
          create: true,
        },
        expirationDate: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    weeklyHolidays: {
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
        holidayName: {
          view: true,
          edit: true,
          create: true,
        },
        fromDate: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        totalDays: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    leadSources: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    leadStatuses: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        order: {
          view: true,
          edit: true,
          create: true,
        },
        color: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    transfer: {
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
        date: {
          view: true,
          edit: true,
          create: true,
        },
        iqamaNo: {
          view: true,
          edit: true,
          create: true,
        },
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        from: {
          view: true,
          edit: true,
          create: true,
        },
        to: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    interview: {
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
        candidateName: {
          view: true,
          edit: true,
          create: true,
        },
        interviewer: { view: true, edit: true, create: true },
        interviewDate: { view: true, edit: true, create: true },
        vivaMarks: { view: true, edit: true, create: true },
        writtenTotalMarks: { view: true, edit: true, create: true },
        mcqTotalMarks: { view: true, edit: true, create: true },
        totalMarks: { view: true, edit: true, create: true },
        recommendation: { view: true, edit: true, create: true },
        selectInterviewer: { view: true, edit: true, create: true },
        details: { view: true, edit: true, create: true },
        isDraft: { view: true, edit: true, create: true },
        isDeleted: { view: true, edit: true, create: true },
        createdAt: { view: true, edit: false, create: true },
        updatedAt: { view: true, edit: false, create: true },
        draftedAt: { view: true, edit: false, create: true },
        deletedAt: { view: true, edit: false, create: true },
      },
    },
    contactType: {
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
        name: { view: true, edit: true, create: true },
        description: { view: true, edit: true, create: true },
        isDeleted: { view: true, edit: true, create: true },
        createdAt: { view: true, edit: false, create: true },
        updatedAt: { view: true, edit: false, create: true },
        isDraft: { view: true, edit: true, create: true },
        deletedAt: { view: true, edit: false, create: true },
      },
    },
    termination: {
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
        date: {
          view: true,
          edit: true,
          create: true,
        },
        iqamaNo: {
          view: true,
          edit: true,
          create: true,
        },
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        terminationType: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    shiftType: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        color: {
          view: true,
          edit: true,
          create: true,
        },
        startTime: {
          view: true,
          edit: true,
          create: true,
        },
        endTime: {
          view: true,
          edit: true,
          create: true,
        },
        lunchStart: {
          view: true,
          edit: true,
          create: true,
        },
        lunchEnd: {
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
    skills: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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

    portMaster: {
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
        portCode: {
          view: true,
          edit: true,
          create: true,
        },
        portName: {
          view: true,
          edit: true,
          create: true,
        },
        portType: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        address: {
          view: true,
          edit: true,
          create: true,
        },
        landmark: {
          view: true,
          edit: true,
          create: true,
        },
        contactPerson: {
          view: true,
          edit: true,
          create: true,
        },
        mobileNo: {
          view: true,
          edit: true,
          create: true,
        },
        phoneNo: {
          view: true,
          edit: true,
          create: true,
        },
        faxNo: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
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
      },
    },

    agentMaster: {
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
        agentCode: {
          view: true,
          edit: true,
          create: true,
        },
        agentName: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        notification: {
          view: true,
          edit: true,
          create: true,
        },
        portType: {
          view: true,
          edit: true,
          create: true,
        },
        portName: {
          view: true,
          edit: true,
          create: true,
        },
        address: {
          view: true,
          edit: true,
          create: true,
        },
        landmark: {
          view: true,
          edit: true,
          create: true,
        },
        contact: {
          view: true,
          edit: true,
          create: true,
        },
        mobileNo: {
          view: true,
          edit: true,
          create: true,
        },
        phoneNo: {
          view: true,
          edit: true,
          create: true,
        },
        faxNo: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
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
      },
    },
    consigneeMaster: {
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
        customerCode: {
          view: true,
          edit: true,
          create: true,
        },
        customerName: {
          view: true,
          edit: true,
          create: true,
        },
        notification: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        zipCode: {
          view: true,
          edit: true,
          create: true,
        },
        address: {
          view: true,
          edit: true,
          create: true,
        },
        landmark: {
          view: true,
          edit: true,
          create: true,
        },
        poBox: {
          view: true,
          edit: true,
          create: true,
        },
        currency: {
          view: true,
          edit: true,
          create: true,
        },
        paymentTerms: {
          view: true,
          edit: true,
          create: true,
        },
        creditPeriod: {
          view: true,
          edit: true,
          create: true,
        },
        creditLimit: {
          view: true,
          edit: true,
          create: true,
        },
        mobileNo: {
          view: true,
          edit: true,
          create: true,
        },
        contactPerson: {
          view: true,
          edit: true,
          create: true,
        },
        faxNo: {
          view: true,
          edit: true,
          create: true,
        },
        phoneNo: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
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
      },
    },
    transitOrder: {
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
        sn: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        company: {
          view: true,
          edit: true,
          create: true,
        },
        piNo: {
          view: true,
          edit: true,
          create: true,
        },
        invoiceNo: {
          view: true,
          edit: true,
          create: true,
        },
        supplierName: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        loginId: {
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
      },
    },
    purchaseOrderLogistic: {
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
        sn: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        company: {
          view: true,
          edit: true,
          create: true,
        },
        piNo: {
          view: true,
          edit: true,
          create: true,
        },
        invoiceNo: {
          view: true,
          edit: true,
          create: true,
        },
        supplierName: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        loginId: {
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
        note: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },

    arrivalPort: {
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
        country: {
          view: true,
          edit: true,
          create: true,
        },
        company: {
          view: true,
          edit: true,
          create: true,
        },
        containerNo: {
          view: true,
          edit: true,
          create: true,
        },
        arrivalDate: {
          view: true,
          edit: true,
          create: true,
        },
        validityTill: {
          view: true,
          edit: true,
          create: true,
        },

        date: {
          view: true,
          edit: true,
          create: true,
        },
        loginId: {
          view: true,
          edit: true,
          create: true,
        },

        status: {
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
      },
    },

    receivePortLogistic: {
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
        sn: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        company: {
          view: true,
          edit: true,
          create: true,
        },
        piNo: {
          view: true,
          edit: true,
          create: true,
        },
        invoiceNo: {
          view: true,
          edit: true,
          create: true,
        },
        supplierName: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        loginId: {
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
        note: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },

    checks: {
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
        vendorName: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        bankAccount: {
          view: true,
          edit: true,
          create: true,
        },
        amount: {
          view: true,
          edit: true,
          create: true,
        },
        checkNumber: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        memo: {
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
      },
    },
    houseKeeper: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    assignHouseKeepers: {
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
        houseKeeperName: {
          view: true,
          edit: true,
          create: true,
        },
        roomSizeName: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    devices: {
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
        deviceCode: {
          view: true,
          edit: true,
          create: true,
        },
        name: {
          view: true,
          edit: true,
          create: true,
        },
        serialNo: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        model: {
          view: true,
          edit: true,
          create: true,
        },
        productionDate: {
          view: true,
          edit: true,
          create: true,
        },
        purchaseDate: {
          view: true,
          edit: true,
          create: true,
        },
        warrantyStartingDate: {
          view: true,
          edit: true,
          create: true,
        },
        warrantyPeriodMonths: {
          view: true,
          edit: true,
          create: true,
        },
        warrantyExpiryDate: {
          view: true,
          edit: true,
          create: true,
        },
        warrantyExpiringAlert: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        image: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    repairJobs: {
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
        repairJobId: {
          view: true,
          edit: true,
          create: true,
        },
        repairJobName: {
          view: true,
          edit: true,
          create: true,
        },
        appointmentDate: {
          view: true,
          edit: true,
          create: true,
        },
        estimatedCompletionDate: {
          view: true,
          edit: true,
          create: true,
        },
        device: {
          view: true,
          edit: true,
          create: true,
        },
        repairLocation: {
          view: true,
          edit: true,
          create: true,
        },
        billingType: {
          view: true,
          edit: true,
          create: true,
        },
        deliveryType: {
          view: true,
          edit: true,
          create: true,
        },
        appointmentType: {
          view: true,
          edit: true,
          create: true,
        },
        collectionType: {
          view: true,
          edit: true,
          create: true,
        },
        mechanic: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        reference: {
          view: true,
          edit: true,
          create: true,
        },
        discount: {
          view: true,
          edit: true,
          create: true,
        },
        issueDescription: {
          view: true,
          edit: true,
          create: true,
        },
        jobDescription: {
          view: true,
          edit: true,
          create: true,
        },
        additionDescription: {
          view: true,
          edit: true,
          create: true,
        },
        termsCondition: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
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
    transporter: {
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
        transporterCountry: {
          view: true,
          edit: true,
          create: true,
        },
        transporterName: {
          view: true,
          edit: true,
          create: true,
        },
        contactPerson: {
          view: true,
          edit: true,
          create: true,
        },
        mobileNo: {
          view: true,
          edit: true,
          create: true,
        },
        phoneNo: {
          view: true,
          edit: true,
          create: true,
        },
        faxNo: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
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
      },
    },
    supplier: {
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
        country: {
          view: true,
          edit: true,
          create: true,
        },
        supplierName: {
          view: true,
          edit: true,
          create: true,
        },
        paymentTerms: {
          view: true,
          edit: true,
          create: true,
        },
        dueDays: {
          view: true,
          edit: true,
          create: true,
        },
        typeOfDeposit: {
          view: true,
          edit: true,
          create: true,
        },
        paymentType: {
          view: true,
          edit: true,
          create: true,
        },
        depositAmount: {
          view: true,
          edit: true,
          create: true,
        },
        currency: {
          view: true,
          edit: true,
          create: true,
        },
        exchangeRate: {
          view: true,
          edit: true,
          create: true,
        },
        localAmt: {
          view: true,
          edit: true,
          create: true,
        },
        contactPerson: {
          view: true,
          edit: true,
          create: true,
        },
        mobileNo: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
          view: true,
          edit: true,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
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
      },
    },

    shipping: {
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
        shipperCountry: {
          view: true,
          edit: true,
          create: true,
        },
        shipperName: {
          view: true,
          edit: true,
          create: true,
        },
        contactPerson: {
          view: true,
          edit: true,
          create: true,
        },
        mobileNo: {
          view: true,
          edit: true,
          create: true,
        },
        phoneNo: {
          view: true,
          edit: true,
          create: true,
        },
        faxNo: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
          view: true,
          edit: true,
          create: true,
        },
        shipmentRate: {
          view: true,
          edit: true,
          create: true,
        },
        cbm: {
          view: true,
          edit: true,
          create: true,
        },
        freightCost: {
          view: true,
          edit: true,
          create: true,
        },
        currencyType: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        loginId: {
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
      },
    },

    store: {
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
        storeCode: {
          view: true,
          edit: true,
          create: true,
        },
        storeName: {
          view: true,
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        address: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        capacity: {
          view: true,
          edit: true,
          create: true,
        },
        storeType: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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

    table: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        tableName: {
          view: true,
          edit: true,
          create: true,
        },
        person: {
          view: true,
          edit: true,
          create: true,
        },
        location: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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

    uoms: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        uomName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    sections: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        name: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        manager: {
          view: true,
          edit: true,
          create: true,
        },
        employeesCount: {
          view: true,
          edit: true,
          create: true,
        },
        budget: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    "sample-category": {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    "sample-receiving": {
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
        branch: {
          view: true,
          edit: true,
          create: true,
        },
        receivingNo: {
          view: true,
          edit: true,
          create: true,
        },
        clientName: {
          view: true,
          edit: true,
          create: true,
        },
        clientReference: {
          view: true,
          edit: true,
          create: true,
        },
        typeOfSample: {
          view: true,
          edit: true,
          create: true,
        },
        requiredTests: {
          view: true,
          edit: true,
          create: true,
        },
        numberOfSample: {
          view: true,
          edit: true,
          create: true,
        },
        section: {
          view: true,
          edit: true,
          create: true,
        },
        deliveredBy: {
          view: true,
          edit: true,
          create: true,
        },
        receivedBy: {
          view: true,
          edit: true,
          create: true,
        },
        receivingDate: {
          view: true,
          edit: true,
          create: true,
        },
        receivingTime: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    leaves: {
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
        leaveTypes: {
          view: true,
          edit: true,
          create: true,
        },
        notes: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    tasks: {
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
        subject: {
          view: true,
          edit: true,
          create: true,
        },
        hourlyRate: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        dueDate: {
          view: true,
          edit: true,
          create: true,
        },
        priority: {
          view: true,
          edit: true,
          create: true,
        },
        repeatEvery: {
          view: true,
          edit: true,
          create: true,
        },
        relatedTo: {
          view: true,
          edit: true,
          create: true,
        },
        assignees: {
          view: true,
          edit: true,
          create: true,
        },
        followers: {
          view: true,
          edit: true,
          create: true,
        },
        checklist: {
          view: true,
          edit: true,
          create: true,
        },
        tags: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    packing: {
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
        sn: {
          view: true,
          edit: true,
          create: true,
        },
        documentName: {
          view: true,
          edit: true,
          create: true,
        },
        selectFile: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        loginId: {
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
      },
    },
    jobPost: {
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
        company: {
          view: true,
          edit: true,
          create: true,
        },
        jobTitle: {
          view: true,
          edit: true,
          create: true,
        },
        jobCategory: {
          view: true,
          edit: true,
          create: true,
        },
        jobType: {
          view: true,
          edit: true,
          create: true,
        },
        noOfVacancies: {
          view: true,
          edit: true,
          create: true,
        },
        closingDate: {
          view: true,
          edit: true,
          create: true,
        },
        gender: {
          view: true,
          edit: true,
          create: true,
        },
        minimumExperience: {
          view: true,
          edit: true,
          create: true,
        },
        isFeatured: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        shortDescription: {
          view: true,
          edit: true,
          create: true,
        },
        longDescription: {
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
      },
    },
    licenses: {
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
        softwareName: {
          view: true,
          edit: true,
          create: true,
        },
        category: {
          view: true,
          edit: true,
          create: true,
        },
        productKey: {
          view: true,
          edit: true,
          create: true,
        },
        seats: {
          view: true,
          edit: true,
          create: true,
        },
        manufacturer: {
          view: true,
          edit: true,
          create: true,
        },
        licensedName: {
          view: true,
          edit: true,
          create: true,
        },
        licensedEmail: {
          view: true,
          edit: true,
          create: true,
        },
        supplier: {
          view: true,
          edit: true,
          create: true,
        },
        orderNumber: {
          view: true,
          edit: true,
          create: true,
        },
        purchaseOrderNumber: {
          view: true,
          edit: true,
          create: true,
        },
        purchaseCost: {
          view: true,
          edit: true,
          create: true,
        },
        purchaseDate: {
          view: true,
          edit: true,
          create: true,
        },
        expirationDate: {
          view: true,
          edit: true,
          create: true,
        },
        terminationDate: {
          view: true,
          edit: true,
          create: true,
        },
        depreciation: {
          view: true,
          edit: true,
          create: true,
        },
        notes: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
      },
    },
    positions: {
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
        positionName: {
          view: true,
          edit: true,
          create: true,
        },
        positionDetails: {
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
      },
    },
    complementaries: {
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
        roomType: {
          view: true,
          edit: true,
          create: true,
        },
        complementary: {
          view: true,
          edit: true,
          create: true,
        },
        rate: {
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
      },
    },
    workOrders: {
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
        workOrder: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        workCenter: {
          view: true,
          edit: true,
          create: true,
        },
        manufacturingOrder: {
          view: true,
          edit: true,
          create: true,
        },
        productQuantity: {
          view: true,
          edit: true,
          create: true,
        },
        unit: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
      },
    },
    preAlerts: {
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
        tracking: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        shippingCompany: {
          view: true,
          edit: true,
          create: true,
        },
        supplier: {
          view: true,
          edit: true,
          create: true,
        },
        packageDescription: {
          view: true,
          edit: true,
          create: true,
        },
        deliveryDate: {
          view: true,
          edit: true,
          create: true,
        },
        purchasePrice: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
      },
    },
    checkin: {
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
        bookingNo: {
          view: true,
          edit: true,
          create: true,
        },
        checkIn: {
          view: true,
          edit: true,
          create: true,
        },
        checkOut: {
          view: true,
          edit: true,
          create: true,
        },
        arrivalFrom: {
          view: true,
          edit: true,
          create: true,
        },
        bookingType: {
          view: true,
          edit: true,
          create: true,
        },
        bookingReference: {
          view: true,
          edit: true,
          create: true,
        },
        bookingRefNo: {
          view: true,
          edit: true,
          create: true,
        },
        purposeOfVisit: {
          view: true,
          edit: true,
          create: true,
        },
        remarks: {
          view: true,
          edit: true,
          create: true,
        },
        roomType: {
          view: true,
          edit: true,
          create: true,
        },
        roomNo: {
          view: true,
          edit: true,
          create: true,
        },
        adults: {
          view: true,
          edit: true,
          create: true,
        },
        children: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
      },
    },
    checkout: {
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
        roomNo: {
          view: true,
          edit: true,
          create: true,
        },
        guestName: {
          view: true,
          edit: true,
          create: true,
        },
        checkInDate: {
          view: true,
          edit: true,
          create: true,
        },
        checkOutDate: {
          view: true,
          edit: true,
          create: true,
        },
        roomType: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
      },
    },
    deliveryOrderLogistic: {
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
        sn: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        company: {
          view: true,
          edit: true,
          create: true,
        },
        piNo: {
          view: true,
          edit: true,
          create: true,
        },
        invoiceNo: {
          view: true,
          edit: true,
          create: true,
        },
        supplierName: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        date: {
          view: true,
          edit: true,
          create: true,
        },
        loginId: {
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
      },
    },

    colors: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        hexCode: {
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
      },
    },
    sizes: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        value: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
    "damage-items": {
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
        itemId: {
          view: true,
          edit: true,
          create: true,
        },
        quantityDamaged: {
          view: true,
          edit: true,
          create: true,
        },
        documentDate: {
          view: true,
          edit: true,
          create: true,
        },
        reportedBy: {
          view: true,
          edit: true,
          create: true,
        },
        location: {
          view: true,
          edit: true,
          create: true,
        },
        damageType: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    brands: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
    dealers: {
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
        customerNo: {
          view: true,
          edit: true,
          create: true,
        },
        customerName: {
          view: true,
          edit: true,
          create: true,
        },
        shortName: {
          view: true,
          edit: true,
          create: true,
        },
        vatNumber: {
          view: true,
          edit: true,
          create: true,
        },
        vendorCode: {
          view: true,
          edit: true,
          create: true,
        },
        currency: {
          view: true,
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true,
          create: true,
        },
        fax: {
          view: true,
          edit: true,
          create: true,
        },
        mobile: {
          view: true,
          edit: true,
          create: true,
        },
        whatsapp: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        postCode: {
          view: true,
          edit: true,
          create: true,
        },
        address: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
          view: true,
          edit: true,
          create: true,
        },
        language: {
          view: true,
          edit: true,
          create: true,
        },
        locationUrl: {
          view: true,
          edit: true,
          create: true,
        },
        paymentMode: {
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
    stockTransfer: {
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
    openingStockInventory: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        value: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
    invoices: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        value: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
    "sales-invoice": {
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
        documentNumber: {
          view: true,
          edit: true,
          create: true,
        },
        invoiceNumber: {
          view: true,
          edit: true,
          create: true,
        },
        invoiceDate: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        trnNumber: {
          view: true,
          edit: true,
          create: true,
        },
        paymentMode: {
          view: true,
          edit: true,
          create: true,
        },
        dueDays: {
          view: true,
          edit: true,
          create: true,
        },
        paymentDate: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        remarks: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        salesman: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
    "sales-return": {
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
        documentNumber: {
          view: true,
          edit: true,
          create: true,
        },
        salesInvoiceNumber: {
          view: true,
          edit: true,
          create: true,
        },
        poNumber: {
          view: true,
          edit: true,
          create: true,
        },
        poDate: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        vatNumber: {
          view: true,
          edit: true,
          create: true,
        },
        paymentMode: {
          view: true,
          edit: true,
          create: true,
        },
        dueDays: {
          view: true,
          edit: true,
          create: true,
        },
        paymentDate: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        remarks: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        salesman: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
    "sales-quotation": {
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
        documentNumber: {
          view: true,
          edit: true,
          create: true,
        },
        quotationNumber: {
          view: true,
          edit: true,
          create: true,
        },
        quotationDate: {
          view: true,
          edit: true,
          create: true,
        },
        customer: {
          view: true,
          edit: true,
          create: true,
        },
        vatNumber: {
          view: true,
          edit: true,
          create: true,
        },
        paymentMode: {
          view: true,
          edit: true,
          create: true,
        },
        dueDays: {
          view: true,
          edit: true,
          create: true,
        },
        paymentDate: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        remarks: {
          view: true,
          edit: true,
          create: true,
        },
        salesman: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
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
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
      },
    },
    "lead-sources": {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        value: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
    "lead-status": {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        order: {
          view: true,
          edit: true,
          create: true,
        },
        color: {
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
      },
    },
    "expiry-items": {
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
        itemName: {
          view: true,
          edit: true,
          create: true,
        },
        batchNumber: {
          view: true,
          edit: true,
          create: true,
        },
        expiryDate: {
          view: true,
          edit: true,
          create: true,
        },
        quantity: {
          view: true,
          edit: true,
          create: true,
        },
        unit: {
          view: true,
          edit: true,
          create: true,
        },
        location: {
          view: true,
          edit: true,
          create: true,
        },
        category: {
          view: true,
          edit: true,
          create: true,
        },
        supplier: {
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
      },
    },
    purchaseReturns: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        value: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
    items: {
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
        itemCode: {
          view: true,
          edit: true,
          create: true,
        },
        itemName: {
          view: true,
          edit: true,
          create: true,
        },
        arabicName: {
          view: true,
          edit: true,
          create: true,
        },
        costPrice: {
          view: true,
          edit: true,
          create: true,
        },
        regularPrice: {
          view: true,
          edit: true,
          create: true,
        },
        offerPrice: {
          view: true,
          edit: true,
          create: true,
        },
        startDate: {
          view: true,
          edit: true,
          create: true,
        },
        endDate: {
          view: true,
          edit: true,
          create: true,
        },
        openingStock: {
          view: true,
          edit: true,
          create: true,
        },
        category: {
          view: true,
          edit: true,
          create: true,
        },
        subCategory: {
          view: true,
          edit: true,
          create: true,
        },
        unit: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
    sliders: {
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
        titleEn: {
          view: true,
          edit: true,
          create: true,
        },
        titleAr: {
          view: true,
          edit: true,
          create: true,
        },
        topTitleEn: {
          view: true,
          edit: true,
          create: true,
        },
        topTitleAr: {
          view: true,
          edit: true,
          create: true,
        },
        keyTagsEn: {
          view: true,
          edit: true,
          create: true,
        },
        keyTagsAr: {
          view: true,
          edit: true,
          create: true,
        },
        bannerType: {
          view: true,
          edit: true,
          create: true,
        },
        bannerEn: {
          view: true,
          edit: true,
          create: true,
        },
        bannerAr: {
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
    shortcut: {
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
        indexName: {
          view: true,
          edit: true,
          create: true,
        },
        title: {
          view: true,
          edit: true,
          create: true,
        },
        titleValue: {
          view: true,
          edit: true,
          create: true,
        },
        fontAwesomeIcon: {
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
    shelf: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        shelfName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    rack: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        rackName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    bin: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        binName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    "sub-bin": {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        subBinName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    companies: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        companyName: {
          view: true,
          edit: true,
          create: true,
        },
        taxNumber: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        currency: {
          view: true,
          edit: true,
          create: true,
        },
        timezone: {
          view: true,
          edit: true,
          create: true,
        },
        dateFormat: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    department: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        departmentName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        manager: {
          view: true,
          edit: true,
          create: true,
        },
        employees: {
          view: true,
          edit: true,
          create: true,
        },
        budget: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    designation: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        designationName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
          view: true,
          edit: true,
          create: true,
        },
        department: {
          view: true,
          edit: true,
          create: true,
        },
        employeeCount: {
          view: true,
          edit: true,
          create: true,
        },
        minSalary: {
          view: true,
          edit: true,
          create: true,
        },
        maxSalary: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    employee: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        employeeName: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true,
          create: true,
        },
        department: {
          view: true,
          edit: true,
          create: true,
        },
        designation: {
          view: true,
          edit: true,
          create: true,
        },
        salary: {
          view: true,
          edit: true,
          create: true,
        },
        manager: {
          view: true,
          edit: true,
          create: true,
        },
        location: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    branches: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        branchName: {
          view: true,
          edit: true,
          create: true,
        },
        taxNumber: {
          view: true,
          edit: true,
          create: true,
        },
        phone: {
          view: true,
          edit: true,
          create: true,
        },
        fax: {
          view: true,
          edit: true,
          create: true,
        },
        mobile: {
          view: true,
          edit: true,
          create: true,
        },
        email: {
          view: true,
          edit: true,
          create: true,
        },
        website: {
          view: true,
          edit: true,
          create: true,
        },
        address: {
          view: true,
          edit: true,
          create: true,
        },
        country: {
          view: true,
          edit: true,
          create: true,
        },
        state: {
          view: true,
          edit: true,
          create: true,
        },
        city: {
          view: true,
          edit: true,
          create: true,
        },
        postCode: {
          view: true,
          edit: true,
          create: true,
        },
        bankDetails: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    payment: {
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
        code: {
          view: true,
          edit: true,
          create: true,
        },
        invoiceType: {
          view: true,
          edit: true,
          create: true,
        },
        currency: {
          view: true,
          edit: true,
          create: true,
        },
        paymentTerms: {
          view: true,
          edit: true,
          create: true,
        },
        dueDays: {
          view: true,
          edit: true,
          create: true,
        },
        totalAmount: {
          view: true,
          edit: true,
          create: true,
        },
        containerAmount: {
          view: true,
          edit: true,
          create: true,
        },
        typeOfDeposit: {
          view: true,
          edit: true,
          create: true,
        },
        depositAmount: {
          view: true,
          edit: true,
          create: true,
        },
        depositDate: {
          view: true,
          edit: true,
          create: true,
        },
        exchangeRate: {
          view: true,
          edit: true,
          create: true,
        },
        localAmount: {
          view: true,
          edit: true,
          create: true,
        },
        status: {
          view: true,
          edit: true,
          create: true,
        },
        createdDate: {
          view: true,
          edit: false,
          create: true,
        },
        updatedDate: {
          view: true,
          edit: false,
          create: true,
        },
        draftedDate: {
          view: true,
          edit: false,
          create: true,
        },
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
          view: true,
          edit: true,
          create: true,
        },
        isDefault: {
          view: true,
          edit: true,
          create: true,
        },
        deletedAt: {
          view: true,
          edit: false,
          create: true,
        },
      },
    },
    customerGroupsPermissions: {
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
        indexName: {
          view: true,
          edit: true,
          create: true,
        },
        title: {
          view: true,
          edit: true,
          create: true,
        },
        titleValue: {
          view: true,
          edit: true,
          create: true,
        },
        fontAwesomeIcon: {
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
    documentTypes: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        titleValue: {
          view: true,
          edit: true,
          create: true,
        },
        fontAwesomeIcon: {
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
    actionTypes: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        titleValue: {
          view: true,
          edit: true,
          create: true,
        },
        fontAwesomeIcon: {
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
    statusTypes: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        titleValue: {
          view: true,
          edit: true,
          create: true,
        },
        fontAwesomeIcon: {
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
    exportMedias: {
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
        name: {
          view: true,
          edit: true,
          create: true,
        },
        code: {
          view: true,
          edit: true,
          create: true,
        },
        titleValue: {
          view: true,
          edit: true,
          create: true,
        },
        fontAwesomeIcon: {
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
    onboarding: {
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
        dataId: {
          view: true,
          edit: true,
          create: true,
        },
        selectStaff: {
          view: true,
          edit: true,
          create: true,
        },
        generalInformation: {
          view: true,
          edit: true,
          create: true,
        },
        staffFullName: {
          view: true,
          edit: true,
          create: true,
        },
        address: {
          view: true,
          edit: true,
          create: true,
        },
        assetAllocation: {
          view: true,
          edit: true,
          create: true,
        },
        typeOfTraining: {
          view: true,
          edit: true,
          create: true,
        },
        trainingProgram: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    inspections: {
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
        dataId: {
          view: true,
          edit: true,
          create: true,
        },
        vehicle: {
          view: true,
          edit: true,
          create: true,
        },
        inspectionForm: {
          view: true,
          edit: true,
          create: true,
        },
        addedFrom: {
          view: true,
          edit: true,
          create: true,
        },
        fromDate: {
          view: true,
          edit: true,
          create: true,
        },
        toDate: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
    "project-contract-type": {
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
        dataId: {
          view: true,
          edit: true,
          create: true,
        },
        fieldName: {
          view: true,
          edit: true,
          create: true,
        },
        description: {
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
        isActive: {
          view: true,
          edit: true,
          create: true,
        },
        isDraft: {
          view: true,
          edit: true,
          create: true,
        },
        isDeleted: {
          view: true,
          edit: true,
          create: true,
        },
        isUpdated: {
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
  },
};
