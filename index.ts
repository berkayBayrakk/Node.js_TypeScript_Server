import 'dotenv/config';
import 'module-alias/register';

import App from './app';

import UserController from '@/resources/user/user.controller';

const userController=new UserController();

const app=new App(Number(process.env.PORT),[userController]);

app.listen();