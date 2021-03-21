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

const FullLayoutPdf = ({ habits }) => {
  const renderedHabits = habits.map((habit) => {
    return <Text key={habit}>{habit}</Text>;
  });
  return (
    <div>
      <div className="ui container segment">
        <PDFViewer>
          <Document>
            <Page orientation="landscape" size="A4">
              <View style={styles.section}>
                {renderedHabits}
                {/* <Text>Section #1</Text>
                <Text>Another section</Text>
                <Text>Another section</Text> */}
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
