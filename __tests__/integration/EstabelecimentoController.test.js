import request from 'supertest';
import app  from '../../src/app';
import Estabelecimento from '../../src/app/models/Estabelecimento';
import User from '../../src/app/models/Users';

describe('Happy Flow', ()=>{

    beforeEach(async () =>{
        const all  = await Estabelecimento.findAll();
        all.map(e =>{
            e.destroy()
        })   

        const user_all  = await User.findAll();
        user_all.map(u =>{
            u.destroy()
        })
      })
  
    afterEach( async()=>{
        const all  = await Estabelecimento.findAll();
            all.map(e =>{
                e.destroy()
            }
        )   
        const user_all  = await User.findAll();
            user_all.map(u =>{
                u.destroy()
            }
        )
    })

    it('should be able to create a new estabelecimento', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        const estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome":"Supermercado xpto",
            "descricao" : "Filial do bairro x",
            "user_id" : user_response.body.id
        });

        expect(estabelecimento_response.body).toHaveProperty('id')
        expect(estabelecimento_response.body.nome).toBe('Supermercado xpto')
        expect(estabelecimento_response.body.descricao).toBe('Filial do bairro x')
        expect(estabelecimento_response.body.user_id).toBe(user_response.body.id)
    })

    it('should be able  to retrieve a estabelecimento', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        const create_estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome":"Supermercado xpto",
            "descricao" : "Filial do bairro x",
            "user_id" : user_response.body.id
        });

        const retrieve_estabelecimento_response  = await request(app)
        .get(`/estabelecimento/retrieve/${create_estabelecimento_response.body.id}`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })

        expect(retrieve_estabelecimento_response.body).toHaveProperty('id')
        expect(retrieve_estabelecimento_response.body.nome).toBe('Supermercado xpto')
        expect(retrieve_estabelecimento_response.body.descricao).toBe('Filial do bairro x')
        expect(retrieve_estabelecimento_response.body.user_id).toBe(user_response.body.id)


    });


    it('should be able  to update a estabelecimento', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        const create_estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome":"Supermercado xpto",
            "descricao" : "Filial do bairro x",
            "user_id" : user_response.body.id
        });

        const update_estabelecimento_response  = await request(app)
        .put(`/estabelecimento/retrieve/${create_estabelecimento_response.body.id}`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome": "Super Andressa",
	        "descricao" : "Para comprar rápidas"
        });

        
        expect(update_estabelecimento_response.body).toHaveProperty('id')
        expect(update_estabelecimento_response.body.nome).toBe('Super Andressa')
        expect(update_estabelecimento_response.body.descricao).toBe('Para comprar rápidas')

    });


    it('should be able  to delete a estabelecimento', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        const create_estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome":"Supermercado xpto",
            "descricao" : "Filial do bairro x",
            "user_id" : user_response.body.id
        });

        const delete_estabelecimento_response  = await request(app)
        .delete(`/estabelecimento/delete/${create_estabelecimento_response.body.id}`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })

        expect(delete_estabelecimento_response.body.status).toBe(true)
        


    });

    it('should be able  to search a estabelecimento', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        const create_estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome":"Supermercado xpto",
            "descricao" : "Filial do bairro x",
            "user_id" : user_response.body.id
        });

        const search_estabelecimento_response  = await request(app)
        .get(`/estabelecimento/search`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .query({
            "nome": "r"
        })

        expect(search_estabelecimento_response.body.length).toBe(1)
        expect(search_estabelecimento_response.body[0]).toHaveProperty('id')
        expect(search_estabelecimento_response.body[0].nome).toBe('Supermercado xpto')
        expect(search_estabelecimento_response.body[0].descricao).toBe('Filial do bairro x')
        expect(search_estabelecimento_response.body[0].user_id).toBe(user_response.body.id)
    });


});



describe('Unhappy Flow', ()=>{

    beforeEach(async () =>{
        const all  = await Estabelecimento.findAll();
        all.map(e =>{
            e.destroy()
        })   

        const user_all  = await User.findAll();
        user_all.map(u =>{
            u.destroy()
        })
      })
  
    afterEach( async()=>{
        const all  = await Estabelecimento.findAll();
            all.map(e =>{
                e.destroy()
            }
        )   
        const user_all  = await User.findAll();
            user_all.map(u =>{
                u.destroy()
            }
        )
    })

    it('should not be able to create a new estabelecimento without user', async() =>{
        const estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .send({
            "nome":"Supermercado xpto",
            "descricao" : "Filial do bairro x",
            "user_id" : 32
        });

        expect(estabelecimento_response.body.status).toBe('Token not provided')
    })

    it('should not be able to create a new estabelecimento with invalid data', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .send({
            
            "user_id" : user_response.body.id
        });

        expect(estabelecimento_response.body.status).toBe('Token not provided')
    })

    it('should not be able to retrieve a invalid estabelecimento', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        const retrieve_estabelecimento_response  = await request(app)
        .get(`/estabelecimento/retrieve/1`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })

        expect(retrieve_estabelecimento_response.body.status).toBe(false)
    })

    it('should not be able to retrieve a estabelecimento without a valid user', async() =>{
        

        const retrieve_estabelecimento_response  = await request(app)
        .get(`/estabelecimento/retrieve/1`)
        
        expect(retrieve_estabelecimento_response.body.status).toBe('Token not provided')
    })

    it('should not be able  to update a estabelecimento without valida data' , async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        const create_estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome":"Supermercado xpto",
            "descricao" : "Filial do bairro x",
            "user_id" : user_response.body.id
        });

        const update_estabelecimento_response  = await request(app)
        .put(`/estabelecimento/retrieve/${create_estabelecimento_response.body.id}`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            
        });

        expect(update_estabelecimento_response.body.status).toBe('Validation fails')
        

    });

    it('should not be able  to update a invalid estabelecimento' , async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        
        const update_estabelecimento_response  = await request(app)
        .put(`/estabelecimento/retrieve/1`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome": "Super Andressa",
	        "descricao" : "Para comprar rápidas"
        });

        expect(update_estabelecimento_response.body.status).toBe(false)
        

    });

    it('should be able  to delete a invalid estabelecimento', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        

        const delete_estabelecimento_response  = await request(app)
        .delete(`/estabelecimento/delete/1`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })

        expect(delete_estabelecimento_response.body.status).toBe(false)
        


    });


    it('should not be able  to search a inexist estabelecimento', async() =>{
        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const session_response = await request(app)
        .post('/sessions')
        .send({
            "email":"fulano@gmail.com",
            "password": "asdasdqwe"
        })

        const create_estabelecimento_response  = await request(app)
        .post("/estabelecimento/create")
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome":"Supermercado xpto",
            "descricao" : "Filial do bairro x",
            "user_id" : user_response.body.id
        });

        const search_estabelecimento_response  = await request(app)
        .get(`/estabelecimento/search`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .query({
            "nome": "z"
        })

        expect(search_estabelecimento_response.body.length).toBe(0)
        
    });

    it('should not be able  to search with a invalid user', async() =>{
        const search_estabelecimento_response  = await request(app)
        .get(`/estabelecimento/search`)
        .send({
            "nome": "z"
        })

        expect(search_estabelecimento_response.body.status).toBe('Token not provided')
        
    });

});