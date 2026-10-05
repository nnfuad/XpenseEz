import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useStore, Transaction } from '../store/useStore';
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

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>New Transaction</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleBtn, type === 'expense' && styles.toggleActiveExpense]}
          onPress={() => setType('expense')}
        >
          <Text style={styles.toggleText}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleBtn, type === 'income' && styles.toggleActiveIncome]}
          onPress={() => setType('income')}
        >
          <Text style={styles.toggleText}>Income</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Amount (e.g. 50)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Category (e.g. Food, Salary)"
        placeholderTextColor="#888"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Description (Optional)"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Transaction</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    marginTop: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  toggleActiveExpense: {
    backgroundColor: '#f44336',
  },
  toggleActiveIncome: {
    backgroundColor: '#4caf50',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
