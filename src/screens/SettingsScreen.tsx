import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useStore } from '../store/useStore';
import { auth } from '../services/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useTheme } from '../hooks/useTheme';

export const SettingsScreen = () => {
  const { colors, themeMode } = useTheme();
  const setThemeMode = useStore((state) => state.setThemeMode);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 10,
    },
    optionButton: {
      padding: 15,
      backgroundColor: colors.card,
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    optionActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '20',
    },
    optionText: {
      fontSize: 16,
      color: colors.text,
    },
    logoutButton: {
      backgroundColor: colors.error,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    logoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 40,
      marginTop: 20,
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 20,
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={themeMode === 'light' || (themeMode === 'system' && colors.background === '#f5f5f5') ? require('../../assets/logo-light.png') : require('../../assets/logo-dark.png')} 
          style={styles.logo} 
        />
        <Text style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>Profile</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 16 }}>{auth.currentUser?.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Settings</Text>
        
        <TouchableOpacity 
          style={[styles.optionButton, themeMode === 'light' && styles.optionActive]} 
          onPress={() => setThemeMode('light')}
        >
          <Text style={styles.optionText}>Light Mode</Text>
          {themeMode === 'light' && <Text style={{color: colors.primary}}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, themeMode === 'dark' && styles.optionActive]} 
          onPress={() => setThemeMode('dark')}
        >
          <Text style={styles.optionText}>Dark Mode</Text>
          {themeMode === 'dark' && <Text style={{color: colors.primary}}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, themeMode === 'system' && styles.optionActive]} 
          onPress={() => setThemeMode('system')}
        >
          <Text style={styles.optionText}>System Default</Text>
          {themeMode === 'system' && <Text style={{color: colors.primary}}>✓</Text>}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
