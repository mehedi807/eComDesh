import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Modal, SafeAreaView, TextInput, ScrollView, Button, StatusBar as RNStatusBar, Keyboard, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import useProductsStore from '../store/useProductStore'; // Assuming this path is correct
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';


const Product = () => {
  const { fetchProducts, products, loading, error } = useProductsStore();
  const navigation = useNavigation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const pageHeader = () => {
    return (
      <View style={styles.pageHeader}>
        <View style={styles.left}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu-outline" size={28} color="#1A202C" />
          </TouchableOpacity>
          <Text style={styles.title}>Products</Text>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.headerIconButton}
          //onPress={toggleSearch} 
          >
            <Ionicons
              name={isSearchVisible ? "close-outline" : "search-outline"}
              size={24}
              color="#1A202C"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="notifications-outline" size={24} color="#1A202C" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProductItem = ({ item }) => {
    const imageUrl = item.images && item.images.length > 0 ? item.images[0].src : null;

    const getStockIndicatorStyle = (stock) => {
      if (stock > 10) return styles.stockHigh;
      if (stock > 0) return styles.stockLow;
      return styles.stockOut;
    };

    const getStockTextStyle = (stock) => {
      if (stock > 10) return styles.stockTextHigh;
      if (stock > 0) return styles.stockTextLow;
      return styles.stockTextOut;
    };

    const formatPrice = (price) => {
      const numPrice = parseFloat(price);
      if (isNaN(numPrice)) return 'N/A';
      return `৳${numPrice.toFixed(2)}`;
    };

    return (
      <TouchableOpacity style={styles.productCard}>
        <View style={styles.productImageWrapper}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.productImageNew}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.productImagePlaceholder}>
              <Ionicons name="image-outline" size={48} color="rgba(26, 25, 25, 0.62)" />
            </View>
          )}
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
            {item.name || 'Unnamed Product'}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <FontAwesome name="tag" size={16} color="#666" style={styles.icon} />
            <Text style={styles.skutext}>
              {item.sku || 'N/A'}
            </Text>
          </View>

          <View style={styles.priceAndStockRow}>
            <Text style={styles.productPriceNew}>{formatPrice(item.price)}</Text>
            {/* // <Text>{item.stock_quantity}</Text> */}
            <View style={[styles.stockBadge, getStockIndicatorStyle(item.stock)]}>
              <Text style={[styles.stockBadgeText, getStockTextStyle(item.stock)]}>
                {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity >
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0676D1" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <FontAwesome name="exclamation-circle" size={40} color="#E53E3E" style={styles.errorIcon} />
        <Text style={styles.errorText}>Error loading products</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={styles.pageHeader.backgroundColor} />
        {pageHeader()}

        {products.length === 0 ? (
          <View style={styles.centered}>
            <Ionicons name="cube-outline" size={50} color="#A0AEC0" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        ) : (
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Product;

const styles = StyleSheet.create({
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
    color: '#4A5568',
  },
  errorIcon: {
    marginBottom: 12,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E53E3E',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#718096',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  // --- Product Item Styles ---
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#4A5568',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  productImageWrapper: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
    margin: 1
  },
  productImageNew: {
    width: '100%',
    height: '100%',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
  },
  productInfo: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  skutext: {
    flex: 1,
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
    paddingLeft: 8,
  },
  priceAndStockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  productPriceNew: {
    fontSize: 16,
    fontWeight: '700',
    color: '#38A169',
  },
  stockBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    minWidth: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  stockHigh: {
    backgroundColor: '#C6F6D5',
  },
  stockLow: {
    backgroundColor: '#FEFCA7',
  },
  stockOut: {
    backgroundColor: '#FED7D7',
  },
  stockTextHigh: {
    color: '#2F855A',
  },
  stockTextLow: {
    color: '#B7791F',
  },
  stockTextOut: {
    color: '#C53030',
  },

  // --- Header Styles ---
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: (RNStatusBar.currentHeight || 0) + 12,
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
    color: '#1A202C',
    marginLeft: 10,
  },
  menuIcon: {
    padding: 6,
  },
  headerIconButton: {
    padding: 8,
    marginLeft: 10,
  },
});