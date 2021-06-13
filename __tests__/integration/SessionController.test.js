import request from 'supertest';
import app  from '../../src/app';
import User from '../../src/app/models/Users';


describe("Happy Flow" , () =>{

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

    it("should be able to create a new session for a valid user", async() =>{

        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });
        const session_response  = await request(app)
        .post("/sessions")
        .send({
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });
        expect(session_response.body.user.nome).toBe('Fulano')
    });
})

describe("Unhappy Flow" , () =>{

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


    it("should not be able to create a new session for a invalid user", async() =>{

        const session_response  = await request(app)
        .post("/sessions")
        .send({
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });
        expect(session_response.body.status).toBe('User not found')
    });

    it("should not be able to create a new session for a invalid data", async() =>{

        const session_response  = await request(app)
        .post("/sessions")
        .send({
            
        });
        expect(session_response.body.status).toBe(false)
    });

    it("should be able to create a new session for a invalid password", async() =>{

        const user_response  = await request(app)
        .post("/users/create")
        .send({
            "nome" : "Fulano",
            "email" : "fulano@gmail.com",
            "password": "asdasdqwe"
        });
        const session_response  = await request(app)
        .post("/sessions")
        .send({
            "email" : "fulano@gmail.com",
            "password": "123123123"
        });
        expect(session_response.body.status).toBe('Password does match')
    });
    
})