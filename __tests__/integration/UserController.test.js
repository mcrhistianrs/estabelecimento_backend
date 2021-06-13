import request from 'supertest';
import app  from '../../src/app';
import User from '../../src/app/models/Users';

describe('Happy Flow', () =>{

    beforeEach(async () =>{
      const all  = await User.findAll();
      all.map(u =>{
          u.destroy()
      })   
    })

    afterEach( async()=>{
        const all  = await User.findAll();
        all.map(u =>{
            u.destroy()
        })   
    })

    it('should be able to create a new user' , async() =>{
        const response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        expect(response.body).toHaveProperty('id')
        expect(response.body.nome).toBe("Fulano")
        expect(response.body.email).toBe("fulano@gmail.com")
        expect(response.body.password).toBe("asdasdqwe")
    })

    it('should be able to create  a  user' , async() =>{

        const create_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const show_response  = await request(app)
        .get(`/users/retrieve/${create_response.body.id}`)
        
        expect(show_response.body).toHaveProperty('id')
        expect(show_response.body.nome).toBe("Fulano")
        expect(show_response.body.email).toBe("fulano@gmail.com")
    })

    it('should be able to update a  user' , async() =>{

        const create_response  = await request(app)
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

        const update_response  = await request(app)
        .put(`/users/update/${create_response.body.id}`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "nome": "Fulano da Silva",
            "email": "fulano.s@gmail.com",
            "oldPassword": "asdasdqwe",            
            "password": "zxcasdqwe",
            "confirmPassword" : "zxcasdqwe"
        });

        
        
        expect(update_response.body).toHaveProperty('id')
        expect(update_response.body.nome).toBe("Fulano da Silva")
        expect(update_response.body.email).toBe("fulano.s@gmail.com")
        expect(update_response.body.password).toBe("zxcasdqwe")
    })

    it('should be able to delete a  user' , async() =>{

        const create_response  = await request(app)
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

        const delete_response  = await request(app)
        .delete(`/users/delete/${create_response.body.id}`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        expect(delete_response.body.status).toBe(true)
        
    })
});

describe('Unhappy Flow', () =>{

    beforeEach(async () =>{
      const all  = await User.findAll();
      all.map(u =>{
          u.destroy()
      })   
    })

    afterEach( async()=>{
        const all  = await User.findAll();
        all.map(u =>{
            u.destroy()
        })   
    })

    it('should not be able to create a new user when is missing data' , async() =>{
        const response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
        });
        expect(response.body.status).toBe('Validation fails') 
    })

    it('should not be able to create a duplicate user' , async() =>{

        const user1_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        const user2_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });

        
        expect(user2_response.body.status).toBe('User already exists') 
    })


    it('should not be able to show a user when he do not exists' , async() =>{

        const show_response  = await request(app)
        .get("/users/retrieve/1")
        
        expect(show_response.body.status).toBe(false) 
    })

    it('should not be able to update a user with invalid data', async() =>{
        const create_response  = await request(app)
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

        const update_response  = await request(app)
        .put(`/users/update/${create_response.body.id}`)
        .set({
            "Authorization" : "Bearer " + session_response.body.token
        })
        .send({
            "password": "asdasdasd"
            
        });

        console.log(update_response.body)
        expect(update_response.body.status).toBe('Validation fails')
    });
});