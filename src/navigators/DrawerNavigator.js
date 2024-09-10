// src/navigators/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button } from 'react-native';
import DashboardScreen from '../screens/DashboardScreen';
import TutorialsScreen from '../screens/TutorialsScreen';

const Drawer = createDrawerNavigator();

const DashboardDrawerContent = ({ navigation }) => (
  <View style={{ flex: 1, padding: 16 }}>
    <Text>Dashboard Options</Text>
    <Button title="Option 1" onPress={() => { /* handle option 1 */ }} />
    <Button title="Option 2" onPress={() => { /* handle option 2 */ }} />
  </View>
);

const TutorialsDrawerContent = ({ navigation }) => (
  <View style={{ flex: 1, padding: 16 }}>
    <Text>Tutorials Options</Text>
    <Button title="Option A" onPress={() => { /* handle option A */ }} />
    <Button title="Option B" onPress={() => { /* handle option B */ }} />
  </View>
);

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ drawerContent: (props) => <DashboardDrawerContent {...props} /> }}
      />
      <Drawer.Screen
        name="Tutorials"
        component={TutorialsScreen}
        options={{ drawerContent: (props) => <TutorialsDrawerContent {...props} /> }}
      />
    </Drawer.Navigator>
  );
}
