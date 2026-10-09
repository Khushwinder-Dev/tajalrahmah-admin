import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StateData } from "@/types/states.types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#2196f3",
  },
  table: {
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    borderBottomStyle: "solid",
    alignItems: "center",
    minHeight: 30,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  badge: {
    padding: "2px 4px",
    borderRadius: 2,
    fontSize: 8,
    color: "white",
    textAlign: "center" as const,
  },
  badgeSuccess: {
    backgroundColor: "#4caf50",
  },
  badgeDanger: {
    backgroundColor: "#f44336",
  },
});

interface StatePDFProps {
  exportableDataList: StateData[];
}

const StatePDF = ({ exportableDataList }: StatePDFProps) => {
  const formatDate = (date: string | null | Date) => {
    if (!date) return "--/--/----";
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const StatusBadge = ({ status }: { status: number }) => (
    <View
      style={[
        styles.badge,
        status === 1 ? styles.badgeSuccess : styles.badgeDanger,
      ]}
    >
      <Text>{status === 1 ? "Yes" : "No"}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>State Details</Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Code</Text>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Name in Bangla</Text>
            <Text style={styles.tableCell}>Name in Arabic</Text>
            <Text style={styles.tableCell}>Country</Text>
            <Text style={styles.tableCell}>Default</Text>
            <Text style={styles.tableCell}>Active</Text>
            <Text style={styles.tableCell}>Draft</Text>
            <Text style={styles.tableCell}>Created</Text>
            <Text style={styles.tableCell}>Updated</Text>
            <Text style={styles.tableCell}>Drafted</Text>
            <Text style={styles.tableCell}>Deleted</Text>
          </View>

          {/* Table Body */}
          {exportableDataList.map((state, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{state.code}</Text>
              <Text style={styles.tableCell}>{state.name}</Text>
              <Text style={styles.tableCell}>{state.name_in_bangla}</Text>
              <Text style={styles.tableCell}>{state.name_in_arabic}</Text>
              <Text style={styles.tableCell}>{state.country_name}</Text>
              <View style={styles.tableCell}>
                <StatusBadge status={state.isDefault ? 1 : 0} />
              </View>
              <View style={styles.tableCell}>
                <StatusBadge status={state.isActive ? 1 : 0} />
              </View>
              <View style={styles.tableCell}>
                <StatusBadge status={state.isDraft ? 1 : 0} />
              </View>
              <Text style={styles.tableCell}>
                {formatDate(state.createdAt)}
              </Text>
              <Text style={styles.tableCell}>
                {formatDate(state.updatedAt)}
              </Text>
              <Text style={styles.tableCell}>
                {formatDate(state.draftedAt)}
              </Text>
              <Text style={styles.tableCell}>
                {formatDate(state.deletedAt)}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default StatePDF;
