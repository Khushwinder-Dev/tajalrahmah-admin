import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts (optional - for better styling)
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  location: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: "center",
  },
  table: {
    width: "100%",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 35,
    backgroundColor: "#FFFFFF",
  },
  tableRowEven: {
    flexDirection: "row",
    minHeight: 35,
    backgroundColor: "#f8f9fa",
  },
  tableColHeader: {
    width: "20%",
    backgroundColor: "#e9ecef",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tableCol: {
    width: "20%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#212529",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
    color: "#212529",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#666666",
  },
});

interface ChartAccount {
  accountNo: string;
  accountName: string;
  level: number;
  type: "Debit" | "Credit";
  group: "TA" | "BL" | "PS";
}

interface ChartOfAccountsPDFProps {
  accounts: ChartAccount[];
  companyName?: string;
  location?: string;
}

export const ChartOfAccountsPDF: React.FC<ChartOfAccountsPDFProps> = ({
  accounts,
  companyName = "Rapid Group",
  location = "Dhaka, Bangladesh",
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Chart of Accounts</Text>
        <Text style={styles.companyName}>{companyName}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Account No</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Account Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Level</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Type</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Group</Text>
          </View>
        </View>

        {/* Table Data with alternating row colors */}
        {accounts.map((account, index) => (
          <View
            style={index % 2 === 0 ? styles.tableRow : styles.tableRowEven}
            key={index}
          >
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{account.accountNo}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{account.accountName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{account.level}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{account.type}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{account.group}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} - Chart of Accounts
        Report
      </Text>
    </Page>
  </Document>
);
