// src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({ onProfilePress, onMenuPress }) {
  const navigation = useNavigation();
  const { colors } = useTheme();

return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, marginTop: 48, backgroundColor: colors.background }}>
            <TouchableOpacity onPress={onMenuPress} style={{ padding: 0 }}>
                <Icon name="menu" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: colors.primary }}>App Header</Text>
            <TouchableOpacity onPress={onProfilePress} style={{ padding: 0 }}>
                <Icon name="account" size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
}
