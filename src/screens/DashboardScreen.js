import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useTheme, Text, Card, Divider, IconButton, Button, ProgressBar } from 'react-native-paper';
import moment from 'moment';



const DashboardScreen = () => {
  const { colors } = useTheme();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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

  // Calculate the progress as a percentage of the goal
  const progress = balance / goal;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
     <View style={[styles.Headercontainer, { backgroundColor: colors.primary }]}>
      <View style={styles.header}>
        <IconButton
          icon="bell-outline"
          size={24}
          iconColor={colors.onPrimary}
          style={styles.notificationIcon}
          onPress={() => {}}
        />
      </View>

      <View style={styles.balanceSection}>
        <Text style={[styles.balance, { color: colors.background }]}>${balance.toLocaleString()}</Text>
        <Text style={[styles.subtitle, { color: colors.background }]}>
          {`$${balance.toLocaleString()} / Goal: $${goal.toLocaleString()}`}
        </Text>
        <ProgressBar progress={progress} color={colors.secondary} style={styles.progressBar} />
        <Text style={[styles.progressLabel, { color: colors.background }]}>
          {Math.round(progress * 100)}% of your goal
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <Button mode="contained" style={[styles.button, { backgroundColor: colors.secondary }]} onPress={() => setModalVisible(true)}>
          Track Transaction
        </Button>
        <Button mode="contained" style={[styles.button, { backgroundColor: colors.secondary }]} onPress={handleAddGoal}>
          Set Goal
        </Button>
      </View>
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
            <TouchableOpacity
                style={[
                  styles.typeButton,
                  expenseType === 'expense' && { backgroundColor: colors.accent },
                ]}
                onPress={() => setExpenseType('expense')}
              >
                <Text style={styles.buttonText}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  expenseType === 'income' && { backgroundColor: colors.primary },
                ]}
                onPress={() => setExpenseType('income')}
              >
                <Text style={styles.buttonText}>Income</Text>
              </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={handleTrackTransaction} style={{ marginTop: 10 }}>OK</Button>
            <Button mode="contained" onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>Cancel</Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
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
  progressBar: {
    marginVertical: 12,
    height: 10,
    borderRadius: 5,
  },
  progressLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  divider: {
    marginVertical: 16,
  },
  categoriesAndExpenses: {
    marginBottom: 16,
  },
  categoryCard: {
    marginVertical: 4,
  },
  categoryLabel: {
    fontSize: 14,
  },
  categoryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    padding: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  Headercontainer: {
      width: 'windowWidth',
      padding: 16,
  },
});

export default DashboardScreen;
 