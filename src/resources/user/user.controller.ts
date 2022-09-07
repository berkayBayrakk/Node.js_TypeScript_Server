import {  Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';

import HttpException from '@/utils/exceptions/http.exception';

import userValidation from './user.validation';

import validateMiddleware from '@/middleware/validation.middleware';
import authenticationMiddleware from '@/middleware/authentication.middleware';

import UserService from './user.services';

class UserController implements Controller{

    public router=Router();
    
    public path='/user';

    private UserService=new UserService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes():void{
        
        //login
        this.router.route(`${this.path}/login`).post(validateMiddleware(userValidation.login),this.login);

        //register
        this.router.route(`${this.path}/register`).post(validateMiddleware(userValidation.register),this.register);

        //getUser
        this.router.route(`${this.path}`).get(authenticationMiddleware,this.getUser);
    }

    private login =async(req:Request,res:Response,next:NextFunction):Promise<void|Response >=>{
        const {email,password}=req.body;
        try {
            const result =await this.UserService.login(email,password);

            res.status(200).json({result})

        } catch (error ) {
            let message = 'Server Error';
            if (error instanceof Error) message = error.message;
            next(new HttpException(400,message));
        }
    }

    private register=async(req:Request,res:Response,next:NextFunction)=>{
        const {email,password,name}=req.body;
        try {
            const result=await this.UserService.register(name,email,password,'user');
            
            res.status(201).json({result});

        } catch (error) {
            let message = 'Server Error';
            if (error instanceof Error) message = error.message;
            next(new HttpException(400,message));
        }
    }

    private getUser=async(req:Request,res:Response,next:NextFunction)=>{
        if(!req.user){
            return next(new HttpException(404, 'No logged in user'))
        }
        res.status(200).json({data:req.user})
    }
}

export default UserController;