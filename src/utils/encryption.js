// import CryptoJS from 'crypto-js';
// import CryptoJS from 'crypto-js';
import CryptoJS from 'react-native-crypto-js';

// TODO: In production, derive this from the user's PIN or use a more secure key management system
const SECRET_KEY = 'super-secret-key';

export function encrypt(text) {
    try {
        if (!text) {
            throw new Error('Text to encrypt cannot be empty');
        }
        return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
}

export function decrypt(ciphertext) {
    try {
        if (!ciphertext) {
            throw new Error('Ciphertext cannot be empty');
        }
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
}