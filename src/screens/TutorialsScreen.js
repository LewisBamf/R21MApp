import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Card, Title, Paragraph } from 'react-native-paper';
import tutorials from '../data/tutorials'; // Import the JSON file

const TutorialsScreen = () => {
    const { colors } = useTheme();

    const renderCards = () => {
        if (!Array.isArray(tutorials)) {
            console.log('Error: Tutorials data is not an array');
            return null; // Return null or handle the error case
        }
    
        return tutorials.map((item) => {
            if (!item || typeof item !== 'object') {
                console.log('Error: Invalid tutorial data');
                return null; // Return null or handle the error case
            }
    
            return (
                <Card key={item.id} style={[styles.card, { backgroundColor: colors.surface }]}>
                    <Card.Content>
                        <Title style={{ color: colors.primary }}>{item.title}</Title>
                        <Paragraph style={{ color: colors.onSurface }}>{item.description}</Paragraph>
                    </Card.Content>
                </Card>
            );
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {renderCards()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        elevation: 2,
        // Adjusted width to take flex properties into account
    },
});

export default TutorialsScreen;
