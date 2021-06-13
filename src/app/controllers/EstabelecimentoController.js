import Estabelecimento from '../models/Estabelecimento'
import * as Yup from 'yup';

class EstabelecimentoController{

    async create(req,res){
        try{
            const schema = Yup.object().shape({
                nome: Yup.string().required(),
                descricao: Yup.string().required(),                
            });
            if (!(await schema.isValid(req.body))){
                return res.status(400).json({status:"Validation fails"});
            };
            
            const estabelecimento = await Estabelecimento.create(req.body);
            return res.json(estabelecimento);
        }catch(error){
            console.log(error)
            return res.status(400).json({status:false});
        }
    }

    async retrieve(req,res){
        try {
            const { id }  = req.params;
            const estabelecimento = await Estabelecimento.findByPk(id);
            if(estabelecimento){
                return res.json(estabelecimento);
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

            const { id } = req.params;

            if(id){
                const schema = Yup.object().shape({
                    nome: Yup.string().required(),
                    descricao: Yup.string().required(),
                });
                if (!(await schema.isValid(req.body))){
                    return res.status(400).json({error:"Validation fails"});
                };
        
                const estabelecimento = await Estabelecimento.findByPk(id);
        
                return res.json(await estabelecimento.update(req.body));
            }
            else{
                return res.status(400).json({status:false});
            }
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({status:false});
        }
    }

    async delete(req,res){
        try {
            const { id }  = req.params;
            const estabelecimento = await Estabelecimento.findByPk(id);
            if(estabelecimento){
                const retorno = await estabelecimento.destroy();
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
}

export default new EstabelecimentoController();