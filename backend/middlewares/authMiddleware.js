const { admin } = require('../config/firebaseConfig');

const authMiddleware = async (req, res, next) => {
try {  
    const idToken = req.headers.authorization?.split('Bearer ')[1];
  
    const decodedToken = await admin.auth().verifyIdToken(idToken); 
    req.user = decodedToken; 
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized user'); 
    
  }
};

module.exports = authMiddleware;

