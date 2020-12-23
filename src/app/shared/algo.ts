export function powMod(root, secret, mod){
    var bigInt = require("big-integer");
    var rootBigInt = bigInt(root, 10);
    var modBigInt = bigInt(mod, 10);
    rootBigInt = rootBigInt.modPow(secret, modBigInt)

    return rootBigInt;
} 

export function generateSecret(){
    var bigInt = require("big-integer");
    return bigInt.randBetween(1e100, 9e100);
}

export function encrypt(myKey, text){
    var CryptoJS = require("crypto-js");
    var key = new TextEncoder().encode(myKey);
    var cipherResult = CryptoJS.AES.encrypt(text, myKey.toString(), {iv: key, padding: CryptoJS.pad.NoPadding})
    return cipherResult.toString();
}

export function dencrypt(myKey, decryptedText){
    var CryptoJS = require("crypto-js");
    var key = new TextEncoder().encode(myKey);
    console.log(key);
    var bytes  = CryptoJS.AES.decrypt(decryptedText, myKey.toString());
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}