import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

const OrderModelView = ({ selectedOrder, setModalVisible, setSelectedOrder }) => {
    const [isModelEdited, setIsModelEdited] = useState(false);
    const [orderNotes, setOrderNotes] = useState('');

    const handleNotesChange = (text) => {
        setOrderNotes(text);
        setIsModelEdited(true);
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

    return (

        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                {selectedOrder && (
                    <>

                        <View style={styles.modalHeader}>
                            <View>
                                <Text style={styles.modalOrderDate}>
                                    {selectedOrder.date_created ? new Date(selectedOrder.date_created).toLocaleDateString() : 'N/A'}
                                </Text>
                                <Text style={styles.modalOrderId}>Order #{selectedOrder.id}</Text>
                            </View>

                            <View style={[
                                styles.modalStatusBadge,
                                { backgroundColor: getStatusBackgroundColor(selectedOrder.status) }
                            ]}>
                                <Text style={[styles.modalStatusText, { color: getStatusColor(selectedOrder.status) }]}>
                                    {selectedOrder.status?.charAt(0).toUpperCase() + selectedOrder.status?.slice(1)}
                                </Text>
                            </View>
                        </View>
                        <ScrollView
                            style={{ marginVertical: 20, }}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* <View style={styles.modalDivider} /> */}

                            <View style={styles.customerSection}>
                                <Text style={styles.sectionTitle}>Customer Information</Text>
                                <Text style={styles.customerDetail}>
                                    <Text style={styles.detailLabel}>Name: </Text>
                                    {selectedOrder.billing?.first_name} {selectedOrder.billing?.last_name}
                                </Text>
                                <Text style={styles.customerDetail}>
                                    <Text style={styles.detailLabel}>Email: </Text>
                                    {selectedOrder.billing?.email || 'N/A'}
                                </Text>
                                <Text style={styles.customerDetail}>
                                    <Text style={styles.detailLabel}>Phone: </Text>
                                    {selectedOrder.billing?.phone || 'N/A'}
                                </Text>
                            </View>

                            <View style={styles.addressSection}>
                                <View style={styles.addressHeader}>
                                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.editLink}>Edit Address</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.addressText}>

                                    {[
                                        selectedOrder.billing?.address_1,
                                        selectedOrder.billing?.address_2,
                                        selectedOrder.billing?.city,
                                        selectedOrder.billing?.state,
                                        selectedOrder.billing?.postcode,
                                        selectedOrder.billing?.country
                                    ].filter(Boolean).join(', ')}
                                </Text>
                            </View>

                            <View style={styles.orderItemsSection}>
                                <Text style={styles.sectionTitle}>Order Items</Text>
                                <View style={styles.tableHeader}>
                                    <Text style={[styles.tableHeaderText, { flex: 1 }]}>Product</Text>
                                    <Text style={styles.tableHeaderText}>SKU</Text>
                                    <Text style={styles.tableHeaderText}>Qty</Text>
                                    <Text style={styles.tableHeaderText}>Price</Text>
                                    <Text style={styles.tableHeaderText}>Total</Text>
                                </View>

                                <View style={styles.tableBody}>
                                    {
                                        selectedOrder.line_items?.map((item, index) => (
                                            <View key={index} style={[
                                                styles.tableRow,
                                                index === selectedOrder.line_items.length - 1 ? null : styles.tableRowBorder
                                            ]}>
                                                <Text style={[styles.tableCell, { flex: 1 }]} numberOfLines={2}>{item.name}</Text>
                                                <Text style={styles.tableCell}>{item.sku || '-'}</Text>
                                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                                <Text style={styles.tableCell}>{formatCurrency(item.price)}</Text>
                                                <Text style={styles.tableCell}>
                                                    {formatCurrency(parseFloat(item.quantity) * parseFloat(item.price))}
                                                </Text>
                                            </View>
                                        ))}
                                </View>

                                <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <Text style={{ fontWeight: '500' }}>Subtotal:</Text>
                                        <Text>{formatCurrency(selectedOrder.total)}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <Text style={{ fontWeight: '500' }}>Shipping:</Text>
                                        <Text>{formatCurrency(100)}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, borderTopWidth: 1, borderColor: '#ccc', paddingTop: 6 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Payable Total:</Text>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {formatCurrency(parseFloat(selectedOrder.total) + 100)}
                                        </Text>
                                    </View>
                                </View>


                            </View>

                            <View style={styles.notesSection}>
                                <View style={styles.notesHeader}>
                                    <Text style={styles.sectionTitle}>Order Notes</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.editLink}>Edit Note</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.notesInput}
                                    placeholder="Enter order notes here..."
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                    value={orderNotes}
                                    onChangeText={handleNotesChange}
                                />
                            </View>
                        </ScrollView>

                        {isModelEdited && (
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => {
                                    setIsModelEdited(false)
                                    Keyboard.dismiss();
                                }}
                                activeOpacity={0.8}
                            >
                                <FontAwesome name="check" size={16} color="#fff" style={styles.buttonIcon} />
                                <Text style={styles.saveButtonText}>Save Changes</Text>
                            </TouchableOpacity>
                        )}

                        {!isModelEdited && <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    setSelectedOrder(null);

                                }}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    setSelectedOrder(null);

                                }}
                                activeOpacity={0.7}
                            >
                                <FontAwesome name="trash" size={16} color="#fff" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>}

                    </>
                )}
            </View>
        </View>


    )
}

export default OrderModelView

const styles = StyleSheet.create({
    // Modal styles
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(32, 36, 39, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '100%',
        maxHeight: '90%',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalOrderDate: {
        fontSize: 13,
        color: '#6c757d',
        marginBottom: 4,
    },
    modalOrderId: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343a40',
    },
    modalStatusBadge: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    modalStatusText: {
        fontSize: 13,
        fontWeight: '600',
    },
    modalDivider: {
        height: 1,
        backgroundColor: '#e9ecef',
        marginVertical: 16,
    },

    // Customer section styles
    customerSection: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#343a40',
        marginBottom: 7,
    },
    customerDetail: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 6,
    },
    detailLabel: {
        fontWeight: '600',
    },

    // Address section styles
    addressSection: {
        marginBottom: 16,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
    },
    editLink: {
        color: '#0676D1',
        fontSize: 14,
        fontWeight: '500',
    },
    addressText: {
        fontSize: 14,
        color: '#495057',
        lineHeight: 20,
    },

    // Order items section styles
    orderItemsSection: {
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#6c757d',
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderRadius: 8,
        marginBottom: 6,
    },
    tableHeaderText: {
        flex: 1,
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    tableBody: {
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: '#fff',
    },
    tableRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    tableCell: {
        flex: 1,
        fontSize: 13,
        color: '#495057',
        textAlign: 'center',
    },

    // Notes section styles
    notesSection: {
        marginBottom: 20,
    },
    notesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    notesInput: {
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: '#495057',
        backgroundColor: '#f8f9fa',
        minHeight: 80,
    },

    // Button styles
    saveButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        flexDirection: 'row',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    closeButton: {
        backgroundColor: '#6c757d',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: 10,
    },
    removeButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    buttonIcon: {
        marginRight: 8,
    },
});