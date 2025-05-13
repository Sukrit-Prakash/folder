// import CryptoJS from 'crypto-js';
// import CryptoJS from 'crypto-js';
import CryptoJS from 'react-native-crypto-js';

// const secretKey = process.env.REACT_APP_SECRET || 'defaultSecretKey';
const SECRET_KEY = 'super-secret-key'; // in prod, derive from PIN

export function encrypt(text) {
    try {
        if (!text) {
            throw new Error('Text to encrypt cannot be empty');
        }
        // Simple AES encryption without IV for now
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