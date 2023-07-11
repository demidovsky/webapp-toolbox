const crypto = require('crypto');

// Encryption function
const encryptData = (data, encryptionKey) => {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

// Data to be encrypted
const dataToSend = 'Sensitive data';

// Encrypt the data
const encryptionKey = 'your-encryption-key';
const encryptedData = encryptData(dataToSend, encryptionKey);

// Pass the encrypted data to the receiving microservice
// Make an HTTP request or use a message queue, depending on your microservices architecture
// Include the encrypted data in the request or message payload
