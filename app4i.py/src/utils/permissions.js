import { PermissionsAndroid, Platform } from 'react-native';

const PERMISSIONS = {
  CALL_PHONE: 'android.permission.CALL_PHONE',
  READ_CALL_LOG: 'android.permission.READ_CALL_LOG',
  READ_CONTACTS: 'android.permission.READ_CONTACTS',
  WRITE_CONTACTS: 'android.permission.WRITE_CONTACTS',
};

const PERMISSION_MESSAGES = {
  CALL_PHONE: {
    title: 'Phone Call Permission',
    message: 'App needs access to make phone calls',
  },
  READ_CALL_LOG: {
    title: 'Call Log Permission',
    message: 'App needs access to your call history',
  },
  READ_CONTACTS: {
    title: 'Contacts Permission',
    message: 'App needs access to your contacts',
  },
  WRITE_CONTACTS: {
    title: 'Contacts Write Permission',
    message: 'App needs permission to save contacts',
  },
};

export const requestPermission = async (permission) => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[permission],
      {
        title: PERMISSION_MESSAGES[permission].title,
        message: PERMISSION_MESSAGES[permission].message,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Permission request error:', err);
    return false;
  }
};

export const checkPermission = async (permission) => {
  if (Platform.OS !== 'android') return true;

  try {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS[permission]
    );
    return result;
  } catch (err) {
    console.error('Permission check error:', err);
    return false;
  }
}; 