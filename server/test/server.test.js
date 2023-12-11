const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before } = require('mocha');
const { server, app } = require('../server'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Server API Tests', () => {
 
  const testUser = {
    username: 'testuser',
    password: 'testpassword',
  };

  let authToken; 
  before(async () => {
    const res = await chai.request(server)
      .post('/login')
      .send(testUser);
    
    authToken = res.body.token;
  });

  

  it('should return a JWT token on successful login', (done) => {
    chai.request(server)
      .post('/login')
      .send(testUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should successfully register a new user', (done) => {
    const newUser = {
      username: 'newuser',
      password: 'newpassword',
    };

    chai.request(server)
      .post('/Signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success').to.equal(true);
        done();
      });
  });

 
  it('should add an expense with a valid JWT token', (done) => {
    const expenseData = {
      userId: '656b6df6195d579b6e278a23', 
      month: 'January',
      category: 'Groceries',
      expense: 50,
    };
  
    chai.request(server)
      .post('/add-expense/:userId')
      .set('Authorization', `Bearer ${authToken}`)
      .send(expenseData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success').to.equal(true);
        done();
      });
  });
  
 
  
 
});
