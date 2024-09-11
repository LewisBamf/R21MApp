// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useTheme, Text, Avatar, Button, Switch, Divider, List } from 'react-native-paper';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const windowWidth = Dimensions.get('window').width;

  // State to manage toggle settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleToggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const handleToggleTheme = () => setDarkTheme(!darkTheme);

  // Sign out function
  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => console.log('User signed out') },
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* User Information */}
      <View style={[styles.userInfoSection, { backgroundColor: colors.primary }]}>
        <Avatar.Image
          size={80}
          source={{ uri: 'https://i.pravatar.cc/300' }} // Placeholder for user profile image
          style={styles.avatar}
        />
        <Text style={[styles.userName, { color: colors.background }]}>John Doe</Text>
        <Text style={[styles.userEmail, { color: colors.background }]}>johndoe@example.com</Text>
      </View>

      {/* Settings Options */}
      <View style={[styles.settingsContainer, { backgroundColor: colors.surface }]}>
        {/* Account Settings */}
        <List.Section>
          <List.Subheader style={{ color: colors.primary }}>Account Settings</List.Subheader>
          <List.Item
            title="Personal Information"
            description="Update your name, email, and other details"
            left={(props) => <List.Icon {...props} icon="account" color={colors.primary} />}
            onPress={() => console.log('Navigate to personal information')}
          />
          <Divider style={styles.divider} />

          <List.Item
            title="Change Password"
            description="Update your password"
            left={(props) => <List.Icon {...props} icon="lock" color={colors.primary} />}
            onPress={() => console.log('Navigate to change password')}
          />
        </List.Section>

        {/* Appearance */}
        <List.Section>
          <List.Subheader style={{ color: colors.primary }}>Appearance</List.Subheader>
          <List.Item
            title="Dark Theme"
            right={() => <Switch value={darkTheme} onValueChange={handleToggleTheme} />}
            left={(props) => <List.Icon {...props} icon="theme-light-dark" color={colors.primary} />}
          />
        </List.Section>

        {/* Notifications */}
        <List.Section>
          <List.Subheader style={{ color: colors.primary }}>Notifications</List.Subheader>
          <List.Item
            title="Push Notifications"
            right={() => <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />}
            left={(props) => <List.Icon {...props} icon="bell-ring" color={colors.primary} />}
          />
        </List.Section>

        {/* Sign Out Button */}
        <Button
          mode="contained"
          onPress={handleSignOut}
          style={[styles.signOutButton, { backgroundColor: colors.error, elevation: 5 }]}
        >
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
  },
  settingsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  signOutButton: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default ProfileScreen;
