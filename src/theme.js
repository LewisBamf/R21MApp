import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// src/theme.js

// Define your light and dark theme configurations
export const simpleMoneyLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: 'rgb(87, 189, 134)',
        secondary: 'rgb(140, 199, 171)',
        accent: 'rgb(230, 216, 185)',
        background: 'rgb(251, 251, 251)',
        surface: 'rgb(255, 255, 255)',
        text: 'rgb(61, 71, 80)',
        placeholder: 'rgb(176, 176, 176)',
        backdrop: 'rgb(23, 26, 31)',
        notification: 'rgb(255, 87, 34)',
    },
};

export const simpleMoneyDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: 'rgb(76, 175, 80)',
        secondary: 'rgb(33, 150, 243)',
        accent: 'rgb(255, 193, 7)',
        background: 'rgb(18, 18, 18)',
        surface: 'rgb(30, 30, 30)',
        text: 'rgb(224, 224, 224)',
        placeholder: 'rgb(117, 117, 117)',
        backdrop: 'rgb(0, 0, 0, 0.5)',
        notification: 'rgb(255, 87, 34)',
    },
};
