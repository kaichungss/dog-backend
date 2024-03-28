import request from "supertest";
import app from "../app";

describe('test login api', () => {

  it('login success', async () => {
    const response = await request(app)
      .post('/login')
      .send({email: "admin@facebook.com", password: "123456"});
    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
  });

  it('should return error if the email address or password is incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({email: "admin@facebook.com", password: "12345678"});
    expect(response.body.msg).toBe("the email address or password is incorrect");
  });
})
