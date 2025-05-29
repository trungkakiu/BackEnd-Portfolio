import jwt, { decode }  from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const JwtSign = async(data) =>{
    const key = process.env.APIKEY;
    const expires = process.env.JWTdead;
    if (!data) {
        console.error("Payload is required");
        return null;
    }
    const { Password, ...safeData } = data;
    let token = null;
    try {
        token = jwt.sign(safeData,key,{ expiresIn: "3h" } );
    } catch (error) {
        console.log(error);
    }
    return token;
}



const VerifyToken = (token) => {
    const key = process.env.ScretKey;
    try {
        if(token){
            const decoded = jwt.verify(token, key);
            console.log("decoded: ",decoded); 
            return decoded; 
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}

export default {
    JwtSign, VerifyToken
}

