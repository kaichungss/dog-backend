import request from "supertest";
import app from "../app";

describe('test register api', () => {
  let code = "";
  it('register code success', async () => {
    const response = await request(app)
      .post('/register/code')
      .send({email: 'admin@facebook.com'});
    code = response.body.data;
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if email is already registered', async () => {
    const response = await request(app)
      .post('/register/code')
      .send({email: 'admin@facebook.com'});
    expect(response.body.msg).toBe("the email address is registered");
  });

  it('should return error if clicking within 60 seconds', async () => {
    const response = await request(app)
      .post('/register/code')
      .send({email: 'admin@facebook.com'});
    expect(response.body.msg).toBe("cannot click within 60 seconds");
  });

  it('register insert success', async () => {
    const response = await request(app)
      .post('/register/insert')
      .send({username: "admin", email: 'admin@facebook.com', password: '123456', role: "worker", code: code});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if the email address is registered', async () => {
    const response = await request(app)
      .post('/register/insert')
      .send({username: "admin", email: 'admin@facebook.com', password: '123456', role: "worker", code: code});
    expect(response.body.msg).toBe("the email address is registered");
  });
})
