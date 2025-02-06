import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useCallLogs } from '../hooks/useCallLogs';
import CallLogItem from '../components/CallLogItem';
import ErrorMessage from '../components/common/ErrorMessage';

const CallHistoryScreen = () => {
  const { logs, loading, error, refreshLogs } = useCallLogs();

  if (loading && !logs.length) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshLogs} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        keyExtractor={(item, index) => `${item.phoneNumber}-${index}`}
        renderItem={({ item }) => <CallLogItem call={item} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshLogs} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CallHistoryScreen; 