import express,{Application } from 'express';
import mongoose from 'mongoose';
import compression  from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';

import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleWare from '@/middleware/error.middleware';

export default class App{
    public express:Application;
    public port:number;
    constructor(port:number,controllers:Controller[]){
        this.port=port;
        this.express=express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorMiddleWare();

    }
    private initializeMiddlewares=():void=>{
        this.express.use(express.json());
        this.express.use(helmet());
        this.express.use(compression({
            level:6,
            threshold:100*1000
        }));
        this.express.use(morgan('dev'));
        
    }

    private initializeControllers=(controllers:Controller[])=>{
        controllers.forEach((controller:Controller) =>{
            this.express.use('/api',controller.router);
        })
    }

    private initializeErrorMiddleWare(){
        this.express.use(ErrorMiddleWare);
    }

    public listen():void{
        this.express.listen(this.port,()=>{
            console.log(`App listening on the port ${this.port}`);
        })
    }
}