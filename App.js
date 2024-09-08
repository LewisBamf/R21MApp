// App.js
import React, { useState, useMemo, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { CombinedDefaultTheme, CombinedDarkTheme } from './src/theme';
import { PreferencesContext } from './src/context/PreferencesContext';
import DashboardScreen from './src/screens/DashboardScreen';
import TutorialsScreen from './src/screens/TutorialsScreen';

const Tab = createBottomTabNavigator();

function TabBarIcon({ routeName }) {
  const { colors } = useTheme();
  let iconName;
  const iconColor = colors.primary; // Access primary color from the theme

  if (routeName === 'Dashboard') {
    iconName = 'view-dashboard-outline';
  } else if (routeName === 'Tutorials') {
    iconName = 'school-outline';
  }

  return <Icon name={iconName} size={24} color={iconColor} />;
}

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    setIsThemeDark((prevTheme) => !prevTheme);
  }, []);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: () => <TabBarIcon routeName={route.name} />,
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Tutorials" component={TutorialsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
