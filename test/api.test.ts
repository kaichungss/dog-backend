import request from 'supertest';
import app from "../app"

describe('test api', () => {
  let token = '';

  it('login success', async () => {
    const response = await request(app)
      .post('/login')
      .send({email: "admin@facebook.com", password: "123456"});
    token = response.body.data.token;
    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
  });

  it('publish list success', async () => {
    const response = await request(app)
      .post('/system/publish/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: ''});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('publish insert success', async () => {
    const response = await request(app)
      .post('/system/publish/insert')
      .set('token', token)
      .send({name: '1', breed: '2', describe: '2', image: '3'});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if name is empty', async () => {
    const response = await request(app)
      .post('/system/publish/insert')
      .set('token', token)
      .send({breed: '2', describe: '2', image: '3'});
    expect(response.body.msg).toBe("name can't be empty");
  });

  it('publish update success', async () => {
    const response = await request(app)
      .post('/system/publish/update')
      .set('token', token)
      .send({name: '1', bread: '2', describe: '2', image: '3'});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if name is empty', async () => {
    const response = await request(app)
      .post('/system/publish/update')
      .set('token', token)
      .send({bread: '2', describe: '2', image: '3'});
    expect(response.body.msg).toBe("name can't be empty");
  });

  it('publish delete success', async () => {
    const response = await request(app)
      .post('/system/publish/delete')
      .set('token', token)
      .send({id: '1'});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });


  it('view list success', async () => {
    const response = await request(app)
      .get('/system/view/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: ''});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('view moreList success', async () => {
    const response = await request(app)
      .get('/system/view/moreList')
      .set('token', token)
      .send({currentPage: 2, limit: 10, name: ''});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('view click success', async () => {
    const response = await request(app)
      .get('/system/view/click')
      .set('token', token)
      .send({dog_id: 1});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if dog_id is empty', async () => {
    const response = await request(app)
      .get('/system/view/click')
      .set('token', token)
      .send({});
    expect(response.body.msg).toBe("dog_id can't be empty");
  });

  it('view comment success', async () => {
    const response = await request(app)
      .get('/system/view/comment')
      .set('token', token)
      .send({dog_id: 1, comment: "good"});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if dog_id is empty', async () => {
    const response = await request(app)
      .get('/system/view/comment')
      .set('token', token)
      .send({});
    expect(response.body.msg).toBe("dog_id can't be empty");
  });

  it('view comment data success', async () => {
    const response = await request(app)
      .get('/system/view/comment_data')
      .set('token', token)
      .send({id: 1});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('view delete comment success', async () => {
    const response = await request(app)
      .get('/system/view/delete_comment')
      .set('token', token)
      .send({});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if dog_id is empty', async () => {
    const response = await request(app)
      .get('/system/view/delete_comment')
      .set('token', token)
      .send({});
    expect(response.body.msg).toBe("dog_id can't be empty");
  });

  it('file upload success', async () => {
    const filePath = 'public/1711271260756_logo.jpg';
    const response = await request(app)
      .post('/system/file/upload')
      .set('token', token)
      .attach('file', filePath);
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('should return error if file is empty', async () => {
    const response = await request(app)
      .post('/system/file/upload')
      .set('token', token)
      .attach('file', '');
    expect(response.body.msg).toBe("No file uploaded");
  });

  it('favorites insert success', async () => {
    const response = await request(app)
      .get('/system/favorites/insert')
      .set('token', token)
      .send({dog_id: 1, f: true});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });


  it('should return error if dog_id is empty', async () => {
    const response = await request(app)
      .get('/system/favorites/insert')
      .set('token', token)
      .send({dog_id: 1, f: true});
    expect(response.body.msg).toBe("dog_id can't be empty");
  });


  it('favorites list success', async () => {
    const response = await request(app)
      .get('/system/favorites/list')
      .set('token', token)
      .send({currentPage: 1, limit: 10, name: ''});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });

  it('favorites moreList success', async () => {
    const response = await request(app)
      .get('/system/favorites/moreList')
      .set('token', token)
      .send({currentPage: 2, limit: 10, name: ''});
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
  });
});
