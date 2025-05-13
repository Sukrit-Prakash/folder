import AsyncStorage from '@react-native-async-storage/async-storage';
import { encrypt, decrypt } from '../utils/encryption';

const MASTER_PIN_KEY = 'MASTER_PIN';
const ENTRIES_KEY     = 'VAULT_ENTRIES';

export async function setMasterPin(pin) {
  const cipher = encrypt(pin);
  await AsyncStorage.setItem(MASTER_PIN_KEY, cipher);
}

export async function checkMasterPin(pin) {
  const cipher = await AsyncStorage.getItem(MASTER_PIN_KEY);
  if (!cipher) return false;
  return decrypt(cipher) === pin;
}

export async function hasMasterPin() {
  return (await AsyncStorage.getItem(MASTER_PIN_KEY)) !== null;
}

export async function getAllEntries() {
  const data = await AsyncStorage.getItem(ENTRIES_KEY);
  if (!data) return [];
  try {
    const arr = JSON.parse(decrypt(data));
    return arr;
  } catch {
    return [];
  }
}

export async function saveAllEntries(entries) {
  const cipher = encrypt(JSON.stringify(entries));
  await AsyncStorage.setItem(ENTRIES_KEY, cipher);
}

export async function addEntry(entry) {
  const entries = await getAllEntries();
  entries.push(entry);
  await saveAllEntries(entries);
}

export async function updateEntry(updated) {
  const entries = await getAllEntries();
  const idx = entries.findIndex(e => e.id === updated.id);
  if (idx !== -1) {
    entries[idx] = updated;
    await saveAllEntries(entries);
  }
}

export async function deleteEntry(id) {
  const entries = (await getAllEntries()).filter(e => e.id !== id);
  await saveAllEntries(entries);
}
