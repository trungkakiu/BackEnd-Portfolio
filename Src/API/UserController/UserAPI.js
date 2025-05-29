import db from '../../../models/index.js'
import bcrypt from 'bcrypt';
import JWTaction from '../../Midleware/JWTaction.js';
import dotenv from 'dotenv'

const env = dotenv.config();
const HashPassWordUser = (PassWord) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(PassWord, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
};


const ValidLogin = async (req, res) =>{
   try {
        const { data } = req.body;
        const { UserName, PassWord } = data;
        console.log(UserName)
        if(!UserName || !PassWord){
            return res.status(204).json({
                EM: "mising parameter",
                EC: -304,
                ED: ''
            });
        }

        const PassWordToHash = await HashPassWordUser(data.PassWord);
        const User = await db.BeeAcount.findOne({
            where: {
                UserName: data.UserName
            }
        });

        if(User){
            const isMatch = await bcrypt.compare(data.PassWord, User.PassWord);
            if(!isMatch){
                return res.status(205).json({
                    EM: "Wrong password",
                    EC: -205,
                    ED: ''
                });
            }

            var UserData = { Email: User.Email , Role: User.Role, UserName: User.UserName};
            const Token = await JWTaction.JwtSign(UserData);
            console.log(Token);
            res.cookie("JWT", Token, {httpOnly: true, maxAge: env.JWTdead, secure: env.COOKIESECURE });
            return res.status(200).json({
                EM: "Login successfuly",
                EC: 200,
                ED: UserData
            });
        }

        return res.status(204).json({
            EM: "Username wrong!",
            EC: 204,
            ED: ''
        });

   } catch (error) {
    console.log(error);
        return res.status(500).json({
            EM: "Oops, server down!",
            EC: -500,
            ED: ''
        });

   }
}


const Register = async (req, res) =>{
    try {   
        const { data } = req.body;
        const { UserName, PassWord , Email} = data;
        if(!UserName || !PassWord || !Email){
            return res.status(204).json({
                EM: "mising parameter",
                EC: -204,
                ED: ''
            });
        }

        const UserNameValid = await db.BeeAcount.findOne({
            where: {
                UserName: UserName
            }
        });

        if(UserNameValid){
            return res.status(205).json({
                EM: "User name already exists!",
                EC: -205,
                ED: ''
            });
        }
        const EmailValid = await db.BeeAcount.findOne({
            where: {
                Email: Email
            }
        });

        if(EmailValid){
            return res.status(206).json({
                EM: "Email already associated with another account!",
                EC: -206,
                ED: ''
            });
        }

        const PassWordToHash = await HashPassWordUser(PassWord);
        await db.BeeAcount.create({
            Email: Email,
            PassWord: PassWordToHash,
            UserName: UserName,
            Role: "USER"
        });

        return res.status(200).json({
            EM: "Sign up complete!",
            EC: 200,
            ED: ''
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Oops, server down!",
            EC: -500,
            ED: ''
        });
    }
}


export default {
    ValidLogin, Register
}