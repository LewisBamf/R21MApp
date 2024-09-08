// src/theme.js
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import merge from 'deepmerge';

// Define Simple Money themed colors
const simpleMoneyLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4CAF50', // A green color for primary (similar to money)
    accent: '#FFC107', // A gold color for accents
    background: '#F5F5F5', // Light grey background
    surface: '#FFFFFF', // White surface
    text: '#000000', // Black text
    placeholder: '#B0B0B0', // Grey placeholder
    backdrop: '#00000080', // Semi-transparent black backdrop
    notification: '#FF5722', // A contrasting color for notifications
  },
};

const simpleMoneyDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4CAF50', // Green for primary in dark mode
    accent: '#FFC107', // Gold for accents
    background: '#121212', // Dark background
    surface: '#1E1E1E', // Dark surface
    text: '#E0E0E0', // Light text
    placeholder: '#757575', // Grey placeholder
    backdrop: '#00000080', // Semi-transparent black backdrop
    notification: '#FF5722', // Contrasting color for notifications
  },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme, simpleMoneyLightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme, simpleMoneyDarkTheme);
