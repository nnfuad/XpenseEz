import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';
import NetInfo from '@react-native-community/netinfo';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  description?: string;
  synced?: boolean;
}

interface AppState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  syncOfflineTransactions: () => Promise<void>;
  setTransactions: (transactions: Transaction[]) => void;
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      transactions: [],
      addTransaction: (transaction) => {
        const newTransaction = { ...transaction, synced: false };
        set((state) => ({ transactions: [...state.transactions, newTransaction] }));
        get().syncOfflineTransactions();
      },
      removeTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
        // TODO: Handle remote deletion if needed
      },
      setTransactions: (transactions) => set({ transactions }),
      themeMode: 'system',
      setThemeMode: (mode) => set({ themeMode: mode }),
      syncOfflineTransactions: async () => {
        const state = get();
        const user = auth.currentUser;
        if (!user) return;

        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) return;

        const unsynced = state.transactions.filter(t => !t.synced);
        if (unsynced.length === 0) return;

        try {
          const batch = writeBatch(db);
          unsynced.forEach((t) => {
            const docRef = doc(db, 'users', user.uid, 'transactions', t.id);
            batch.set(docRef, { ...t, synced: true });
          });

          await batch.commit();

          // Update local state to mark as synced
          set((s) => ({
            transactions: s.transactions.map((t) =>
              unsynced.find(u => u.id === t.id) ? { ...t, synced: true } : t
            )
          }));
        } catch (error) {
          console.error("Failed to sync transactions", error);
        }
      },
    }),
    {
      name: 'xpenseez-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Listen to network changes to automatically sync when coming online
NetInfo.addEventListener(state => {
  if (state.isConnected) {
    useStore.getState().syncOfflineTransactions();
  }
});
