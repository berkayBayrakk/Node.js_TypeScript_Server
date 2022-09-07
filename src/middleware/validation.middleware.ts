import {Request,Response,NextFunction,RequestHandler} from 'express';

import Joi from 'joi';

function validateMiddleware(schema:Joi.Schema):RequestHandler{

    return async(req:Request,res:Response,next:NextFunction):Promise<void>=>{

        try {
            const value = await schema.validateAsync(req.body);
            req.body = value;
            next();
        } catch (e:any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors });
        }
    }
}

export default validateMiddleware;