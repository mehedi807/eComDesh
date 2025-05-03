import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Modal, Button, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import useOrderStore from '../store/useOrderStore';
import { BlurView } from 'expo-blur';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
const Order = () => {
  const { orders, loading, error, fetchOrders } = useOrderStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Order ${orderId} changed to status: ${newStatus}`);
  };

  const renderOrderItem = ({ item }) => (
    <>
      <TouchableOpacity onPress={() => {
        setModalVisible(true);
        setSelectedOrder(item);
      }}>
        <View style={styles.mainView}>

          <View style={styles.orderItem}>

            <View style={styles.leftView}>
              <Text style={styles.orderDate}>Date: {item.date_created ? new Date(item.date_created).toLocaleDateString() : 'N/A'}</Text>
              <Text style={styles.orderId}>Order ID: {item.id}</Text>
              <Text style={styles.orderName}>Customer: {item.billing?.first_name} {item.billing?.last_name}</Text>
              <View style={styles.rightRow}>
                <View style={styles.statusContainer}>
                  <Text style={styles.rightLabel}>Status:</Text>
                  <Picker
                    selectedValue={item.status}
                    style={styles.picker}
                    onValueChange={(value) => handleStatusChange(item.id, value)}
                    mode="dropdown"
                  >
                    <Picker.Item label="Pending" value="pending" />
                    <Picker.Item label="Completed" value="completed" />
                    <Picker.Item label="Cancelled" value="cancelled" />
                    <Picker.Item label="Refunded" value="refunded" />
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.rightView}>
              <View style={styles.rightRow}>
                <Text style={styles.rightLabel}>SKU:</Text>
                <Text style={styles.rightValue}>
                  {item.line_items && item.line_items.length > 0 ?
                    item.line_items.map(lineItem => lineItem.sku).filter(sku => sku).join(', ') : ''}
                </Text>
              </View>

              <View style={styles.rightRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={[styles.totalValue, { color: '#007bff' }]}>{item.total}</Text>
              </View>

            </View>

          </View>

        </View >

      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        hardwareAccelerated={true}
        animationType='fade'
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedOrder(null);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedOrder && (
              <>
                <Text style={styles.orderDate}>
                  Date: {selectedOrder.date_created ? new Date(selectedOrder.date_created).toLocaleDateString() : 'N/A'}
                </Text>
                <Text style={styles.orderId}>Order ID: {selectedOrder.id}</Text>
                <Text style={styles.orderName}>
                  Customer: {selectedOrder.billing?.first_name} {selectedOrder.billing?.last_name}
                </Text>
                <Text style={styles.orderEmail}>Email: {selectedOrder.billing?.email}</Text>
                <Text style={styles.orderPhone}>Phone: {selectedOrder.billing?.phone}</Text>
                <Text style={styles.orderAddress}>
                  Address: {[selectedOrder.billing?.address_1, selectedOrder.billing?.address_2, selectedOrder.billing?.city, selectedOrder.billing?.state, selectedOrder.billing?.postcode, selectedOrder.billing?.country]
                    .filter(Boolean).join(', ')}
                </Text>

                {/* Order Items Table */}
                <Text style={styles.sectionTitle}>Order Items : </Text>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Product</Text>
                  <Text style={styles.tableHeaderText}>SKU</Text>
                  <Text style={styles.tableHeaderText}>Qty</Text>
                  <Text style={styles.tableHeaderText}>Price</Text>
                  <Text style={styles.tableHeaderText}>Total</Text>
                </View>

                {selectedOrder.line_items?.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Text style={styles.tableCell}>{item.sku || '-'}</Text>
                    <Text style={styles.tableCell}>{item.quantity}</Text>
                    <Text style={styles.tableCell}>{item.price}</Text>
                    <Text style={styles.tableCell}>
                      {(parseFloat(item.quantity) * parseFloat(item.price)).toFixed(2)}
                    </Text>
                  </View>
                ))}

                <Button
                  title="Close"
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedOrder(null);
                  }}
                />
              </>
            )}
          </View>
        </View>
      </Modal>



    </>

  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading orders: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {orders.length === 0 ? (
          <View style={styles.centered}>
            <Text>No orders found.</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>

  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  orderName: {
    fontSize: 16,
    marginTop: 4,
  },
  leftView: {
    flex: 1,
    paddingRight: 10,
  },
  rightView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: 150,
  },
  rightRow: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
  rightLabel: {
    width: 60,
    fontSize: 16,
  },
  rightValue: {
    fontSize: 16,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  iconColumn: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
  },
  totalLabel: {
    width: 60,
    fontSize: 16,
    fontWeight: 'bold'
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop: 4,
  },
  picker: {
    //fontSize: 4,
    width: 160,
    height: 55,
    color: 'rgb(28, 122, 0)',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
  },
  orderEmail: {
    fontSize: 16,
    marginTop: 4,
  },
  orderPhone: {
    fontSize: 16,
    marginTop: 4,
  },
  orderAddress: {
    fontSize: 16,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },

  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },

  tableCell: {
    flex: 1,
    fontSize: 13,
  },

});