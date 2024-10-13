import CryptoJS from 'crypto-js';

const KEY = CryptoJS.enc.Utf8.parse('kjbV1567isR.n!bu');
const IV = CryptoJS.enc.Utf8.parse('iadlkv.&Ac,Lsf71');

export function cryptoEncrypt(input: string) {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), KEY, {
        keySize: 128 / 8,
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
}

export function cryptoDecrypt(encrypted: string) {
    const decrypted = CryptoJS.AES.decrypt(encrypted, KEY, {
        keySize: 128 / 8,
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}
