import { useColorScheme } from 'react-native';
import { useStore } from '../store/useStore';

export const lightColors = {
  background: '#f5f5f5',
  card: '#ffffff',
  text: '#121212',
  textSecondary: '#666666',
  primary: '#4caf50',
  border: '#e0e0e0',
  tabBar: '#ffffff',
  error: '#f44336',
  income: '#4caf50',
  expense: '#f44336',
};

export const darkColors = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#aaaaaa',
  primary: '#4caf50',
  border: '#333333',
  tabBar: '#1e1e1e',
  error: '#cf6679',
  income: '#81c784',
  expense: '#e57373',
};

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const themeMode = useStore((state) => state.themeMode);
  
  const isDark = 
    themeMode === 'dark' || 
    (themeMode === 'system' && systemColorScheme === 'dark');
    
  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
    themeMode,
  };
};
