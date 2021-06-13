import Sequelize, { Model } from 'sequelize';


class Estabelecimento extends Model {
    static init(sequelize){
        super.init(
            {
                nome: Sequelize.STRING,   
                descricao: Sequelize.STRING,
                user_id: Sequelize.INTEGER,             
            },
            {
                sequelize,
            }
        );
        return this;
    }
};
export default Estabelecimento;