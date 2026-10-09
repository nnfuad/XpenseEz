import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useStore, Transaction } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { analytics } from '../services/firebaseConfig';
import { logEvent } from 'firebase/analytics';

export const AddTransactionScreen = ({ navigation }: any) => {
  const addTransaction = useStore((state) => state.addTransaction);
  
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Invalid Amount', 'Please enter a valid number.');
      return;
    }
    if (!category.trim()) {
      Alert.alert('Invalid Category', 'Please enter a category.');
      return;
    }

    const newTx: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category: category.trim(),
      type,
      description: description.trim(),
      date: new Date().toISOString(),
    };

    addTransaction(newTx);

    // Generate Dataset for Analytics
    if (analytics) {
      logEvent(analytics, 'add_transaction', {
        transaction_type: type,
        category: newTx.category,
        amount: newTx.amount,
      });
    }

    Alert.alert('Success', 'Transaction added successfully!');
    setAmount('');
    setCategory('');
    setDescription('');
    
    // Navigate back to Dashboard
    navigation.navigate('Dashboard');
  };

  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={[styles.title, { color: colors.text }]}>New Transaction</Text>

      <View style={[styles.toggleContainer, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={[styles.toggleBtn, type === 'expense' && { backgroundColor: colors.expense }]}
          onPress={() => setType('expense')}
        >
          <Text style={styles.toggleText}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleBtn, type === 'income' && { backgroundColor: colors.income }]}
          onPress={() => setType('income')}
        >
          <Text style={styles.toggleText}>Income</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Amount</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholder="e.g. 50"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Category</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholder="e.g. Food, Salary"
          placeholderTextColor={colors.textSecondary}
          value={category}
          onChangeText={setCategory}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Description</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholder="Optional"
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Transaction</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  saveBtn: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
