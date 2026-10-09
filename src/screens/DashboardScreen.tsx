import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1e2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130d',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, 
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

export const DashboardScreen = () => {
  const transactions = useStore((state) => state.transactions);

  const expenses = transactions.filter((t) => t.type === 'expense');
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const income = transactions.filter((t) => t.type === 'income');
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);

  // Group by category for Pie Chart
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const pieData = Object.keys(categoryTotals).map((key, index) => {
    const colors = ['#f44336', '#2196f3', '#ffeb3b', '#4caf50', '#ff9800'];
    return {
      name: key,
      population: categoryTotals[key],
      color: colors[index % colors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
  });

  // Mock line chart data (e.g. over last 6 months or days)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, totalExpense > 0 ? totalExpense : 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
        strokeWidth: 2,
      },
    ],
    legend: ['Monthly Spending'],
  };

  const { colors, isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image 
            source={isDark ? require('../../assets/logo-dark.png') : require('../../assets/logo-light.png')} 
            style={styles.logo} 
          />
          <Text style={[styles.header, { color: colors.text }]}>Overview</Text>
        </View>
      </View>

      <View style={styles.summaryCards}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>Income</Text>
          <Text style={[styles.cardAmount, { color: colors.income }]}>${totalIncome.toFixed(2)}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>Expense</Text>
          <Text style={[styles.cardAmount, { color: colors.expense }]}>${totalExpense.toFixed(2)}</Text>
        </View>
      </View>

      <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>Spending Trends</Text>
        <LineChart
          data={lineData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            ...chartConfig,
            backgroundGradientFrom: colors.card,
            backgroundGradientTo: colors.card,
            color: (opacity = 1) => colors.primary,
            labelColor: (opacity = 1) => colors.textSecondary,
          }}
          bezier
          style={styles.chartStyle}
        />
      </View>

      {pieData.length > 0 && (
        <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>Expenses by Category</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => colors.primary,
              labelColor: (opacity = 1) => colors.textSecondary,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>
      )}

      {pieData.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Add some expenses to see charts!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoutText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    color: '#aaaaaa',
    fontSize: 16,
    marginBottom: 8,
  },
  cardAmount: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  chartTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  chartStyle: {
    borderRadius: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  emptyText: {
    color: '#888888',
    fontSize: 16,
  },
});
