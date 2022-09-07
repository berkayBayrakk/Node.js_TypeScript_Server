import {Request,Response,NextFunction, RequestHandler} from 'express';

function authorizationMiddleware(roles:string[]):RequestHandler{
    
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!req.user || !roles.includes(req.user.role) ){
            res.status(401).json({message:'Unauthorized'});
        }
        next();
    }
}

export default authorizationMiddleware;