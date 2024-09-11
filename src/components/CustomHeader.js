// src/components/CustomHeader.js
import React from 'react';
import { View, Text } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: colors.background,
        zIndex: 1,
      }}
    >
      {navigation.canGoBack() && (
        <IconButton
          icon="arrow-left"
          color={colors.primary}
          size={24}
          onPress={() => navigation.goBack()}
        />
      )}
      <Text style={{ fontSize: 18, color: colors.text }}>{title}</Text>
      <IconButton
        icon="account-circle"
        color={colors.primary}
        size={32}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default CustomHeader;
