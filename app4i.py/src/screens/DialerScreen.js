import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import DialPad from '../components/DialPad';
import { useTheme } from '../hooks/useTheme';

const DialerScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { theme } = useTheme();

  const handleNumberPress = (number) => {
    setPhoneNumber(prev => prev + number);
  };

  const handleDeletePress = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const requestCallPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          {
            title: 'Phone Call Permission',
            message: 'App needs access to make phone calls',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleCallPress = async () => {
    if (phoneNumber.length === 0) return;

    const hasPermission = await requestCallPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot make phone calls without permission');
      return;
    }

    const phoneUrl = `tel:${phoneNumber}`;
    try {
      await Linking.openURL(phoneUrl);
    } catch (err) {
      Alert.alert('Error', 'Could not make phone call');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.phoneNumberText}>
          {phoneNumber || 'Enter phone number'}
        </Text>
      </View>
      <DialPad
        onNumberPress={handleNumberPress}
        onCallPress={handleCallPress}
        onDeletePress={handleDeletePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  displayContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    minHeight: 100,
  },
  phoneNumberText: {
    fontSize: 32,
    color: theme.colors.text.primary,
    letterSpacing: 2,
  },
});

export default DialerScreen; 