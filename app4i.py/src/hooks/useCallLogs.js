import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import CallLogs from 'react-native-call-log';

export const useCallLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Permission',
          message: 'App needs access to your call log ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      setError('Permission request failed');
      return false;
    }
  };

  const fetchCallLogs = async () => {
    setLoading(true);
    try {
      if (Platform.OS === 'android') {
        const hasPermission = await requestPermission();
        if (hasPermission) {
          const callLogs = await CallLogs.load(50); // Load last 50 calls
          setLogs(callLogs);
        }
      }
    } catch (err) {
      setError('Failed to load call logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs();
  }, []);

  return { logs, loading, error, refreshLogs: fetchCallLogs };
}; 