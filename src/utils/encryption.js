// import CryptoJS from 'crypto-js';
// import CryptoJS from 'crypto-js';
import CryptoJS from 'react-native-crypto-js';

// TODO: In production, derive this from the user's PIN or use a more secure key management system
const SECRET_KEY = 'super-secret-key';

export function encrypt(text) {
    try {
        if (!text) {
            console.warn('Attempted to encrypt empty text');
            return '';
        }
        const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
        if (!encrypted) {
            throw new Error('Encryption produced empty result');
        }
        return encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        return ''; // Return empty string instead of throwing
    }
}

export function decrypt(ciphertext) {
    try {
        if (!ciphertext) {
            console.warn('Attempted to decrypt empty ciphertext');
            return '';
        }
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error('Decryption produced empty result');
        }
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return ''; // Return empty string instead of throwing
    }
}