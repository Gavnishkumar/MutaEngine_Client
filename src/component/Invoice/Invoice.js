import React from 'react';
import { Page, Text, View, Document, PDFViewer, Image } from '@react-pdf/renderer';
import { StyleSheet } from "@react-pdf/renderer";
import { useParams } from 'react-router-dom';

function Invoice() {
  const { details } = useParams();
  const transactionDetails = JSON.parse(details);

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
      fontSize: 11,
    },
    header: {
      marginBottom: 20,
      textAlign: 'center',
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 10,
      color: 'grey',
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginLeft: 'auto',
      marginRight: 'auto',  // This ensures horizontal centering
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCol: {
      width: '50%',  // Adjusted for larger, cleaner layout
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
    headerCell: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    dataCell: {
      fontSize: 11,
    },
    watermark: {
      position: 'absolute',
      top: 10,
      left: 20,
      height: '60px',
      width: '100px',
      opacity: 0.3,  // Slight transparency for watermark
    },
  });

  const Footer = () => (
    <View style={styles.footer}>
      <Text>Created at MutaEngine | www.mutaengine.com</Text>
    </View>
  );

  return (
    <PDFViewer width="100%" height="800px">
      <Document>
        <Page size="A4" style={styles.page}>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVbuyDDa4atkQ-DuqkdVDivnoFT0-GR_GJZQ&s" style={styles.watermark} />
          <View style={styles.header}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Invoice</Text>
            <Text>Transaction Details</Text>
          </View>
          
          <View style={styles.table}>
            {/* Transaction ID */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.headerCell]}>Transaction ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transactionDetails.transactionId}</Text>
              </View>
            </View>
            {/* Amount */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.headerCell]}>Amount</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transactionDetails.currency} {transactionDetails.amount}</Text>
              </View>
            </View>
            {/* Name */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transactionDetails.name}</Text>
              </View>
            </View>
            {/* Email */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.headerCell]}>Email</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transactionDetails.email}</Text>
              </View>
            </View>
            {/* Status */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.headerCell]}>Status</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transactionDetails.status}</Text>
              </View>
            </View>
            {/* Payment Method */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.headerCell]}>Payment Method</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transactionDetails.paymentMethod}</Text>
              </View>
            </View>
            {/* Remark */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.headerCell]}>Remark</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transactionDetails.remarks}</Text>
              </View>
            </View>
            {/* Date */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.headerCell]}>Date</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transactionDetails.date}</Text>
              </View>
            </View>
          </View>

          <Footer />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Invoice;
