import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme/theme';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    if (isSystemTheme) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, isSystemTheme]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsSystemTheme(false);
    setIsDarkMode(prev => !prev);
  };

  const resetToSystemTheme = () => {
    setIsSystemTheme(true);
    setIsDarkMode(systemColorScheme === 'dark');
  };

  const value = {
    theme,
    isDarkMode,
    isSystemTheme,
    toggleTheme,
    resetToSystemTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}; 