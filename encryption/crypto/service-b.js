const crypto = require('crypto');

// Decryption function
const decryptData = (encryptedData, encryptionKey) => {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};

// Receive the encrypted data from Service A
// Extract the encrypted data from the request or message payload

// Decrypt the data
const encryptionKey = 'your-encryption-key';
const decryptedData = decryptData(encryptedData, encryptionKey);

// Process the decrypted data
console.log(decryptedData);
