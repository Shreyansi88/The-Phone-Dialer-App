import { useAppContext } from '../context/AppContext';

export const useTheme = () => {
  const { theme, isDarkMode, toggleTheme } = useAppContext();
  
  const getThemedStyles = (stylesFn) => {
    return stylesFn(theme);
  };

  return {
    theme,
    isDarkMode,
    toggleTheme,
    getThemedStyles,
  };
}; 