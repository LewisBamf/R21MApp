// App.js
import React, { useState, useMemo, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Provider as PaperProvider, useTheme, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { simpleMoneyLightTheme, simpleMoneyDarkTheme } from './src/theme';
import { PreferencesContext } from './src/context/PreferencesContext';
import DashboardScreen from './src/screens/DashboardScreen';
import TutorialsScreen from './src/screens/TutorialsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

function MainTabs() {
  const navigation = useNavigation(); // Use navigation from the hook
  const { colors } = useTheme();

  const handleProfilePress = () => {
    navigation.navigate('Profile'); // Properly navigate to the Profile screen
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabBarIcon routeName={route.name} focused={focused} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholder,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        headerRight: () => (
          <IconButton
            icon="account-circle"
            color={colors.primary}
            size={32}
            onPress={handleProfilePress}
            style={{ zIndex: 1 }} // Ensures the button remains above other elements
          />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tutorials" component={TutorialsScreen} />
    </Tab.Navigator>
  );
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

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false, // Hide headers in stack to manage with z-index
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              cardStyle: {
                zIndex: 0, // Lower the zIndex of the Profile screen to avoid overlapping
                elevation: 0, // For Android, manage elevation to keep correct layering
              },
            }}
          >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: true, // Show Profile header but manage zIndex
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
