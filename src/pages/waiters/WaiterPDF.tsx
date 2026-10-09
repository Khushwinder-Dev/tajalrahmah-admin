/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import NotoSansArabic from "@/assets/font2/NotoSansArabic-Regular.ttf";
import NotoSansBengali from "@/assets/font2/NotoSansBengali-Regular.ttf";
import { LayoutGrid } from "lucide-react";

// Register the custom fonts
Font.register({
  family: "Noto Sans Arabic",
  fonts: [{ src: NotoSansArabic, fontWeight: "normal" }],
});

Font.register({
  family: "Noto Sans Bengali",
  fonts: [{ src: NotoSansBengali, fontWeight: "normal" }],
});

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: "Noto Sans Bengali",
    fontSize: "14px",
    fontWeight: "normal",
    color: "gray",
  },
  arabicText: {
    fontFamily: "Noto Sans Arabic",
    width: "100%",
    textAlign: "right",
    overflow: "hidden", // Handle any text overflow gracefully
    wordBreak: "break-word", // Prevent words from overflowing
    fontSize: "14px",
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    fontWeight: "normal",
    color: "gray",
  },
  bengaliText: {
    fontFamily: "Noto Sans Bengali",
  },
  navbar: {
    backgroundColor: "#F3F6F9",
    display: "flex",
    padding: "10px 20px",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "18px",
  },
  body: {
    display: "flex",
    padding: "20px",
    height: "100%",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  label: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "black",
    marginBottom: "8px",
  },
  content: {
    fontSize: "12px",
    fontWeight: "normal",
    color: "gray",
  },
  bodyContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap", // Ensures it wraps properly
    gap: "20px", // Adds spacing
  },
  singleContent: {
    flexBasis: "30%", // Ensures 3 columns per row
  },
  footer: {
    backgroundColor: "#F3F6F9",
    display: "flex",
    flexDirection: "row",
    padding: "10px 20px",
    justifyContent: "space-between",
    fontSize: "14px",
  },
});

const StatePDF = ({ exportableDataList }: { exportableDataList: any[] }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "--/--/----";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {/* Header */}
          <View style={styles.navbar}>
            <View>
              <Text>Rapid ERP</Text>
              <Text>
                <LayoutGrid />
              </Text>
            </View>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <View
              style={{
                ...styles.bodyContent,
                flexDirection: "column",
                gap: 10,
              }}
            >
              {exportableDataList.map((data, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                    #{index + 1} - {data.name}
                  </Text>

                  <View style={{ ...styles.bodyContent }}>
                    <View style={styles.singleContent}>
                      <Text style={styles.label}>Code</Text>
                      <Text style={styles.content}>{data.code}</Text>
                    </View>
                    <View style={styles.singleContent}>
                      <Text style={styles.label}>Name</Text>
                      <Text style={styles.content}>{data.name}</Text>
                    </View>

                    <View style={styles.singleContent}>
                      <Text style={styles.label}>Created At</Text>
                      <Text style={styles.content}>
                        {formatDate(data.created_at)}
                      </Text>
                    </View>
                    <View style={styles.singleContent}>
                      <Text style={styles.label}>Deleted At</Text>
                      <Text style={styles.content}>
                        {formatDate(data.deleted_at)}
                      </Text>
                    </View>
                    <View style={styles.singleContent}>
                      <Text style={styles.label}>Drafted At</Text>
                      <Text style={styles.content}>
                        {formatDate(data.drafted_at)}
                      </Text>
                    </View>
                    <View style={styles.singleContent}>
                      <Text style={styles.label}>Updated At</Text>
                      <Text style={styles.content}>
                        {formatDate(data.updated_at)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View>
              <Text>1996 &copy; Rapid</Text>
            </View>
            <View>
              <Text>Need Help!</Text>
            </View>
            <View>
              <Text>Live Chat</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default StatePDF;
