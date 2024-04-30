# Prepare The Environment

### Import Data

Import SQL statements from the DB directory to MySQL

### Install Dependencies

npm install

### Start The Project

npm start

# Analyze The Structure

### Directory Structure

- public (static files)
- src (logical files)
- test (test files)

### all code logic is in the src directory

- controller (interface logic)
- middlewares (middleware logic)
- model (interface logic)
- router (routing logic)
- utils (tool logic)

# config swagger

- utils->swagger.ts add configuration to the file
- add a swagger comment to the route

```ts
const router = express.Router();
/**
 * @swagger
 * /login:
 *   post:
 *     summary:
 *     tags: [Login]
 *     description: Login to your account and password to obtain a token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.post("/", validate.login, validateResult, search);
```

# an example is a login api

open src->controller->login>index.ts

### logical analysis

This code snippet represents an Express route handler for handling POST requests to the "/" endpoint. It first extracts
the email and password from the request body. Then, it hashes the password using the md5Hash function. Next, it calls
the getInfoByEmailAndPassword function, passing the email and hashed password to retrieve user information.
If no matching user information is found, it returns an error response using the handleError function with a message
stating "the email address or password is incorrect" and a status code of 201.
If matching user information is found, it generates a JWT token and returns a successful response using the
handleSucceed function. The response includes the token, email, username, role, user ID, and organization ID.

```ts
router.use("/login", login);
router.post("/", validate.login, validateResult, search);
export const search = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const info = await getInfoByEmailAndPassword({email, password: md5Hash(password)});
  if (!info.length) {
    handleError(res, "the email address or password is incorrect", 201);
    return;
  }
  const token = JWT.generate(info[0], 60 * 60 + "s");
  handleSucceed(res, {
    token,
    email: info[0].email,
    username: info[0].username,
    role: info[0].role,
    id: info[0].id,
    org_id: info[0].org_id
  });
};
```

# File Upload Setup with Multer

### Explanation

- fs: Node.js module for interacting with the file system. Used here to create the upload directory if it doesn't exist.
- multer: Middleware for handling multipart/form-data, used to handle file uploads.
- uploadDir: Specifies the directory where uploaded files will be stored.
- storage: Configuration for Multer's disk storage engine, specifying the destination directory and filename format for
  uploaded files.
- upload: Exported Multer middleware configured with the specified storage settings.

```ts
import multer from 'multer';
import fs from 'fs';

const uploadDir = 'public/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + "_" + file.originalname);
  }
});

export const upload = multer({storage: storage});

```

# Database Configuration

### Explanation

- host: 'localhost': Specifies the hostname or IP address of the database server, in this case localhost.
- user: 'root': Specifies the username required to connect to the database, in this case 'root'.
- password: '12345678': Specifies the password required to connect to the database.
- database: 'dog': Specifies the name of the database to be connected to, in this case the database named 'dog'.
- waitForConnections: true: indicates whether queued connection requests should be paused when the connection reaches
  the limit. A set to true means that connection requests will be queued until a connection is available.
- connectionLimit: 10: The maximum number of connections in the specified connection pool is 10, which means that a
  maximum of 10 connections can be connected to the database at the same time.
- queueLimit: 0: Set the maximum number of queue connections allowed, 0 indicates that the number of queue connections
  is not limited.

```ts
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'dog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
export default pool;
```


