import { Schema, model } from 'mongoose';
import User from './user.interface';

import bcrypt from 'bcrypt';

const UserSchema:Schema<User>=new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.pre<User>('save',async function (next){
    if(!this.isModified('password')){
        next();
    }
    const hash=await bcrypt.hash(this.password,10)

    this.password=hash;
    
    next();
});

UserSchema.method<User>('isValidPassword',async function(password: string): Promise<Error | boolean> {
    
    return bcrypt.compare(password,this.password);
})

export default model<User>('User',UserSchema)