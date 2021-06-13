import User         from '../models/Users';
import jwt          from 'jsonwebtoken';
import authConfig   from '../../config/auth';

class SessionController{
    async store(req,res){

        try {
            const { email, password } = req.body;
            const user = await User.findOne({where: {email}});
            if (!user){
                return res.status(401).json({status:"User not found"})
            }   
            if(!(await user.checkPassword(password))){
                return res.status(401).json({status:"Password does match"});
            }
            const { id,nome} = user;
            return res.json({
                user:{
                    id,
                    nome,                    
                },
                token: jwt.sign({id} , authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                }),
            });    
        } catch (error) {
            return res.json({status:false});
        }
    }
}
export default new SessionController();