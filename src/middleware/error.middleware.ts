import {Request,Response,NextFunction} from 'express';
import HttpException from '@/utils/exceptions/http.exception';

export default function errorMiddleWare(
    error:Error,
    req:Request,
    res:Response,
    next:NextFunction
):void{
    if( error instanceof  HttpException){
        const status=error.status||500;
        const message=error.message||'HTTP Error ';
        res.status(status).send({
            status,message
        })
    }
    
}

