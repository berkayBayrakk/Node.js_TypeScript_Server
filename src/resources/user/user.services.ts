import UserModel from './user.model';
import { createToken } from '@/utils/token';

class UserService{
    
    private User=UserModel;

    public login=async(email:string,password:string):Promise<string|Error>=>{
        try {
            const user=await this.User.findOne({email});
            
            if(!user) throw new Error('User is not exist')
            
            const result=await user.isValidPassword(password);
            
            if(result) return createToken(user,'15m');
            
            throw new Error('Wrong password');

        } catch (error ) {
            throw new Error('Login error')
        }
    }

    public register=async(name: string,email: string,
        password: string,role: string):Promise<Error|string>=>{
            try {
                const user=await this.User.create({name,email,password,role})
                return(`User created id:${user._id}`);
            } catch (error) {
                throw new Error('Register failed');
            }
        }
}

export default UserService;