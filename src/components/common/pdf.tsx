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
import i18n from "@/i18n";

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
  pageRTL: {
    fontFamily: "Noto Sans Arabic",
  },
  arabicText: {
    fontFamily: "Noto Sans Arabic",
    width: "100%",
    textAlign: "right",
    overflow: "hidden",
    wordBreak: "break-word",
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
  navbarRTL: {
    flexDirection: "row-reverse",
    textAlign: "right",
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
  contentRTL: {
    fontFamily: "Noto Sans Arabic",
    textAlign: "right",
  },
  bodyContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "20px",
  },
  singleContent: {
    flexBasis: "30%",
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

interface GenericPDFProps {
  data: any[];
  title?: string;
  subtitle?: string;
  fieldLabels?: Record<string, string>;
  columns?: Array<{ key: string; label: string }>;
}

const GenericPDF = ({
  data,
  title = "Data Report",
  subtitle,
  fieldLabels,
}: GenericPDFProps) => {
  // Determine current language and RTL from localStorage
  let isRTL = false;
  try {
    const stored = localStorage.getItem("selectedLanguage");
    if (stored) {
      const parsed = JSON.parse(stored);
      isRTL = ["ar", "ur"].includes(parsed?.code);
    }
  } catch {
    // ignore
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "--/--/----";
    const locale = isRTL ? "ar-EG" : "en-GB";
    return new Date(dateString).toLocaleDateString(locale);
  };

  // Convert ASCII digits to Arabic-Indic digits when RTL is active
  const toArabicDigits = (input: string): string => {
    if (!isRTL) return input;
    const map: Record<string, string> = {
      "0": "٠",
      "1": "١",
      "2": "٢",
      "3": "٣",
      "4": "٤",
      "5": "٥",
      "6": "٦",
      "7": "٧",
      "8": "٨",
      "9": "٩",
    };
    return input.replace(/[0-9]/g, (d) => map[d]);
  };

  // Try to find a localized variant of a base key within a given data item
  const findLocalizedVariantKey = (
    dataItem: any,
    baseKey: string,
    locales: string[]
  ): string | undefined => {
    const base = baseKey.charAt(0).toUpperCase() + baseKey.slice(1);
    const candidates = [
      // suffixes
      ...locales.flatMap((loc) => [
        `${baseKey}${loc.toUpperCase()}`,
        `${baseKey}${loc.charAt(0).toUpperCase() + loc.slice(1)}`,
        `${baseKey}_${loc}`,
        `${baseKey}_${loc.toLowerCase()}`,
        `${baseKey}_${loc.toUpperCase()}`,
      ]),
      // prefixes
      ...locales.flatMap((loc) => [`${loc}_${baseKey}`, `${loc}${base}`]),
    ];

    return candidates.find(
      (k) => Object.prototype.hasOwnProperty.call(dataItem, k) && dataItem[k]
    );
  };

  const formatValue = (dataItem: any, key: string) => {
    // Prefer language-specific field variants when RTL is active
    let value = dataItem[key];
    if (isRTL) {
      const altKey = findLocalizedVariantKey(dataItem, key, ["ar", "arabic"]);
      if (altKey) value = dataItem[altKey];
    }

    if (value === null || value === undefined) return "N/A";

    // Auto-detect type based on value and key name
    if (
      key.toLowerCase().includes("date") ||
      key.toLowerCase().includes("at")
    ) {
      return formatDate(value);
    }

    if (typeof value === "boolean") {
      if (isRTL) return value ? "نعم" : "لا";
      return value ? "Yes" : "No";
    }

    if (typeof value === "number") {
      const asString = value.toString();
      return isRTL ? toArabicDigits(asString) : asString;
    }

    // Try to translate the value via i18n if a matching key exists
    if (typeof value === "string") {
      const possibleKeys = [`values.${value}`, `common.${value}`, value];
      for (const k of possibleKeys) {
        if (k !== value && i18n.exists(k)) {
          value = i18n.t(k);
          break;
        }
      }

      // Apply Arabic-Indic digits for numbers embedded in strings
      return isRTL ? toArabicDigits(value) : value;
    }

    return value.toString();
  };

  const getTextStyle = (key: string) => {
    // When Arabic is active, render all values using Arabic font + RTL
    if (isRTL) {
      return styles.arabicText;
    }
    // Otherwise detect special-language fields
    if (key.toLowerCase().includes("arabic")) {
      return styles.arabicText;
    }
    if (
      key.toLowerCase().includes("bangla") ||
      key.toLowerCase().includes("bengali")
    ) {
      return styles.bengaliText;
    }
    return styles.content;
  };

  const getItemName = (item: any, index: number) => {
    // Try to find a name field, prefer localized variant when RTL
    const baseKeys = ["name", "title", "code"];
    let nameField: any = undefined;
    if (isRTL) {
      for (const k of baseKeys) {
        const altKey = findLocalizedVariantKey(item, k, ["ar", "arabic"]);
        if (altKey && item[altKey]) {
          nameField = item[altKey];
          break;
        }
      }
    }
    if (!nameField) {
      nameField = baseKeys.map((k) => item[k]).find((v) => v);
    }
    if (!nameField) nameField = `Item ${index + 1}`;
    const label = isRTL ? toArabicDigits(`${nameField}`) : `${nameField}`;
    return `#${index + 1} - ${label}`;
  };

  const translateLabel = (key: string, fallback: string): string => {
    // Prefer explicit labels if provided by caller
    if (fieldLabels && fieldLabels[key]) return fieldLabels[key];

    // Try dynamic i18n keys first; fallback to humanized label
    const candidates = [`form.${key}`, `common.${key}`, `sidebar.menu.${key}`];
    for (const k of candidates) {
      if (i18n.exists(k)) return i18n.t(k);
    }
    return fallback;
  };

  const getFields = (dataItem: any) => {
    return Object.keys(dataItem).map((key) => {
      const fallback =
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
      return {
        key,
        label: translateLabel(key, fallback),
      };
    });
  };

  return (
    <Document>
      <Page size="A4" style={[styles.page, isRTL ? styles.pageRTL : {}]}>
        <View>
          {/* Header */}
          <View style={[styles.navbar, isRTL ? styles.navbarRTL : {}]}>
            <View>
              <Text>Rapid ERP</Text>
              <Text>
                <LayoutGrid />
              </Text>
            </View>
            <View>
              <Text style={[isRTL ? styles.arabicText : {}]}>{title}</Text>
              {subtitle && (
                <Text
                  style={[{ fontSize: 14 }, isRTL ? styles.arabicText : {}]}
                >
                  {subtitle}
                </Text>
              )}
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
              {data.map((item, index) => {
                const fields = getFields(item);
                return (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                      {getItemName(item, index)}
                    </Text>

                    <View style={{ ...styles.bodyContent }}>
                      {fields.map((field) => (
                        <View key={field.key} style={styles.singleContent}>
                          <Text
                            style={[
                              styles.label,
                              isRTL ? styles.contentRTL : {},
                            ]}
                          >
                            {field.label}
                          </Text>
                          <Text style={getTextStyle(field.key)}>
                            {formatValue(item, field.key)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View>
              <Text>1996 © Rapid</Text>
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

export default GenericPDF;
