// App.js
import React, { useState, useMemo, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, useTheme, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { simpleMoneyLightTheme, simpleMoneyDarkTheme } from './src/theme';
import { PreferencesContext } from './src/context/PreferencesContext';
import DashboardScreen from './src/screens/DashboardScreen';
import TutorialsScreen from './src/screens/TutorialsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
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

  const handleProfilePress = () => {
    // Handle profile button press (e.g., navigate to profile screen)
    const handleProfilePress = () => {
      // Handle profile button press (e.g., navigate to profile screen)
      navigation.navigate('Profile', { screen: 'ProfileScreen' });
    };
  };

  return (
    <PreferencesContext.Provider value={preferences} theme={theme}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => (
                <TabBarIcon routeName={route.name} focused={focused} />
              ),
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: theme.colors.placeholder,
              tabBarStyle: {
                backgroundColor: theme.colors.background,
              },
              headerRight: () => (
                <IconButton
                  icon="account-circle"
                  color={theme.colors.primary}
                  size={32}
                  onPress={handleProfilePress}
                />
              ),
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
