// App.js
import React, { useState, useMemo, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { simpleMoneyLightTheme, simpleMoneyDarkTheme } from './src/theme';
import { PreferencesContext } from './src/context/PreferencesContext';
import DashboardScreen from './src/screens/DashboardScreen';
import TutorialsScreen from './src/screens/TutorialsScreen';
import Header from './src/components/Header';

const Tab = createBottomTabNavigator();

function TabBarIcon({ routeName, focused }) {
  const { colors } = useTheme();
  let iconName;
  const iconColor = focused ? colors.primary : colors.placeholder;

  if (routeName === 'Dashboard') {
    iconName = 'view-dashboard-outline';
  } else if (routeName === 'Tutorials') {
    iconName = 'school-outline';
  }

  return <Icon name={iconName} size={24} color={iconColor} />;
}

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const theme = isThemeDark ? simpleMoneyDarkTheme : simpleMoneyLightTheme;

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

  const handleMenuPress = () => {
    // Handle menu button press (e.g., open drawer or show modal)
    console.log('Menu button pressed');
  };

  const handleProfilePress = () => {
    // Handle profile button press (e.g., navigate to profile screen)
    console.log('Profile button pressed');
  };

  return (
    <PreferencesContext.Provider value={preferences} theme={theme}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          {/* Add the Header component */}
          <Header onMenuPress={handleMenuPress} onProfilePress={handleProfilePress} />

          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon routeName={route.name} focused={focused} />
              ),
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: theme.colors.placeholder,
              tabBarStyle: {
                backgroundColor: theme.colors.background,
              },
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
