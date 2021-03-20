import React from "react";
import FullLayout from "./FullLayout";
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const FullLayoutPdf = () => {
  return (
    <div>
      <div className="ui container segment">
        {/* Document, Page, View, Text,  */}
        <PDFViewer>
          <Document>
            <Page size="A4">
              <View style={styles.section}>
                <Text>Section #1</Text>
              </View>
              <View style={styles.section}>
                <Text>Section #2</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};

export default FullLayoutPdf;
