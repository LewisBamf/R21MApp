import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useTheme, Text, Card, Divider, IconButton, Button } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Line, Svg } from 'react-native-svg';
import moment from 'moment';

const DashboardScreen = () => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  const [balance, setBalance] = useState(78839);
  const [goal, setGoal] = useState(1000000);
  const [expenses, setExpenses] = useState([
    { amount: 50, type: 'expense', reference: 'Groceries', date: '2024-01-01' },
    { amount: 120, type: 'expense', reference: 'Utilities', date: '2024-01-15' },
    { amount: 200, type: 'income', reference: 'Salary', date: '2024-02-01' }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [expenseType, setExpenseType] = useState('expense');
  const [reference, setReference] = useState('');

  const transactions = expenses.map(expense => ({
    ...expense,
    date: moment(expense.date).format('MMM DD')
  }));

  const data = {
    labels: transactions.map(tx => tx.date),
    datasets: [
      {
        data: transactions.map(tx => tx.type === 'expense' ? -tx.amount : tx.amount),
        color: (opacity = 1) => colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const handleAddGoal = () => {
    Alert.prompt(
      'Set Goal',
      'Enter your new financial goal:',
      (text) => {
        const newGoal = parseFloat(text);
        if (!isNaN(newGoal) && newGoal > 0) {
          setGoal(newGoal);
        } else {
          Alert.alert('Invalid Input', 'Please enter a valid number.');
        }
      },
      'plain-text',
      '',
      'numeric'
    );
  };

  const handleTrackTransaction = () => {
    if (amount === '' || isNaN(parseFloat(amount))) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    const transactionAmount = parseFloat(amount);
    const updatedBalance = expenseType === 'expense' ? balance - transactionAmount : balance + transactionAmount;

    setExpenses([...expenses, { amount: transactionAmount, type: expenseType, reference, date: moment().format('YYYY-MM-DD') }]);
    setBalance(updatedBalance);
    setAmount('');
    setReference('');
    setModalVisible(false);
  };

  // Calculate the Y-axis range dynamically
  const maxDataValue = Math.max(goal, ...data.datasets[0].data);
  const yAxisStep = Math.ceil(maxDataValue / 4);

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
        <Text style={[styles.balance, { color: colors.primary }]}>${balance.toLocaleString()}</Text>
        <Text style={[styles.subtitle, { color: colors.onSurface }]}>
          {`$${balance.toLocaleString()} / Goal: $${goal.toLocaleString()}`}
        </Text>
        <View style={[styles.graphPlaceholder, { backgroundColor: colors.surface }]}>
          <LineChart
            data={data}
            width={screenWidth - 32}
            height={240}
            yAxisLabel="£"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              decimalPlaces: 2,
              color: (opacity = 1) => colors.primary,
              labelColor: (opacity = 1) => colors.onSurface,
              style: { borderRadius: 16 },
              propsForBackgroundLines: { strokeWidth: 0 },
              propsForDots: { r: '0' },
              propsForVerticalLabels: { fontSize: 10, fontFamily: 'Roboto', fill: colors.onSurface },
            }}
            bezier
            style={styles.chart}
          />
          <Svg height="240" width={screenWidth - 32} style={StyleSheet.absoluteFillObject}>
            <Line
              x1="0"
              y1={240 - (goal / maxDataValue) * 240}
              x2={screenWidth - 32}
              y2={240 - (goal / maxDataValue) * 240}
              stroke="grey"
              strokeWidth="2"
              strokeDasharray="5, 5"
            />
          </Svg>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <Button mode="contained" style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => setModalVisible(true)}>
          Track Transaction
        </Button>
        <Button mode="contained" style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleAddGoal}>
          Set Goal
        </Button>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.categoriesAndExpenses}>
        {/* Static Category Cards */}
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

        {/* Dynamic Expense List */}
        {expenses.map((expense, index) => (
          <Card key={index} style={styles.categoryCard}>
            <Card.Content>
              <Text style={styles.categoryLabel}>{expense.reference || 'No Reference'}</Text>
              <Text style={[styles.categoryValue, { color: expense.type === 'expense' ? colors.error : colors.primary }]}>
                {`${expense.type === 'expense' ? '-' : '+'} $${expense.amount.toFixed(2)}`}
              </Text>
              <Text style={[styles.categoryValue, { color: colors.onSurface }]}>
                {moment(expense.date).format('MMM DD, YYYY')}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Transaction</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Reference (optional)"
              value={reference}
              onChangeText={setReference}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={[styles.button, { backgroundColor: colors.error }]} onPress={() => { setExpenseType('expense'); handleTrackTransaction(); }}>
                <Text style={styles.buttonText}>Track Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => { setExpenseType('income'); handleTrackTransaction(); }}>
                <Text style={styles.buttonText}>Track Income</Text>
              </TouchableOpacity>
              <Button mode="contained" onPress={() => setModalVisible(false)}>Cancel</Button>
            </View>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditScore: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  notificationIcon: {
    marginRight: 8,
  },
  balanceSection: {
    marginBottom: 24,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  graphPlaceholder: {
    borderRadius: 16,
    padding: 8,
    overflow: 'hidden',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  divider: {
    marginVertical: 16,
  },
  categoriesAndExpenses: {
    marginTop: 16,
  },
  categoryCard: {
    marginBottom: 8,
    borderRadius: 8,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryValue: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
  },
});

export default DashboardScreen;
