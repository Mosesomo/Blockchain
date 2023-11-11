const forge = require('node-forge');

//Generating key pairs
const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);
const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);

encryptData = (data, publicKey) => {
    //converting the public key from pem format to a forge public key object
    const publicKeyObject = forge.pki.publicKeyFromPem(publicKey);

    //Encrypting the data
    let encryptedData = publicKeyObject.encrypt(forge.util.encodeUtf8(data));

    return forge.util.encode64(encryptedData);
}

//Decrypt data
decryptData = (encryptedData, privateKey) => {
    //Converting the private key from pem format to a forge private key object

    const privateKeyObject = forge.pki.privateKeyFromPem(privateKey);

    //Decryting the data
    let decryptedData = privateKeyObject.decrypt(forge.util.decode64(encryptedData));

    return forge.util.decodeUtf8(decryptedData)
}
let data = "Hi, I do love you!!";
let encrytedMessage = encryptData(data, publicKey);
console.log(`Encrypted massegae:\n${encrytedMessage}`);

let decryptedMessage = decryptData(encrytedMessage, privateKey);
console.log(`\nDecrypted message:\n${decryptedMessage}`);