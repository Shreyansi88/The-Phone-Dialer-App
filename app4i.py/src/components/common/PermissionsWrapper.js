import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { usePermissions } from '../../hooks/usePermissions';
import ErrorMessage from './ErrorMessage';

const PermissionsWrapper = ({ 
  children, 
  requiredPermissions = [], 
  loadingComponent,
  errorComponent 
}) => {
  const { loading, hasAllPermissions, requestPermissions } = usePermissions(requiredPermissions);

  if (loading) {
    return loadingComponent || (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!hasAllPermissions) {
    return errorComponent || (
      <ErrorMessage 
        message="Required permissions are not granted"
        onRetry={requestPermissions}
      />
    );
  }

  return children;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PermissionsWrapper; 