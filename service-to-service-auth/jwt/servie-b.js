const jwt = require('jsonwebtoken');

// Middleware to authenticate the incoming request
const authenticateRequest = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7); // Extract the token from the Authorization header
    
    const secretKey = 'your-secret-key';
    try {
      // Verify the token
      const decoded = jwt.verify(token, secretKey);
      // You can access the decoded data, such as serviceId, and perform additional checks if needed
      
      // Store the decoded data in the request object for further use
      req.serviceId = decoded.serviceId;
      
      // Continue to the next middleware
      next();
    } catch (err) {
      // Handle token verification error
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    // No token provided
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Protected route that requires authentication
app.get('/protected-route', authenticateRequest, (req, res) => {
  // Access the serviceId from the request object
  const serviceId = req.serviceId;
  
  // Process the request or return data to the client
  res.json({ message: `Welcome, ${serviceId}!` });
});
