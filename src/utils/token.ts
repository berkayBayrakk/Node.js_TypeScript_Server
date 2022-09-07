import jwt from 'jsonwebtoken';
import User from 'resources/user/user.interface';
import Token from './interfaces/token.interface';

export function createToken(user:User,time:'15m'|'1d'):string{
   return jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET as jwt.Secret,
        {expiresIn:time});
}

export function verifyToken(token:string):Promise<jwt.VerifyErrors|Token>{
    return new Promise((resolve,reject)=>{
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err,payload)=>{
            if(err)reject(err);
            resolve(payload as Token)
        })
    })
}

