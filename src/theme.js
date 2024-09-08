// src/theme.js
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import merge from 'deepmerge';

const simpleMoneyLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4CAF50',
    accent: '#FFC107',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#000000',
    placeholder: '#B0B0B0',
    backdrop: '#00000080',
    notification: '#FF5722',
  },
};

const simpleMoneyDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4CAF50',
    accent: '#FFC107',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#E0E0E0',
    placeholder: '#757575',
    backdrop: '#00000080',
    notification: '#FF5722',
  },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme, simpleMoneyLightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme, simpleMoneyDarkTheme);
