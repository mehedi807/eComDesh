import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import useOrderStore from '../store/useOrderStore';
import { FontAwesome } from '@expo/vector-icons'; // Using FontAwesome icons

const Order = () => {
  const { orders, loading, error, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.mainView}>
      
      <View style={styles.orderItem}>
          <View style={styles.leftView}>
            <Text style={styles.orderDate}>Date: {item.date_created ? new Date(item.date_created).toLocaleDateString() : 'N/A'}</Text>
            <Text style={styles.orderId}>Order ID: {item.id}</Text>
            <Text style={styles.orderName}>Customer: {item.billing?.first_name} {item.billing?.last_name}</Text>
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
              <Text style={[styles.totalValue, {color: '#007bff'}]}>{item.total}</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.rightLabel}>Status:</Text>
              <Text style={styles.rightValue}>{item.status}</Text>
            </View>
          </View>
      </View>
    </View>
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
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
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
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});