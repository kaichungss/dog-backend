import request from 'supertest';
import app from "../app"

describe('test api', () => {
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHFxLmNvbSIsInBhc3N3b3JkIjoiZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4M2UiLCJyb2xlIjoid29ya2VyIiwiaW5zZXJ0X3RpbWUiOiIyMDI0LTAzLTIwVDA4OjEwOjE2LjAwMFoiLCJpYXQiOjE3MTE0NDQzNjMsImV4cCI6MTcxMTQ0Nzk2M30.ivvfYetV2liuXOK_W0MoTSLf5lo7UuBq8YV8-oQw4nM";

  it('login', async () => {
    const response = await request(app)
      .post('/login')
      .send({email: "admin@qq.com", password: "123456"});
    token = response.body.data.token;
    expect(response.status).toBe(200);
  });
  it('register code', async () => {
    const response = await request(app)
      .post('/register/code')
      .send({email: 'admin@qq.com'});
    expect(response.status).toBe(200);
  });

  it('register insert', async () => {
    const response = await request(app)
      .post('/register/insert')
      .send({username: "admin", email: 'admin@qq.com', password: '123456', code: "854765"});
    expect(response.status).toBe(200);
  });

  it('publish list', async () => {
    const response = await request(app)
      .post('/system/publish/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: ''});
    expect(response.status).toBe(200);
  });

  it('publish insert', async () => {
    const response = await request(app)
      .post('/system/publish/insert')
      .set('token', token)
      .send({name: '1', breed: '2', describe: '2', image: '3'});
    expect(response.status).toBe(200);
  });

  it('publish update', async () => {
    const response = await request(app)
      .post('/system/publish/update')
      .set('token', token)
      .send({name: '1', bread: '2', describe: '2', image: '3'});
    expect(response.status).toBe(200);
  });

  it('publish delete', async () => {
    const response = await request(app)
      .post('/system/publish/delete')
      .set('token', token)
      .send({id: '1'});
    expect(response.status).toBe(200);
  });


  it('view list', async () => {
    const response = await request(app)
      .get('/system/view/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: ''});
    expect(response.status).toBe(200);
  });

  it('view moreList', async () => {
    const response = await request(app)
      .get('/system/view/moreList')
      .set('token', token)
      .send({currentPage: 2, limit: 10, name: ''});
    expect(response.status).toBe(200);
  });

  it('view click', async () => {
    const response = await request(app)
      .get('/system/view/click')
      .set('token', token)
      .send({dog_id: 1});
    expect(response.status).toBe(200);
  });

  it('view comment', async () => {
    const response = await request(app)
      .get('/system/view/comment')
      .set('token', token)
      .send({dog_id: 1, comment: "good"});
    expect(response.status).toBe(200);
  });

  it('view comment data', async () => {
    const response = await request(app)
      .get('/system/view/comment_data')
      .set('token', token)
      .send({id: 1});
    expect(response.status).toBe(200);
  });

  it('view delete comment', async () => {
    const response = await request(app)
      .get('/system/view/delete_comment')
      .set('token', token)
      .send({dog_id: 1});
    expect(response.status).toBe(200);
  });

  it('file upload', async () => {
    const filePath = 'public/1711271260756_logo.jpg';
    const response = await request(app)
      .post('/system/file/upload')
      .set('token', token)
      .attach('file', filePath);
    expect(response.status).toBe(200);
  });

  it('view favorites', async () => {
    const response = await request(app)
      .get('/system/view/favorites')
      .set('token', token)
      .send({dog_id: 1, f: true});
    expect(response.status).toBe(200);
  });
});
