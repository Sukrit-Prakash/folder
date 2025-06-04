import AsyncStorage from '@react-native-async-storage/async-storage';
import { encrypt, decrypt } from '../utils/encryption';

const MASTER_PIN_KEY = 'MASTER_PIN';
const ENTRIES_KEY     = 'VAULT_ENTRIES';

export async function setMasterPin(pin) {
  try {
    if (!pin) {
      console.warn('Attempted to set empty master PIN');
      return false;
    }
    const cipher = encrypt(pin);
    await AsyncStorage.setItem(MASTER_PIN_KEY, cipher);
    return true;
  } catch (error) {
    console.error('Error setting master PIN:', error);
    return false;
  }
}

export async function checkMasterPin(pin) {
  try {
    if (!pin) {
      console.warn('Attempted to check empty master PIN');
      return false;
    }
    const cipher = await AsyncStorage.getItem(MASTER_PIN_KEY);
    if (!cipher) return false;
    const decrypted = decrypt(cipher);
    return decrypted === pin;
  } catch (error) {
    console.error('Error checking master PIN:', error);
    return false;
  }
}

export async function hasMasterPin() {
  try {
    const cipher = await AsyncStorage.getItem(MASTER_PIN_KEY);
    return cipher !== null;
  } catch (error) {
    console.error('Error checking if master PIN exists:', error);
    return false;
  }
}

export async function getAllEntries() {
  try {
    const data = await AsyncStorage.getItem(ENTRIES_KEY);
    if (!data) return [];
    const decrypted = decrypt(data);
    if (!decrypted) return [];
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Error getting all entries:', error);
    return [];
  }
}

export async function saveAllEntries(entries) {
  try {
    if (!Array.isArray(entries)) {
      console.warn('Attempted to save non-array entries');
      return false;
    }
    const cipher = encrypt(JSON.stringify(entries));
    await AsyncStorage.setItem(ENTRIES_KEY, cipher);
    return true;
  } catch (error) {
    console.error('Error saving all entries:', error);
    return false;
  }
}

export async function addEntry(entry) {
  try {
    if (!entry) {
      console.warn('Attempted to add empty entry');
      return false;
    }
    const entries = await getAllEntries();
    entries.push(entry);
    return await saveAllEntries(entries);
  } catch (error) {
    console.error('Error adding entry:', error);
    return false;
  }
}

export async function updateEntry(updated) {
  try {
    if (!updated || !updated.id) {
      console.warn('Attempted to update invalid entry');
      return false;
    }
    const entries = await getAllEntries();
    const idx = entries.findIndex(e => e.id === updated.id);
    if (idx === -1) {
      console.warn('Entry not found for update');
      return false;
    }
    entries[idx] = updated;
    return await saveAllEntries(entries);
  } catch (error) {
    console.error('Error updating entry:', error);
    return false;
  }
}

export async function deleteEntry(id) {
  try {
    if (!id) {
      console.warn('Attempted to delete entry with no ID');
      return false;
    }
    const entries = (await getAllEntries()).filter(e => e.id !== id);
    return await saveAllEntries(entries);
  } catch (error) {
    console.error('Error deleting entry:', error);
    return false;
  }
}

export async function selfDestruct() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Self-destruct failed:', error);
    return false;
  }
}
