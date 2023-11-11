const crypto = require('crypto');

const key = crypto.randomBytes(16);
function encryptData(data){
    let cipher = crypto.createCipheriv("aes-128-cbc", key, new Uint8Array(16));
    let encryptedData = cipher.update(data, "utf8", "base64");
    encryptedData += cipher.final("base64");

    return encryptedData;
}

function decryptData(encryptedData){
   let decipher = crypto.createDecipheriv("aes-128-cbc", key, new Uint8Array(16));
   let decryptedData = decipher.update(encryptedData, "base64", "utf8");
   decryptedData += decipher.final("utf8");

   return decryptedData;
}

let message = encryptData("How to do Cryptography in blockchain using javascript by Moses.O.Wamboga");

let ciphertext = decryptData(message)
console.log(`Ciphertext:\n ${message}`);
console.log(`\nOriginal text:\n${ciphertext}`)