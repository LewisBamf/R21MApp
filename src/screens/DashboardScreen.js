// src/screens/DashboardScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme, Text, Card, Divider, IconButton } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const DashboardScreen = () => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // Sample data for the graph
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43], // Y-axis data
        color: (opacity = 1) => colors.primary, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.creditScore, { color: colors.onPrimary }]}>Credit Score</Text>
          <Text style={[styles.scoreValue, { color: colors.onPrimary }]}>781</Text>
        </View>
        <IconButton
          icon="bell-outline"
          size={24}
          iconColor={colors.onPrimary}
          style={styles.notificationIcon}
          onPress={() => {}}
        />
      </View>

      <View style={styles.balanceSection}>
        <Text style={[styles.balance, { color: colors.primary }]}>$78,839</Text>
        <Text style={[styles.subtitle, { color: colors.onSurface }]}>Total Balance</Text>
        {/* Line chart */}
        <View style={[styles.graphPlaceholder, { backgroundColor: colors.surface }]}>
          <LineChart
            data={data}
            width={screenWidth - 32} // Adjust width based on screen size
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              decimalPlaces: 2,
              color: (opacity = 1) => colors.primary,
              labelColor: (opacity = 1) => colors.onSurface,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: colors.primary,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.categories}>
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text style={styles.categoryLabel}>Cash</Text>
            <Text style={[styles.categoryValue, { color: colors.primary }]}>$5,732</Text>
          </Card.Content>
        </Card>
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text style={styles.categoryLabel}>Credit Cards</Text>
            <Text style={[styles.categoryValue, { color: colors.error }]}>- $4,388</Text>
          </Card.Content>
        </Card>
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text style={styles.categoryLabel}>Investments</Text>
            <Text style={[styles.categoryValue, { color: colors.primary }]}>$82,389</Text>
          </Card.Content>
        </Card>
        <Card style={styles.categoryCard}>
          <Card.Content>
            <Text style={styles.categoryLabel}>Property</Text>
            <Text style={[styles.categoryValue, { color: colors.primary }]}>$102,225</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'column',
  },
  creditScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 28,
  },
  notificationIcon: {
    marginRight: 8,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  graphPlaceholder: {
    height: 220,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  divider: {
    marginVertical: 16,
  },
  categories: {
    flexDirection: 'column',
  },
  categoryCard: {
    marginVertical: 8,
  },
  categoryLabel: {
    fontSize: 16,
  },
  categoryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default DashboardScreen;
