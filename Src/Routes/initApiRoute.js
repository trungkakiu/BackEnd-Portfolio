import express from 'express';
import JWTaction from '../Midleware/JWTaction.js';
import UserAPI from '../API/UserController/UserAPI.js'
const router = express.Router();

const extractToken = (req) =>
req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;

const CheckJWT = async (req, res, next) => {
    try {
        const token = req.cookies.jwt?.Access_token || extractToken(req);

        if (!token) {
            return res.status(401).json({ EM: "Missing token!", EC: -201, ED: '' });
        }

        const decoded = JWTaction.VerifyToken(token);

        if (decoded && decoded.EC === 0) {
            req.user = decoded.ED;
            req.token = token;
            next();
        } else {
            return res.status(401).json({ EM: "Invalid token!", EC: -203, ED: '' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ EM: "Server error in CheckJWT", EC: -500, ED: '' });
    }
};

const initApiRoute = (app) => {
    router.post("/Authenticate/Login", UserAPI.ValidLogin);
    router.post("/Authenticate/Register", UserAPI.Register);
    return app.use('/api/v1', router);
}


export default initApiRoute;