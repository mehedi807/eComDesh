import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Modal, SafeAreaView, TextInput, ScrollView, Button, StatusBar as RNStatusBar, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import useOrderStore from '../store/useOrderStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import OrderModelView from '../components/OrderModelView';
import StatusDropdown from '../components/StatusDropdown';
import { useNavigation } from '@react-navigation/native';

const Order = () => {
  const { orders, loading, error, fetchOrders } = useOrderStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const navigation = useNavigation();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = (newStatus) => {
    // Also update the UI with changed status
    if (selectedOrderForStatus) {
      console.log(`Order ${selectedOrderForStatus} changed to status: ${newStatus}`);
      setSelectedOrderForStatus(null);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '৳0.00';

    if (value.toString().includes('৳')) return value;
    const total = parseFloat(value).toFixed(2);
    return `৳${total}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'processing': return '#0676D1';
      case 'cancelled': return '#dc3545';
      case 'refunded': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'completed': return 'rgba(40, 167, 69, 0.1)';
      case 'processing': return 'rgba(6, 118, 209, 0.1)';
      case 'cancelled': return 'rgba(220, 53, 69, 0.1)';
      case 'refunded': return 'rgba(108, 117, 125, 0.1)';
      default: return 'rgba(108, 117, 125, 0.1)';
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    // Hide filters when closing search
    if (isSearchVisible) {
      setIsFilterVisible(false);
      setSelectedStatus('all')
    }
  };

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const pageHeader = () => {
    return (
      <View style={styles.pageHeader}>
        <View style={styles.left}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu-outline" size={26} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Orders</Text>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={toggleSearch}
          >
            <Ionicons
              name={isSearchVisible ? "close-outline" : "search-outline"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View >
    );
  };

  const calculateStatusCounts = () => {
    const counts = {
      all: orders.length,
      completed: 0,
      processing: 0,
      cancelled: 0,
      refunded: 0,
    };

    orders.forEach(order => {
      if (order.status in counts) {
        counts[order.status]++;
      }
    });

    return counts;
  };

  const renderFilterOptions = () => {
    Keyboard.dismiss();
    const statusCounts = calculateStatusCounts();
    return (
      <View style={styles.filterOptions}>
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Status</Text>
          <View style={styles.statusFilterContainer}>
            {['all', 'completed', 'processing', 'cancelled', 'refunded'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusFilterChip,
                  selectedStatus === status && {
                    backgroundColor: status === 'all' ? '#e9ecef' : getStatusBackgroundColor(status),
                    borderColor: status === 'all' ? '#ced4da' : getStatusColor(status),
                  }
                ]}
                onPress={() => setSelectedStatus(status)}
              >
                <Text style={[
                  styles.statusFilterText,
                  selectedStatus === status && {
                    color: status === 'all' ? '#495057' : getStatusColor(status),
                    fontWeight: '600'
                  }
                ]}>
                  {`${status.charAt(0).toUpperCase() + status.slice(1)} (${statusCounts[status]})`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Date Range</Text>
          <View style={styles.dateFilterContainer}>
            <TouchableOpacity style={styles.datePickerButton}>
              <Ionicons name="calendar-outline" size={18} color="#666" style={{ marginRight: 4 }} />
              <Text style={styles.datePickerText}>
                {dateRange.start ? new Date(dateRange.start).toLocaleDateString() : 'Start Date'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.dateRangeSeparator}>to</Text>

            <TouchableOpacity style={styles.datePickerButton}>
              <Ionicons name="calendar-outline" size={18} color="#666" style={{ marginRight: 4 }} />
              <Text style={styles.datePickerText}>
                {dateRange.end ? new Date(dateRange.end).toLocaleDateString() : 'End Date'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filterActions}>
          <TouchableOpacity style={styles.resetFilterButton}>
            <Text style={styles.resetFilterText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyFilterButton}>
            <Text style={styles.applyFilterText}>Apply Filters</Text>
          </TouchableOpacity> */}
        {/* </View> */}
      </View >
    );
  };

  const renderOrderItem = ({ item }) => (
    <>
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
              <Text style={styles.orderId}>Order: #{item.id}</Text>
            </View>

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

          <View style={styles.divider} />

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

        {pageHeader()}

        {isSearchVisible && (
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchInputIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by order ID, customer name..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.filterToggleButton}
              onPress={toggleFilter}
            >
              <Ionicons name="options-outline" size={20} color="#0676D1" />
              <Text style={styles.filterToggleText}>
                {isFilterVisible ? "Hide Filters" : "Filters"}
              </Text>
            </TouchableOpacity>

            {isFilterVisible && renderFilterOptions()}
          </View>
        )}

        {orders.length === 0 ? (
          <View style={styles.centered}>
            <FontAwesome name="inbox" size={50} color="#6c757d" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        ) : (
          <FlatList
            data={orders.filter(order => {
              const matchesSearch =
                order.id.toString().includes(searchQuery) ||
                order.billing?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.billing?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.billing?.phone?.toLowerCase().includes(searchQuery.toLowerCase());

              const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;

              return matchesSearch && matchesStatus;
            })}
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

        <Modal
          visible={dropDownVisible}
          hardwareAccelerated={true}
          animationType='fade'
          transparent={true}
          onRequestClose={() => setDropDownVisible(false)}
        >
          <StatusDropdown
            dropDownVisible={dropDownVisible}
            setDropDownVisible={setDropDownVisible}
            onValueChange={handleStatusChange}
            currentStatus={orders.find(order => order.id === selectedOrderForStatus)?.status}
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
    padding: 16,
  },
  // Header styles
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(238, 238, 238, 0.24)',
    paddingTop: (RNStatusBar.currentHeight || 0) + 12, //if status bar is trnsfluent
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 12,
  },
  menuIcon: {
    padding: 4,
  },
  headerIconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
  },

  // Search and filter styles
  searchContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInputIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  filterToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  filterToggleText: {
    marginLeft: 4,
    color: '#0676D1',
    fontWeight: '500',
    fontSize: 15,
  },
  filterOptions: {
    marginTop: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#495057',
    marginBottom: 8,
  },
  statusFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statusFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: 'transparent',
  },
  statusFilterText: {
    fontSize: 14,
    color: '#495057',
  },
  dateFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    backgroundColor: '#fff',
    flex: 1,
  },
  datePickerText: {
    fontSize: 14,
    color: '#495057',
  },
  dateRangeSeparator: {
    marginHorizontal: 10,
    color: '#6c757d',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  resetFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  resetFilterText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6c757d',
  },
  applyFilterButton: {
    backgroundColor: '#0676D1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyFilterText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },

  // Order card styles
  orderItemTouchable: {
    marginVertical: 8,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(238, 238, 238, 0.24)',
  },
  orderDate: {
    fontSize: 13,
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
    paddingVertical: 12,
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
    marginBottom: 8,
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
    marginTop: 8,
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
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0676D1',
  },
});

export default Order;
