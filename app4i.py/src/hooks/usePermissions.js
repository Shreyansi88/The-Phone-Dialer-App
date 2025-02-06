import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { requestPermission, checkPermission } from '../utils/permissions';

export const usePermissions = (requiredPermissions = []) => {
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);

  const checkPermissions = async () => {
    const permissionStatus = {};
    for (const permission of requiredPermissions) {
      permissionStatus[permission] = await checkPermission(permission);
    }
    setPermissions(permissionStatus);
    setLoading(false);
  };

  const requestPermissions = async () => {
    setLoading(true);
    const permissionStatus = {};
    
    for (const permission of requiredPermissions) {
      const granted = await requestPermission(permission);
      permissionStatus[permission] = granted;
      
      if (!granted) {
        Alert.alert(
          'Permission Required',
          `This feature requires ${permission} permission to work properly.`,
          [{ text: 'OK' }]
        );
      }
    }
    
    setPermissions(permissionStatus);
    setLoading(false);
    
    return Object.values(permissionStatus).every(status => status === true);
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    permissions,
    loading,
    checkPermissions,
    requestPermissions,
    hasAllPermissions: Object.values(permissions).every(status => status === true),
  };
}; 