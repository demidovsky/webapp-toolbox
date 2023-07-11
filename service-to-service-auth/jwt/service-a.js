const jwt = require('jsonwebtoken');

// Generate a JWT token
const generateToken = () => {
  const payload = {
    // Include any relevant data in the payload
    serviceId: 'service_a',
    // Add additional claims as needed
  };
  
  const secretKey = 'your-secret-key';
  const options = {
    expiresIn: '1h', // Set the token expiration time
  };
  
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

// Use the token when making a request to the server microservice
const requestToServerMicroservice = async () => {
  const token = generateToken();
  
  // Make a request to the server microservice, including the token in the Authorization header
  const response = await axios.get('http://server-microservice-url', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  // Process the response
  console.log(response.data);
};
