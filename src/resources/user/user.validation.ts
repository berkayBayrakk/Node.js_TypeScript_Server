import Joi from 'joi';

const login = Joi.object({
    
    email:Joi.string().max(25).email().required(),
    
    password:Joi.string().max(12).min(6).required()
})

const register = Joi.object({
    
    email:Joi.string().max(25).email().required(),
    
    password:Joi.string().max(12).min(6).required(),

    name:Joi.string().required(),

});

export default {register,login};