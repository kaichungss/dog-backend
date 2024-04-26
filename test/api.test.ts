import request from 'supertest';
import app from "../app"

describe('test api', () => {
  const random = Math.floor(Math.random() * 1000000)
  it('register insert success', async () => {
    const response = await request(app)
      .post('/register/insert')
      .send({
        username: random + "admin",
        email: random + 'admin@facebook.com',
        password: '123456',
        role: "worker",
        org_id: 1,
        code: '888888'
      });
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if the email address is registered', async () => {
    const response = await request(app)
      .post('/register/insert')
      .send({
        username: random + "admin",
        email: random + 'admin@facebook.com',
        password: '123456',
        role: "worker",
        org_id: 1,
        code: '888888'
      });
    expect(response.body.msg).toBe("the email address is registered");
  });

  let token = '';

  it('login success', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: random + "admin@facebook.com", password: "123456"
      });
    token = response.body.data.token;
    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
  });

  it('should return error if the email address or password is incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({email: random + "admin@facebook.com", password: "12345678"});
    expect(response.body.msg).toBe("the email address or password is incorrect");
  });

  it('publish list success', async () => {
    const response = await request(app)
      .post('/system/publish/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: ''});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if the type is a string', async () => {
    const response = await request(app)
      .post('/system/publish/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: 10});
    expect(response.body.msg).toBe("the type is a string");
  });

  it('should return error if page can not be empty', async () => {
    const response = await request(app)
      .post('/system/publish/list')
      .set('token', token)
      .send({limit: 10, name: ''});
    expect(response.body.msg).toBe("page can't be empty");
  });


  it('publish delete success', async () => {
    const response = await request(app)
      .post('/system/publish/delete')
      .set('token', token)
      .send({id: '1'});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('publish delete success', async () => {
    const response = await request(app)
      .post('/system/publish/insert')
      .set('token', token)
      .send({
        name: "1",
        breed: "affenpinscher",
        describe: "1",
        image_list: "test.jpg",
        gender: "bitch",
        color: "red",
        size: "small",
        sterilized: "yes",
        vaccinated: "yes"
      });
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });


  it('view list success', async () => {
    const response = await request(app)
      .post('/system/view/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: '', size: [], breed: []});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('view moreList success', async () => {
    const response = await request(app)
      .post('/system/view/moreList')
      .set('token', token)
      .send({currentPage: 2, limit: 10, name: '', size: [], breed: []});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('view click success', async () => {
    const response = await request(app)
      .post('/system/view/click')
      .set('token', token)
      .send({dog_id: 1});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if dog_id is empty', async () => {
    const response = await request(app)
      .post('/system/view/click')
      .set('token', token)
      .send({});
    expect(response.body.msg).toBe("dog_id can't be empty");
  });

  it('view comment success', async () => {
    const response = await request(app)
      .post('/system/view/comment')
      .set('token', token)
      .send({dog_id: 1, comment: "good"});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if dog_id is empty', async () => {
    const response = await request(app)
      .post('/system/view/comment')
      .set('token', token)
      .send({});
    expect(response.body.msg).toBe("dog_id can't be empty");
  });

  it('should return error if dog_id is empty', async () => {
    const response = await request(app)
      .post('/system/view/delete_comment')
      .set('token', token)
      .send({});
    expect(response.body.msg).toBe("dog_id can't be empty");
  });

  it('should return error if dog_id is empty', async () => {
    const response = await request(app)
      .post('/system/favorites/insert')
      .set('token', token)
      .send({f: true});
    expect(response.body.msg).toBe("dog_id can't be empty");
  });


  it('favorites list success', async () => {
    const response = await request(app)
      .post('/system/favorites/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: '', size: [], breed: []});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('favorites moreList success', async () => {
    const response = await request(app)
      .post('/system/favorites/moreList')
      .set('token', token)
      .send({currentPage: 2, limit: 10, name: '', size: [], breed: []});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('chat list success', async () => {
    const response = await request(app)
      .post('/system/chat/list')
      .set('token', token)
      .send({receivedId: 2});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

});
