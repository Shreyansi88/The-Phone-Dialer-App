import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppContext } from '../../context/AppContext';

const ThemeToggle = () => {
  const { isDarkMode, isSystemTheme, toggleTheme, resetToSystemTheme, theme } = useAppContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity
        style={styles.option}
        onPress={toggleTheme}
      >
        <Icon
          name={isDarkMode ? 'dark-mode' : 'light-mode'}
          size={24}
          color={theme.colors.text.primary}
        />
        <Text style={[styles.text, { color: theme.colors.text.primary }]}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={resetToSystemTheme}
      >
        <Icon
          name="settings-system-daydream"
          size={24}
          color={isSystemTheme ? theme.colors.primary : theme.colors.text.secondary}
        />
        <Text
          style={[
            styles.text,
            { color: isSystemTheme ? theme.colors.primary : theme.colors.text.secondary },
          ]}
        >
          System Default
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default ThemeToggle; 