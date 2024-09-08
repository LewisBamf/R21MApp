// src/context/PreferencesContext.js
import React, { createContext } from 'react';

export const PreferencesContext = createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});
