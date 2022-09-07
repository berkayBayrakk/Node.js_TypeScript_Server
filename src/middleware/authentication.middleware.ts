import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';

import {verifyToken} from '@/utils/token';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';

import Users from '@/resources/user/user.model'

async function authenticationMiddleware(req:Request,res:Response,next:NextFunction){
    
    const bearerToken=req.headers.authorization;
    
    if(!bearerToken?.startsWith('Bearer '))return next(new HttpException(401, 'Unauthorised')); //token does not exist
    
    const token =bearerToken.split(' ')[1];

   try {
    const payload: jwt.JsonWebTokenError | Token=await verifyToken(token);

    if(payload instanceof jwt.JsonWebTokenError ){
        return next(new HttpException(401, 'Unauthorised'));
    }
    
    const user=await Users.findById(payload.id).select('-password').exec();

    if(!user)  return next(new HttpException(401, 'Unauthorised'));

    req.user=user;

   } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
   }
}

export default authenticationMiddleware;