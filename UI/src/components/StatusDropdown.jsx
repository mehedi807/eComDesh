import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StatusDropdown = ({ dropDownVisible, setDropDownVisible, onValueChange, currentStatus }) => {
    const statusList = [
        { label: 'Processing', value: 'processing', icon: 'clock-o' },
        { label: 'Completed', value: 'completed', icon: 'check-circle' },
        { label: 'Cancelled', value: 'cancelled', icon: 'times-circle' },
        { label: 'Refunded', value: 'refunded', icon: 'exchange' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#28a745';
            case 'processing': return 'rgb(0, 140, 255)';
            case 'cancelled': return '#dc3545';
            case 'refunded': return '#6c757d';
            default: return '#6c757d';
        }
    };

    return (
        <Modal
            transparent={true}
            visible={dropDownVisible}
            animationType="fade"
            onRequestClose={() => setDropDownVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setDropDownVisible(false)}
            >
                <View style={styles.modalContent}>
                    <View style={styles.dropdownHeader}>
                        <Text style={styles.dropdownTitle}>Update Order Status</Text>
                    </View>

                    {statusList.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.optionItem,
                                currentStatus === option.value && styles.selectedOption
                            ]}
                            onPress={() => {
                                onValueChange(option.value);
                                setDropDownVisible(false);
                            }}
                        >
                            <View style={styles.optionContent}>
                                <FontAwesome
                                    name={option.icon}
                                    size={16}
                                    color={getStatusColor(option.value)}
                                    style={styles.optionIcon}
                                />
                                <Text style={[
                                    styles.optionText,
                                    { color: getStatusColor(option.value) }
                                ]}>
                                    {option.label}
                                </Text>
                            </View>

                            {currentStatus === option.value && (
                                <FontAwesome name="check" size={16} color={getStatusColor(option.value)} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '80%',
        maxWidth: 300,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    dropdownHeader: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fafafa',
    },
    dropdownTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    optionItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedOption: {
        backgroundColor: '#f7f9fc',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        marginRight: 12,
    },
    optionText: {
        fontSize: 15,
        fontWeight: '500',
    },
});

export default StatusDropdown;