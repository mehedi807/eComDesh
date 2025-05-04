import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Modal, SafeAreaView, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import useOrderStore from '../store/useOrderStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import OrderModelView from '../components/OrderModelView';
import StatusDropdown from '../components/StatusDropdown';


const Order = () => {
  const { orders, loading, error, fetchOrders } = useOrderStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);


  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = (newStatus) => {
    // Also update the ui with changed status. 
    if (selectedOrderForStatus) {
      console.log(`Order ${selectedOrderForStatus} changed to status: ${newStatus}`);
      setSelectedOrderForStatus(null);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '৳0.00';

    if (value.toString().includes('৳')) return value;
    total = parseFloat(value).toFixed(2);
    return `৳${total}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'processing': return 'rgb(0, 140, 255)';
      case 'cancelled': return '#dc3545';
      case 'refunded': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'completed': return 'rgba(40, 167, 69, 0.1)';
      case 'processing': return 'rgba(0, 140, 255, 0.1)';
      case 'cancelled': return 'rgba(220, 53, 69, 0.1)';
      case 'refunded': return 'rgba(108, 117, 125, 0.1)';
      default: return 'rgba(108, 117, 125, 0.1)';
    }
  };

  const renderOrderItem = ({ item }) => (
    <>
      {/* show dropdown model for status */}
      {dropDownVisible && (
        <StatusDropdown
          dropDownVisible={dropDownVisible}
          setDropDownVisible={setDropDownVisible}
          onValueChange={handleStatusChange}
          currentStatus={orders.find(order => order.id === selectedOrderForStatus)?.status}
        />
      )}

      <TouchableOpacity
        style={styles.orderItemTouchable}
        onPress={() => {
          setModalVisible(true);
          setSelectedOrder(item);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderDate}>
                {item.date_created ? new Date(item.date_created).toLocaleDateString() : 'N/A'}
              </Text>
              <Text style={styles.orderId}>Order : {item.id}</Text>
            </View>

            {/* <StatusDropdown
            selectedValue={item.status}
            onValueChange={(value) => handleStatusChange(item.id, value)}
          /> */}
            <TouchableOpacity
              onPress={() => {
                setSelectedOrderForStatus(item.id);
                setDropDownVisible(true);
              }}
            >
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusBackgroundColor(item.status) }
              ]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                </Text>
              </View>
            </TouchableOpacity>

          </View>

          {/* <View style={styles.divider} /> */}

          <View style={styles.orderContent}>
            <View style={styles.customerInfo}>
              <FontAwesome name="user" size={16} color="#666" style={styles.icon} />
              <Text style={styles.customerName}>
                {item.billing?.first_name} {item.billing?.last_name}
              </Text>
            </View>

            <View style={styles.skuInfo}>

              <FontAwesome name="tag" size={16} color="#666" style={styles.icon} />
              {item.line_items && item.line_items.length > 0 && item.line_items[0].sku ? (
                <Text style={styles.skuText} numberOfLines={1}>
                  {item.line_items.map(lineItem => lineItem.sku).filter(sku => sku).join(', ')}
                </Text>
              ) : <Text style={styles.skuText}>N/A</Text>}

            </View>


            <View style={styles.orderFooter}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>{formatCurrency(item.total)}</Text>
              </View>

              <View style={styles.statusDropdownContainer}>
                {/* <Text style={styles.statusLabel}>Status:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={item.status}
                  style={styles.picker}
                  onValueChange={(value) => handleStatusChange(item.id, value)}
                  mode="dropdown"
                >
                  <Picker.Item label="Processing" value="processing" />
                  <Picker.Item label="Completed" value="completed" />
                  <Picker.Item label="Cancelled" value="cancelled" />
                  <Picker.Item label="Refunded" value="refunded" />
                </Picker>
              </View> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0676D1" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <FontAwesome name="exclamation-circle" size={40} color="#dc3545" style={styles.errorIcon} />
        <Text style={styles.errorText}>Error loading orders</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {orders.length === 0 ? (
          <View style={styles.centered}>
            <FontAwesome name="inbox" size={50} color="#6c757d" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
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
          <OrderModelView
            selectedOrder={selectedOrder}
            setModalVisible={setModalVisible}
            setSelectedOrder={setSelectedOrder}
          />
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  errorIcon: {
    marginBottom: 12,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
  },
  listContent: {
    paddingBottom: 16,
  },

  // Order card styles
  orderItemTouchable: {
    marginVertical: 8,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  orderDate: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#343a40',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
  },
  orderContent: {
    paddingHorizontal: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  customerName: {
    fontSize: 16,
    color: '#343a40',
    fontWeight: '500',
    flex: 1,
  },
  skuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  skuText: {
    fontSize: 14,
    color: '#6c757d',
    flex: 1,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#343a40',
    marginRight: 6,
    marginBottom: 16
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0676D1',
    marginBottom: 16
  },
  statusDropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    color: '#495057',
    marginRight: 6,
    marginBottom: 16
  },
});

export default Order;
