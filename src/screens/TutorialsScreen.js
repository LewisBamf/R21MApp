// src/screens/TutorialsScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme, Card, Title, Paragraph } from 'react-native-paper';
import tutorials from '../data/tutorials'; // Import the JSON file containing tutorial data

const TutorialsScreen = () => {
  const { colors } = useTheme();

  // Renders a list of tutorial cards based on the data
  const renderCards = () => {
    if (!Array.isArray(tutorials)) {
      console.log('Error: Tutorials data is not an array');
      return null; // Handle the error case if the tutorials data is invalid
    }

    return tutorials.map((item) => {
      if (!item || typeof item !== 'object') {
        console.log('Error: Invalid tutorial data');
        return null; // Handle the error case if an individual tutorial item is invalid
      }

    return (
      <Card key={item.id} style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => console.log(`Opening tutorial ${item.id}`)}>
        {/* Wrapping content in a View to handle overflow correctly */}
        <View style={styles.cardContentWrapper}>
        <Card.Cover source={{ uri: item.image }} style={styles.image} />
        <Card.Content style={styles.cardContent}>
          <Title style={[styles.title, { color: colors.primary }]}>{item.title}</Title>
          <Paragraph style={[styles.description, { color: colors.onSurface }]}>
            {item.description}
          </Paragraph>
        </Card.Content>
        </View>
      </Card>
    );
    });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.gridContainer}>{renderCards()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows cards to wrap into rows
    justifyContent: 'space-between', // Space cards evenly
  },
  card: {
    width: Dimensions.get('window').width / 2 - 24, // Responsive width, two cards per row with spacing
    marginBottom: 16,
    borderRadius: 10,
    elevation: 4, // Shadow for a modern look
  },
  cardContentWrapper: {
    borderRadius: 10,
    overflow: 'hidden', // Apply overflow here to ensure content stays within bounds
    minHeight: 340, // Set a minimum height to ensure consistent card size
  },
  image: {
    height: 120, // Fixed height for consistency
    resizeMode: 'cover', // Ensures the image covers the space without stretching
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default TutorialsScreen;
