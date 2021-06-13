import Sequelize                from 'sequelize';
import databaseConfig           from '../config/database';

import User                     from '../app/models/Users';
import Estabelecimento          from '../app/models/Estabelecimento';


const models = [
User,
Estabelecimento
];

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection));
        models.map(model => model.associate && model.associate(this.connection.models));
    }
};

export default new Database();