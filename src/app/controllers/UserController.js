import User from '../models/Users';
import * as Yup from 'yup';

class UserController{
    async store(req,res){
        try{
            const schema = Yup.object().shape({
                nome: Yup.string().required(),
                email: Yup.string().email().required(),                
                password: Yup.string().required().min(6),
            });
            if (!(await schema.isValid(req.body))){
                return res.status(400).json({status:"Validation fails"});
            };


            const {nome,email,password} = req.body;
            const userExists = await User.findOne({where:{email}});
            if(userExists){
                return res.status(400).json({status:"User already exists"});
            }

            const user = await User.create(req.body);
            return res.json(user);
        }catch(error){
            console.log(error);
            return res.status(400).json({status:false});
        }
    }

    async show(req,res){
        try {
            const { id }  = req.params;
            const user = await User.findByPk(id);
            if(user){
                return res.json(user);
            }
            else{
                return res.status(400).json({status:false});
            }
            
        } catch (error) {
            return res.status(400).json({status:false});
        }
    }

    async update(req,res){

        try {
            const schema = Yup.object().shape({
                nome: Yup.string(),
                email: Yup.string().email(),
                oldPassword: Yup.string().min(6),            
                password: Yup.string().min(6).when('oldPassword',(oldPassword,field)    => oldPassword  ? field.required() : field),
                confirmPassword: Yup.string().when('password'   , (password,field)      => password     ? field.required().oneOf([Yup.ref('password')]):field)
            });
            if (!(await schema.isValid(req.body))){
                return res.status(400).json({error:"Validation fails"});
            };
    
            
        } catch (error) {
            return res.json(false);
        }

        
    };

    async delete(req,res){
        try {
            const { id }  = req.params;
            const user = await User.findByPk(id);
            if(user){
                const retorno = await user.destroy();
                if(retorno){
                    return res.json({status:true});
                }
                else{
                    return res.status(400).json({status:false});    
                }                
            }
            else{
                return res.status(400).json({status:false});
            }
        } catch(error) {
            return res.status(400).json({status:false});
        }
    }

    async search(req,res){
        try {
            const usuario =  await User.findOne({
                where:{
                    email:req.query.email
                }
            })
            return res.json(usuario)
        } catch (error) {
            return res.status(400).json(false);
        }
    }
}
export default new UserController();