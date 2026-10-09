/* eslint-disable @typescript-eslint/no-explicit-any */
// TablePDF.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    color: "#666666",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 25,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    fontSize: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    textAlign: "left",
  },
});

interface TablePDFProps {
  data: any[];
  columns:
    | Array<{
        key: string;
        header: string;
        width?: number;
      }>
    | undefined;
  title: string;
  subtitle: string;
}

export const TablePDF: React.FC<TablePDFProps> = ({
  data,
  columns,
  title,
  subtitle,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.table}>
          {/* Header Row */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            {columns?.map((col) => (
              <Text
                key={col.key}
                style={[styles.tableCell, { fontWeight: "bold" }]}
              >
                {col.header}
              </Text>
            ))}
          </View>

          {/* Data Rows */}
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {columns?.map((col) => (
                <Text key={`${rowIndex}-${col.key}`} style={styles.tableCell}>
                  {row[col.key] || ""}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
