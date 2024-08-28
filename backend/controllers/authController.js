const { admin, firebase: firebaseClient } = require('../config/firebaseConfig');


async function logout(req, res) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        await admin.auth().revokeRefreshTokens(uid);

        return res.status(200).json({ message: 'User logged out successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging out.', error });
    }
};



async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const userCredential = await firebaseClient.auth().signInWithEmailAndPassword(email, password);
        const idToken = await userCredential.user.getIdToken();

        res.status(200).json({ message: 'User signed in successfully', token: idToken });
    } catch (error) {
        // Hata kodlarına göre spesifik mesajlar
        let errorMessage;
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No user found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email format.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This user account has been disabled.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Invalid credentials provided.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many requests. Try again later.';
                break;
            default:
                errorMessage = 'An unknown error occurred.';
        }

        res.status(401).json({ message: errorMessage });
    }
};

module.exports = {
    logout,
    signIn
};