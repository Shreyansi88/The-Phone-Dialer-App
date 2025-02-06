import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';

const CallLogItem = ({ call }) => {
  const getCallTypeIcon = () => {
    switch (call.type) {
      case 'INCOMING':
        return { name: 'call-received', color: '#4CAF50' };
      case 'OUTGOING':
        return { name: 'call-made', color: '#2196F3' };
      case 'MISSED':
        return { name: 'call-missed', color: '#F44336' };
      default:
        return { name: 'call', color: '#757575' };
    }
  };

  const icon = getCallTypeIcon();

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={icon.name} size={24} color={icon.color} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.phoneNumber}>{call.phoneNumber}</Text>
        <Text style={styles.timestamp}>
          {format(new Date(call.timestamp), 'MMM d, yyyy h:mm a')}
        </Text>
      </View>
      <View style={styles.durationContainer}>
        <Text style={styles.duration}>
          {Math.round(call.duration / 60)} min
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  timestamp: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  durationContainer: {
    marginLeft: 8,
  },
  duration: {
    fontSize: 14,
    color: '#757575',
  },
});

export default CallLogItem; 